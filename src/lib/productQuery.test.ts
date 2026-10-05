import { describe, expect, it } from 'vitest'
import { categories } from '../content/catalog'
import { defaultSort } from './catalog'
import { parseLira, parseProductQuery, productsPathForCategory, toSearchParams } from './productQuery'

const parse = (search: string) => parseProductQuery(new URLSearchParams(search), categories)

describe('parseProductQuery', () => {
  it('boş adreste varsayılanları döndürür', () => {
    expect(parse('')).toEqual({ categoryIds: [], minKurus: null, maxKurus: null, search: '', sort: defaultSort })
  })

  it('geçerli parametreleri okur', () => {
    expect(parse('kategori=vazo&kategori=dekor&min=300&max=1200&q=nar&sirala=fiyat-azalan')).toEqual({
      categoryIds: ['cat-vazo', 'cat-dekor'],
      minKurus: 30000,
      maxKurus: 120000,
      search: 'nar',
      sort: 'fiyat-azalan',
    })
  })

  it('geçersiz değerleri güvenli varsayılana döndürür', () => {
    expect(parse('kategori=yok&min=abc&max=-5&sirala=rastgele')).toEqual({
      categoryIds: [],
      minKurus: null,
      maxKurus: null,
      search: '',
      sort: defaultSort,
    })
    expect(parse('min=12.5&max=1e3').minKurus).toBeNull()
    expect(parse('max=99999999').maxKurus).toBeNull()
  })

  it('en düşük fiyat en yüksekten büyükse yer değiştirir', () => {
    const query = parse('min=900&max=300')
    expect([query.minKurus, query.maxKurus]).toEqual([30000, 90000])
  })

  it('çok uzun arama metnini kısaltır', () => {
    expect(parse(`q=${'a'.repeat(500)}`).search).toHaveLength(100)
  })
})

describe('toSearchParams', () => {
  it('varsayılanları adrese yazmaz', () => {
    expect(toSearchParams(parse(''), categories).toString()).toBe('')
  })

  it('okunan sorguyu aynı adrese geri çevirir', () => {
    const search = 'kategori=kupa-fincan&kategori=vazo&min=300&max=1200&q=sırlı&sirala=en-yeni'
    const roundTrip = toSearchParams(parse(search), categories)
    expect(parse(roundTrip.toString())).toEqual(parse(search))
    expect(roundTrip.getAll('kategori')).toEqual(['kupa-fincan', 'vazo'])
  })
})

describe('productsPathForCategory', () => {
  it('kategori filtreli Ürünler adresini üretir', () => {
    expect(productsPathForCategory(categories[2], categories)).toBe('/urunler?kategori=vazo')
  })

  it('üretilen adres aynı kategoriyle geri okunur', () => {
    for (const category of categories) {
      const search = productsPathForCategory(category, categories).split('?')[1]
      expect(parseProductQuery(new URLSearchParams(search), categories).categoryIds).toEqual([category.id])
    }
  })
})

describe('parseLira', () => {
  it('tam lirayı kuruşa çevirir', () => {
    expect(parseLira('250')).toBe(25000)
    expect(parseLira(' 0 ')).toBe(0)
    expect(parseLira('1000000')).toBe(100_000_000)
  })

  it('geçersiz girdide hata fırlatmadan null döner', () => {
    for (const value of [null, '', ' ', 'abc', '-5', '12.5', '1e3', '1000001', '100000000000000000000']) {
      expect(parseLira(value)).toBeNull()
    }
  })
})
