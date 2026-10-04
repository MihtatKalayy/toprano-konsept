import { describe, expect, it } from 'vitest'
import { categories, products } from '../content/catalog'
import type { Product } from '../content/types'
import {
  emptyFilters,
  filterProducts,
  findProductBySlug,
  getRelatedProducts,
  hasActiveFilters,
  queryProducts,
  sortProducts,
} from './catalog'

const ids = (list: Product[]) => list.map((product) => product.id)
const filter = (overrides: Partial<typeof emptyFilters>) => filterProducts(products, categories, { ...emptyFilters, ...overrides })

describe('filterProducts', () => {
  it('filtre yokken tüm ürünleri döndürür', () => {
    expect(filter({})).toHaveLength(12)
  })

  it('kategoriye göre filtreler', () => {
    const result = filter({ categoryIds: ['cat-vazo'] })
    expect(result).toHaveLength(3)
    expect(result.every((product) => product.categoryId === 'cat-vazo')).toBe(true)
  })

  it('birden çok kategoriyi birlikte kabul eder', () => {
    expect(filter({ categoryIds: ['cat-vazo', 'cat-dekor'] })).toHaveLength(6)
  })

  it('fiyat aralığının sınırlarını dahil eder', () => {
    const result = filter({ minKurus: 42000, maxKurus: 89000 })
    expect(result.every((product) => product.priceKurus >= 42000 && product.priceKurus <= 89000)).toBe(true)
    expect(ids(result)).toContain('p-001') // tam 42000
    expect(ids(result)).toContain('p-004') // tam 89000
  })

  it('yalnızca alt ya da üst sınırla çalışır', () => {
    expect(filter({ minKurus: 140000 }).every((product) => product.priceKurus >= 140000)).toBe(true)
    expect(filter({ maxKurus: 40000 }).every((product) => product.priceKurus <= 40000)).toBe(true)
  })

  it('"kase" ve "KASE" aynı sonucu verir; kategori adında da arar', () => {
    const lower = ids(filter({ search: 'kase' }))
    expect(ids(filter({ search: 'KASE' }))).toEqual(lower)
    expect(lower).toEqual(expect.arrayContaining(['p-003', 'p-004', 'p-005', 'p-006']))
  })

  it('"fincan" ve "FİNCAN" aynı sonucu verir', () => {
    const lower = ids(filter({ search: 'fincan' }))
    expect(ids(filter({ search: 'FİNCAN' }))).toEqual(lower)
    expect(ids(filter({ search: 'FINCAN' }))).toEqual(lower)
    expect(lower).toEqual(['p-001', 'p-002', 'p-003'])
  })

  it('filtreleri birlikte uygular', () => {
    const result = filter({ categoryIds: ['cat-tabak-kase'], maxKurus: 60000, search: 'çorba' })
    expect(ids(result)).toEqual(['p-005'])
  })

  it('eşleşme yoksa boş liste döndürür', () => {
    expect(filter({ search: 'çaydanlık' })).toEqual([])
    expect(filter({ categoryIds: ['cat-vazo'], maxKurus: 10000 })).toEqual([])
  })
})

describe('sortProducts', () => {
  it('önerilen: öne çıkanlar önce, sonra id sırası', () => {
    const result = sortProducts(products, 'onerilen')
    const featuredCount = products.filter((product) => product.featured).length
    expect(result.slice(0, featuredCount).every((product) => product.featured)).toBe(true)
    expect(ids(result.slice(featuredCount))).toEqual([...ids(result.slice(featuredCount))].sort())
  })

  it('fiyat artan ve azalan', () => {
    const asc = sortProducts(products, 'fiyat-artan').map((product) => product.priceKurus)
    expect(asc).toEqual([...asc].sort((a, b) => a - b))
    const desc = sortProducts(products, 'fiyat-azalan').map((product) => product.priceKurus)
    expect(desc).toEqual([...desc].sort((a, b) => b - a))
  })

  it('en yeni: eklenme tarihine göre azalan', () => {
    const dates = sortProducts(products, 'en-yeni').map((product) => product.addedAt)
    expect(dates).toEqual([...dates].sort().reverse())
  })

  it('girdiyi değiştirmez', () => {
    const before = ids(products)
    sortProducts(products, 'fiyat-artan')
    expect(ids(products)).toEqual(before)
  })
})

describe('queryProducts ve yardımcılar', () => {
  it('filtreler ve sıralar', () => {
    const result = queryProducts(products, categories, { ...emptyFilters, categoryIds: ['cat-vazo'], sort: 'fiyat-artan' })
    expect(ids(result)).toEqual(['p-008', 'p-009', 'p-007'])
  })

  it('hasActiveFilters', () => {
    expect(hasActiveFilters(emptyFilters)).toBe(false)
    expect(hasActiveFilters({ ...emptyFilters, search: '  ' })).toBe(false)
    expect(hasActiveFilters({ ...emptyFilters, minKurus: 0 })).toBe(true)
  })

  it('findProductBySlug', () => {
    expect(findProductBySlug(products, 'tek-dal-vazo')?.id).toBe('p-008')
    expect(findProductBySlug(products, 'olmayan')).toBeUndefined()
  })
})

describe('getRelatedProducts', () => {
  const product = (id: string) => products.find((item) => item.id === id)!

  it('aynı kategoriden, ürünün kendisi hariç ürünleri döndürür', () => {
    const related = getRelatedProducts(products, product('p-008'))
    expect(ids(related)).toEqual(['p-007', 'p-009'])
    expect(related.every((item) => item.categoryId === 'cat-vazo')).toBe(true)
  })

  it('her ürün için kendisini içermez', () => {
    for (const item of products) {
      expect(ids(getRelatedProducts(products, item))).not.toContain(item.id)
    }
  })

  it('en fazla limit kadar ürün döndürür ve öne çıkanı öne alır', () => {
    const base = product('p-001')
    const extra: Product[] = [2, 3, 4, 5].map((n) => ({ ...base, id: `x-${n}`, slug: `x-${n}`, featured: n === 5 }))
    const related = getRelatedProducts([...products, ...extra], base)
    expect(related).toHaveLength(4)
    expect(related[0].id).toBe('x-5')
    expect(getRelatedProducts(products, base, 1)).toHaveLength(1)
  })

  it('eşleştirmeyi id ile yapar; aynı ada sahip farklı ürünü dışlamaz', () => {
    const base = product('p-001')
    const twin = { ...base, id: 'p-999', slug: 'ikiz' }
    expect(ids(getRelatedProducts([...products, twin], base))).toContain('p-999')
  })
})
