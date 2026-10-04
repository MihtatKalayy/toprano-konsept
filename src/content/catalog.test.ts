import { describe, expect, it } from 'vitest'
import { categories, products } from './catalog'

describe('ürün ve kategori verisi', () => {
  it('4 kategori, 12 ürün ve her kategoride 3 ürün var', () => {
    expect(categories).toHaveLength(4)
    expect(products).toHaveLength(12)
    for (const category of categories) {
      expect(products.filter((product) => product.categoryId === category.id)).toHaveLength(3)
    }
  })

  it('id ve slug değerleri benzersiz', () => {
    for (const list of [categories, products]) {
      expect(new Set(list.map((item) => item.id)).size).toBe(list.length)
      expect(new Set(list.map((item) => item.slug)).size).toBe(list.length)
    }
  })

  it('slug değerleri adres için güvenli', () => {
    for (const item of [...categories, ...products]) {
      expect(item.slug).toMatch(/^[a-z0-9]+(-[a-z0-9]+)*$/)
    }
  })

  it('fiyatlar pozitif tam sayı kuruş', () => {
    for (const product of products) {
      expect(Number.isSafeInteger(product.priceKurus)).toBe(true)
      expect(product.priceKurus).toBeGreaterThan(0)
    }
  })

  it('en az bir ürün tükendi, en az iki ürün az kaldı', () => {
    expect(products.filter((product) => product.stock === 'out-of-stock').length).toBeGreaterThanOrEqual(1)
    expect(products.filter((product) => product.stock === 'low-stock').length).toBeGreaterThanOrEqual(2)
  })

  it('her üründe boyutlu ve alt metinli görsel ile geçerli tarih var', () => {
    for (const product of products) {
      expect(product.images.length).toBeGreaterThan(0)
      for (const image of product.images) {
        expect(image.alt.trim()).not.toBe('')
        expect(image.width).toBeGreaterThan(0)
        expect(image.height).toBeGreaterThan(0)
      }
      expect(product.addedAt).toMatch(/^\d{4}-\d{2}-\d{2}$/)
      expect(Number.isNaN(Date.parse(product.addedAt))).toBe(false)
    }
  })
})
