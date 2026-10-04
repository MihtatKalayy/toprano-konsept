import { describe, expect, it } from 'vitest'
import { shopConfig } from '../config/shop'
import { products } from '../content/catalog'
import {
  addToCart,
  calculateShipping,
  clampQuantity,
  clearCart,
  createProductLookup,
  removeFromCart,
  resolveLines,
  setQuantity,
  summarizeCart,
  type Cart,
} from './cart'

const lookup = createProductLookup(products)
const rules = shopConfig
// Veriden: p-001 ₺420 stokta, p-006 tükendi, p-007 ₺1.650, p-012 ₺280
const add = (cart: Cart, id: string, quantity = 1) => addToCart(cart, id, quantity, lookup, rules)

describe('addToCart', () => {
  it('yeni ürünü ekler', () => {
    const result = add([], 'p-001', 2)
    expect(result).toEqual({ cart: [{ productId: 'p-001', quantity: 2 }], status: 'added', addedQuantity: 2 })
  })

  it('aynı ürün tekrar eklenince yeni satır açmaz, adedi artırır', () => {
    const first = add([], 'p-001', 2).cart
    const second = add(first, 'p-001', 3)
    expect(second.cart).toEqual([{ productId: 'p-001', quantity: 5 }])
    expect(second.status).toBe('added')
  })

  it('girdiyi yerinde değiştirmez', () => {
    const cart: Cart = Object.freeze([Object.freeze({ productId: 'p-001', quantity: 1 })])
    const result = add(cart, 'p-001', 1)
    expect(cart).toEqual([{ productId: 'p-001', quantity: 1 }])
    expect(result.cart).not.toBe(cart)
  })

  it('10 sınırı aşılacaksa yalnızca sığan kadarını ekler', () => {
    const result = add([{ productId: 'p-001', quantity: 7 }], 'p-001', 5)
    expect(result).toEqual({ cart: [{ productId: 'p-001', quantity: 10 }], status: 'limited', addedQuantity: 3 })
  })

  it('sınırdaysa hiç eklemez', () => {
    const cart: Cart = [{ productId: 'p-001', quantity: 10 }]
    expect(add(cart, 'p-001', 1)).toEqual({ cart, status: 'at-limit', addedQuantity: 0 })
  })

  it('tükenen ürünü eklemez', () => {
    expect(add([], 'p-006')).toEqual({ cart: [], status: 'out-of-stock', addedQuantity: 0 })
  })

  it('bilinmeyen ürün id\'sini eklemez', () => {
    expect(add([], 'p-999').status).toBe('unknown-product')
    // ad ya da slug ile eşleştirme yapılmaz
    expect(add([], 'kiremit-sirli-kupa').status).toBe('unknown-product')
  })

  it('geçersiz adedi reddeder', () => {
    for (const quantity of [0, -1, 1.5, Number.NaN]) {
      expect(add([], 'p-001', quantity).status).toBe('invalid-quantity')
    }
  })
})

describe('setQuantity', () => {
  const cart: Cart = [
    { productId: 'p-001', quantity: 2 },
    { productId: 'p-012', quantity: 1 },
  ]

  it('adedi belirler, diğer satırlara dokunmaz', () => {
    expect(setQuantity(cart, 'p-001', 4, rules)).toEqual([
      { productId: 'p-001', quantity: 4 },
      { productId: 'p-012', quantity: 1 },
    ])
  })

  it('1 ile 10 arasına çeker', () => {
    expect(setQuantity(cart, 'p-001', 0, rules)[0].quantity).toBe(1)
    expect(setQuantity(cart, 'p-001', -5, rules)[0].quantity).toBe(1)
    expect(setQuantity(cart, 'p-001', 11, rules)[0].quantity).toBe(10)
    expect(setQuantity(cart, 'p-001', 99, rules)[0].quantity).toBe(10)
  })

  it('sepette olmayan ürün ya da sayı olmayan değer sepeti değiştirmez', () => {
    expect(setQuantity(cart, 'p-002', 3, rules)).toBe(cart)
    expect(setQuantity(cart, 'p-001', Number.NaN, rules)).toBe(cart)
  })
})

