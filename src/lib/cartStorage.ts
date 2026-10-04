import type { Cart, CartLine, CartRules, ProductLookup } from './cart'

/** Tarayıcı depolamasındaki anahtar. Yapı değişirse `cartStorageVersion` artırılır ve eski sürüm aşağıda dönüştürülür. */
export const cartStorageKey = 'toprana.sepet'
export const cartStorageVersion = 1

/** Depolamaya yazılan yapı: yalnızca ürün id'si ve adet. */
export interface StoredCartV1 {
  version: 1
  lines: CartLine[]
}

export type CartIssue =
  | { type: 'corrupt' }
  | { type: 'unknown-version'; version: unknown }
  | { type: 'invalid-line' }
  | { type: 'unknown-product'; productId: string }
  | { type: 'out-of-stock'; productId: string }
  | { type: 'invalid-quantity'; productId: string }
  | { type: 'quantity-clamped'; productId: string; from: number; to: number }
  | { type: 'duplicate'; productId: string }

export interface ParsedCart {
  cart: Cart
  issues: CartIssue[]
}

export function serializeCart(cart: Cart): string {
  const stored: StoredCartV1 = {
    version: cartStorageVersion,
    lines: cart.map(({ productId, quantity }) => ({ productId, quantity })),
  }
  return JSON.stringify(stored)
}

const isRecord = (value: unknown): value is Record<string, unknown> =>
  typeof value === 'object' && value !== null && !Array.isArray(value)

/**
 * Depolamadan okunan metni doğrular. Hiçbir girdi hata fırlatmaz: bozuk veri ve tanınmayan sürüm boş sepete,
 * geçersiz satırlar ayıklanarak güvenli bir sepete dönüşür. Yapılan her düzeltme `issues` içinde bildirilir.
 */
export function parseStoredCart(raw: string | null, lookup: ProductLookup, rules: CartRules): ParsedCart {
  if (raw === null) return { cart: [], issues: [] }

  let data: unknown
  try {
    data = JSON.parse(raw)
  } catch {
    return { cart: [], issues: [{ type: 'corrupt' }] }
  }

  if (!isRecord(data)) return { cart: [], issues: [{ type: 'corrupt' }] }
  if (data.version !== cartStorageVersion) return { cart: [], issues: [{ type: 'unknown-version', version: data.version }] }
  if (!Array.isArray(data.lines)) return { cart: [], issues: [{ type: 'corrupt' }] }

  const issues: CartIssue[] = []
  const lines: CartLine[] = []

  for (const entry of data.lines) {
    if (!isRecord(entry) || typeof entry.productId !== 'string') {
      issues.push({ type: 'invalid-line' })
      continue
    }
    const { productId, quantity } = entry
    const product = lookup(productId)
    if (!product) {
      issues.push({ type: 'unknown-product', productId })
      continue
    }
    if (product.stock === 'out-of-stock') {
      issues.push({ type: 'out-of-stock', productId })
      continue
    }
    if (typeof quantity !== 'number' || !Number.isFinite(quantity) || quantity < rules.minQuantity) {
      issues.push({ type: 'invalid-quantity', productId })
      continue
    }

    const existing = lines.find((line) => line.productId === productId)
    const wanted = Math.trunc(quantity) + (existing?.quantity ?? 0)
    const clamped = Math.min(rules.maxQuantityPerProduct, wanted)
    if (existing) issues.push({ type: 'duplicate', productId })
    if (clamped !== quantity && !existing) issues.push({ type: 'quantity-clamped', productId, from: quantity, to: clamped })

    if (existing) existing.quantity = clamped
    else lines.push({ productId, quantity: clamped })
  }

  return { cart: lines, issues }
}
