import type { ShopConfig } from '../config/shop'
import type { Product } from '../content/types'

// Sepet yalnızca ürün id'si ve adet tutar; ad, fiyat, görsel ve stok her zaman ürün kaynağından okunur.
export interface CartLine {
  productId: string
  quantity: number
}

export type Cart = readonly CartLine[]

export type ProductLookup = (productId: string) => Product | undefined

export type CartRules = Pick<ShopConfig, 'minQuantity' | 'maxQuantityPerProduct'>

export const emptyCart: Cart = []

export function createProductLookup(products: Product[]): ProductLookup {
  const byId = new Map(products.map((product) => [product.id, product]))
  return (productId) => byId.get(productId)
}

export function clampQuantity(quantity: number, rules: CartRules): number {
  return Math.min(rules.maxQuantityPerProduct, Math.max(rules.minQuantity, Math.trunc(quantity)))
}

export function quantityInCart(cart: Cart, productId: string): number {
  return cart.find((line) => line.productId === productId)?.quantity ?? 0
}

export type AddStatus = 'added' | 'limited' | 'at-limit' | 'out-of-stock' | 'unknown-product' | 'invalid-quantity'

export interface AddResult {
  cart: Cart
  status: AddStatus
  /** Gerçekte eklenen adet; sınır nedeniyle istenenden az olabilir. */
  addedQuantity: number
}

/** Ürünü ekler; sepette varsa adedini artırır. Ürün başına sınır aşılacaksa yalnızca sığan kadarını ekler. */
export function addToCart(cart: Cart, productId: string, quantity: number, lookup: ProductLookup, rules: CartRules): AddResult {
  const product = lookup(productId)
  if (!product) return { cart, status: 'unknown-product', addedQuantity: 0 }
  if (product.stock === 'out-of-stock') return { cart, status: 'out-of-stock', addedQuantity: 0 }
  if (!Number.isInteger(quantity) || quantity < rules.minQuantity) {
    return { cart, status: 'invalid-quantity', addedQuantity: 0 }
  }

  const current = quantityInCart(cart, productId)
  const room = rules.maxQuantityPerProduct - current
  if (room <= 0) return { cart, status: 'at-limit', addedQuantity: 0 }

  const addedQuantity = Math.min(quantity, room)
  const next =
    current === 0
      ? [...cart, { productId, quantity: addedQuantity }]
      : cart.map((line) => (line.productId === productId ? { ...line, quantity: current + addedQuantity } : line))

  return { cart: next, status: addedQuantity < quantity ? 'limited' : 'added', addedQuantity }
}

/** Sepetteki bir ürünün adedini sınırlar içinde belirler. Ürün sepette yoksa ya da değer sayı değilse sepet aynen döner. */
export function setQuantity(cart: Cart, productId: string, quantity: number, rules: CartRules): Cart {
  if (!Number.isFinite(quantity) || quantityInCart(cart, productId) === 0) return cart
  const nextQuantity = clampQuantity(quantity, rules)
  return cart.map((line) => (line.productId === productId ? { ...line, quantity: nextQuantity } : line))
}

/** Ürünü sepetten çıkarır; ürün sepette yoksa sepet aynen döner. */
export function removeFromCart(cart: Cart, productId: string): Cart {
  if (quantityInCart(cart, productId) === 0) return cart
  return cart.filter((line) => line.productId !== productId)
}

export function clearCart(): Cart {
  return emptyCart
}

export interface ResolvedLine {
  product: Product
  quantity: number
  lineTotalKurus: number
}

/** Sepet satırlarını ürün kaynağıyla birleştirir; kaynakta olmayan id'ler atlanır. */
export function resolveLines(cart: Cart, lookup: ProductLookup): ResolvedLine[] {
  return cart.flatMap((line) => {
    const product = lookup(line.productId)
    return product ? [{ product, quantity: line.quantity, lineTotalKurus: product.priceKurus * line.quantity }] : []
  })
}

export interface CartSummary {
  itemCount: number
  subtotalKurus: number
  shippingKurus: number
  totalKurus: number
  /** Ücretsiz kargoya kalan tutar; eşik aşıldıysa ya da sepet boşsa 0 */
  remainingForFreeShippingKurus: number
}

export function calculateShipping(subtotalKurus: number, config: Pick<ShopConfig, 'shippingFeeKurus' | 'freeShippingThresholdKurus'>): number {
  if (subtotalKurus === 0) return 0
  return subtotalKurus >= config.freeShippingThresholdKurus ? 0 : config.shippingFeeKurus
}

export function summarizeCart(cart: Cart, lookup: ProductLookup, config: ShopConfig): CartSummary {
  const lines = resolveLines(cart, lookup)
  const itemCount = lines.reduce((sum, line) => sum + line.quantity, 0)
  const subtotalKurus = lines.reduce((sum, line) => sum + line.lineTotalKurus, 0)
  const shippingKurus = calculateShipping(subtotalKurus, config)
  return {
    itemCount,
    subtotalKurus,
    shippingKurus,
    totalKurus: subtotalKurus + shippingKurus,
    remainingForFreeShippingKurus: subtotalKurus === 0 ? 0 : Math.max(0, config.freeShippingThresholdKurus - subtotalKurus),
  }
}
