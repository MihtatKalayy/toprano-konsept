import { describe, expect, it } from 'vitest'
import { shopConfig } from '../config/shop'
import { products } from '../content/catalog'
import { createProductLookup } from './cart'
import { cartStorageVersion, parseStoredCart, serializeCart } from './cartStorage'

const lookup = createProductLookup(products)
const parse = (raw: string | null) => parseStoredCart(raw, lookup, shopConfig)
const stored = (lines: unknown, version: unknown = cartStorageVersion) => JSON.stringify({ version, lines })

describe('serializeCart', () => {
  it('yalnızca sürüm, ürün id\'si ve adet yazar', () => {
    const text = serializeCart([{ productId: 'p-001', quantity: 2 }])
    expect(JSON.parse(text)).toEqual({ version: 1, lines: [{ productId: 'p-001', quantity: 2 }] })
  })

  it('okunan veri yazılanla aynı', () => {
    const cart = [
      { productId: 'p-001', quantity: 2 },
      { productId: 'p-012', quantity: 10 },
    ]
    expect(parse(serializeCart(cart))).toEqual({ cart, issues: [] })
  })
})

describe('parseStoredCart', () => {
  it('kayıt yoksa boş sepet, sorun yok', () => {
    expect(parse(null)).toEqual({ cart: [], issues: [] })
  })

  it('bozuk JSON çökertmez, boş sepete döner', () => {
    for (const raw of ['{', 'merhaba', '', '[1,2', 'undefined']) {
      expect(parse(raw)).toEqual({ cart: [], issues: [{ type: 'corrupt' }] })
    }
  })

  it('beklenmeyen biçimler boş sepete döner', () => {
    for (const raw of ['null', '42', '"metin"', '[]', stored('satırlar'), stored(null), JSON.stringify({ lines: [] })]) {
      const result = parse(raw)
      expect(result.cart).toEqual([])
      expect(result.issues).toHaveLength(1)
    }
  })

  it('tanınmayan sürüm boş sepete döner', () => {
    expect(parse(stored([{ productId: 'p-001', quantity: 1 }], 99))).toEqual({
      cart: [],
      issues: [{ type: 'unknown-version', version: 99 }],
    })
    expect(parse(stored([], '1')).issues[0].type).toBe('unknown-version')
  })

  it('bilinmeyen ürünü, tükenen ürünü ve geçersiz satırları ayıklar, geçerlileri korur', () => {
    const result = parse(
      stored([
        { productId: 'p-001', quantity: 2 },
        { productId: 'p-999', quantity: 1 },
        { productId: 'p-006', quantity: 1 },
        { productId: 42, quantity: 1 },
        'satır',
        null,
        { productId: 'p-012', quantity: 'iki' },
        { productId: 'p-003', quantity: 0 },
        { productId: 'p-004', quantity: Number.NaN },
        { productId: 'p-005', quantity: 1, name: 'eklenmemesi gereken alan', priceKurus: 1 },
      ]),
    )
    expect(result.cart).toEqual([
      { productId: 'p-001', quantity: 2 },
      { productId: 'p-005', quantity: 1 },
    ])
    expect(result.issues.map((issue) => issue.type)).toEqual([
      'unknown-product',
      'out-of-stock',
      'invalid-line',
      'invalid-line',
      'invalid-line',
      'invalid-quantity',
      'invalid-quantity',
      'invalid-quantity',
    ])
  })

  it('adetleri sınırlara çeker', () => {
    const result = parse(
      stored([
        { productId: 'p-001', quantity: 50 },
        { productId: 'p-012', quantity: 2.7 },
      ]),
    )
    expect(result.cart).toEqual([
      { productId: 'p-001', quantity: 10 },
      { productId: 'p-012', quantity: 2 },
    ])
    expect(result.issues).toEqual([
      { type: 'quantity-clamped', productId: 'p-001', from: 50, to: 10 },
      { type: 'quantity-clamped', productId: 'p-012', from: 2.7, to: 2 },
    ])
  })

  it('aynı ürünün yinelenen satırlarını birleştirir ve sınıra çeker', () => {
    const result = parse(
      stored([
        { productId: 'p-001', quantity: 6 },
        { productId: 'p-001', quantity: 6 },
      ]),
    )
    expect(result.cart).toEqual([{ productId: 'p-001', quantity: 10 }])
    expect(result.issues).toEqual([{ type: 'duplicate', productId: 'p-001' }])
  })
})