describe('removeFromCart ve clearCart', () => {
  it('yalnızca ilgili satırı çıkarır', () => {
    const cart: Cart = [
      { productId: 'p-001', quantity: 2 },
      { productId: 'p-012', quantity: 1 },
    ]
    expect(removeFromCart(cart, 'p-001')).toEqual([{ productId: 'p-012', quantity: 1 }])
    expect(cart).toHaveLength(2)
  })

  it('sepette olmayan ürün için aynı sepeti döndürür', () => {
    const cart: Cart = [{ productId: 'p-001', quantity: 2 }]
    expect(removeFromCart(cart, 'p-012')).toBe(cart)
  })

  it('sepeti boşaltır', () => {
    expect(clearCart()).toEqual([])
  })
})

describe('clampQuantity', () => {
  it('sınırlara çeker ve küsuratı atar', () => {
    expect(clampQuantity(0, rules)).toBe(1)
    expect(clampQuantity(3.9, rules)).toBe(3)
    expect(clampQuantity(12, rules)).toBe(10)
  })
})

describe('hesaplar', () => {
  it('satır toplamı birim fiyat × adet', () => {
    const [line] = resolveLines([{ productId: 'p-001', quantity: 3 }], lookup)
    expect(line.lineTotalKurus).toBe(126_000)
    expect(line.product.name).toBe('Kiremit Sırlı Kupa')
  })

  it('kaynakta olmayan id\'leri atlar', () => {
    expect(resolveLines([{ productId: 'p-999', quantity: 1 }], lookup)).toEqual([])
  })

  it('ara toplam, kargo, genel toplam ve toplam adet', () => {
    const summary = summarizeCart(
      [
        { productId: 'p-001', quantity: 2 },
        { productId: 'p-012', quantity: 1 },
      ],
      lookup,
      shopConfig,
    )
    expect(summary).toEqual({
      itemCount: 3,
      subtotalKurus: 112_000,
      shippingKurus: 7_500,
      totalKurus: 119_500,
      remainingForFreeShippingKurus: 38_000,
    })
  })

  it('boş sepette her şey sıfır', () => {
    expect(summarizeCart([], lookup, shopConfig)).toEqual({
      itemCount: 0,
      subtotalKurus: 0,
      shippingKurus: 0,
      totalKurus: 0,
      remainingForFreeShippingKurus: 0,
    })
  })

  it('kargo eşiğin 1 kuruş altında ücretli, eşikte ve üstünde ücretsiz', () => {
    const threshold = shopConfig.freeShippingThresholdKurus
    expect(calculateShipping(threshold - 1, shopConfig)).toBe(shopConfig.shippingFeeKurus)
    expect(calculateShipping(threshold, shopConfig)).toBe(0)
    expect(calculateShipping(threshold + 1, shopConfig)).toBe(0)
    expect(calculateShipping(1, shopConfig)).toBe(shopConfig.shippingFeeKurus)
  })

  it('gerçek ürünlerle eşik: ₺1.450 ücretli, ₺1.450 + ₺280 ücretsiz; ₺1.500 tam eşik ücretsiz', () => {
    const below = summarizeCart([{ productId: 'p-011', quantity: 1 }], lookup, shopConfig)
    expect(below.shippingKurus).toBe(7_500)
    expect(below.remainingForFreeShippingKurus).toBe(5_000)
    const above = summarizeCart(
      [
        { productId: 'p-011', quantity: 1 },
        { productId: 'p-012', quantity: 1 },
      ],
      lookup,
      shopConfig,
    )
    expect(above.shippingKurus).toBe(0)
    expect(above.remainingForFreeShippingKurus).toBe(0)
    // ₺420 + ₺1.080 = tam ₺1.500: p-001 ×1 (420) + p-003 ×3 (3 × 360 = 1.080)
    const exact = summarizeCart(
      [
        { productId: 'p-001', quantity: 1 },
        { productId: 'p-003', quantity: 3 },
      ],
      lookup,
      shopConfig,
    )
    expect(exact.subtotalKurus).toBe(150_000)
    expect(exact.shippingKurus).toBe(0)
  })

  it('tüm tutarlar tam sayı kalır', () => {
    const summary = summarizeCart(
      products.filter((p) => p.stock !== 'out-of-stock').map((p) => ({ productId: p.id, quantity: 10 })),
      lookup,
      shopConfig,
    )
    for (const value of Object.values(summary)) expect(Number.isSafeInteger(value)).toBe(true)
  })
})
