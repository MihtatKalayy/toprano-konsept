import type { ShopConfig } from '../config/shop'
import {
  addToCart,
  clearCart,
  emptyCart,
  removeFromCart,
  setQuantity,
  type AddResult,
  type Cart,
  type ProductLookup,
} from '../lib/cart'
import { cartStorageKey, parseStoredCart, serializeCart, type CartIssue } from '../lib/cartStorage'

export interface CartSnapshot {
  cart: Cart
  /** Kayıtlı sepet okunurken ayıklanan ya da düzeltilen kayıtlar; kullanıcıya kısa bir bilgi olarak gösterilir. */
  issues: CartIssue[]
}

export interface CartActions {
  add: (productId: string, quantity: number) => AddResult
  setQuantity: (productId: string, quantity: number) => Cart
  remove: (productId: string) => Cart
  clear: () => Cart
  dismissIssues: () => void
}

/** `window` ya da testte onun yerine geçen, yalnızca `storage` olayını dinleyen nesne */
export interface StorageEventTarget {
  addEventListener(type: 'storage', listener: (event: StorageEvent) => void): void
  removeEventListener(type: 'storage', listener: (event: StorageEvent) => void): void
}

export interface CartStore extends CartActions {
  getSnapshot: () => CartSnapshot
  subscribe: (listener: () => void) => () => void
  /** Başka sekmelerdeki değişiklikleri dinler; temizleme işlevi döner. */
  connect: (target: StorageEventTarget) => () => void
}

type Logger = Pick<Console, 'warn'>

interface CartStoreOptions {
  /** Tarayıcı depolaması; erişilemiyorsa (gizli sekme kısıtı vb.) null verilebilir. */
  storage: Storage | null
  lookup: ProductLookup
  config: ShopConfig
  logger?: Logger
}

/** `window.localStorage` erişimi bazı tarayıcılarda hata fırlatır; bu durumda null döner ve sebep loga yazılır. */
export function getBrowserStorage(logger: Logger = console): Storage | null {
  try {
    return window.localStorage
  } catch (error) {
    logger.warn('[sepet] Tarayıcı depolamasına erişilemiyor; sepet bu oturumda yalnızca bellekte tutulacak.', error)
    return null
  }
}

export function createCartStore({ storage, lookup, config, logger = console }: CartStoreOptions): CartStore {
  let persistent = storage !== null
  const listeners = new Set<() => void>()

  const read = (): CartSnapshot => {
    if (!persistent || !storage) return { cart: emptyCart, issues: [] }
    let raw: string | null
    try {
      raw = storage.getItem(cartStorageKey)
    } catch (error) {
      persistent = false
      logger.warn('[sepet] Kayıtlı sepet okunamadı; sepet bu oturumda yalnızca bellekte tutulacak.', error)
      return { cart: emptyCart, issues: [] }
    }
    const parsed = parseStoredCart(raw, lookup, config)
    if (parsed.issues.length > 0) {
      logger.warn('[sepet] Kayıtlı sepette geçersiz kayıtlar ayıklandı.', parsed.issues)
      write(parsed.cart)
    }
    return parsed
  }

  const write = (cart: Cart) => {
    if (!persistent || !storage) return
    try {
      storage.setItem(cartStorageKey, serializeCart(cart))
    } catch (error) {
      persistent = false
      logger.warn('[sepet] Sepet kaydedilemedi; bu oturumda yalnızca bellekte tutulacak.', error)
    }
  }

  let snapshot = read()

  const emit = () => {
    for (const listener of listeners) listener()
  }

  // Her değişiklik tek adımda uygulanır: yeni sepet hesaplanır, kaydedilir ve dinleyicilere bildirilir.
  const commit = (cart: Cart) => {
    if (cart === snapshot.cart) return
    snapshot = { ...snapshot, cart }
    write(cart)
    emit()
  }

  return {
    getSnapshot: () => snapshot,
    subscribe: (listener) => {
      listeners.add(listener)
      return () => listeners.delete(listener)
    },
    connect: (target) => {
      const onStorage = (event: StorageEvent) => {
        if (event.storageArea !== storage || (event.key !== cartStorageKey && event.key !== null)) return
        const next = read()
        snapshot = { cart: next.cart, issues: next.issues.length > 0 ? next.issues : snapshot.issues }
        emit()
      }
      target.addEventListener('storage', onStorage)
      return () => target.removeEventListener('storage', onStorage)
    },
    add: (productId, quantity) => {
      const result = addToCart(snapshot.cart, productId, quantity, lookup, config)
      commit(result.cart)
      return result
    },
    setQuantity: (productId, quantity) => {
      commit(setQuantity(snapshot.cart, productId, quantity, config))
      return snapshot.cart
    },
    remove: (productId) => {
      commit(removeFromCart(snapshot.cart, productId))
      return snapshot.cart
    },
    clear: () => {
      commit(clearCart())
      return snapshot.cart
    },
    dismissIssues: () => {
      if (snapshot.issues.length === 0) return
      snapshot = { ...snapshot, issues: [] }
      emit()
    },
  }
}
