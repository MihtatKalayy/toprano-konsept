import { use, useMemo, useSyncExternalStore } from 'react'
import { shopConfig } from '../config/shop'
import { quantityInCart, resolveLines, summarizeCart } from '../lib/cart'
import { CartStoreContext, productLookup } from './cartContext'
import type { CartActions, CartStore } from './cartStore'

function useCartStore(): CartStore {
  const store = use(CartStoreContext)
  if (!store) throw new Error('Sepet kancaları CartProvider içinde kullanılmalı.')
  return store
}

/** Sepeti okur: satırlar ürün kaynağıyla birleştirilmiş, toplamlar hesaplanmış olarak. */
export function useCart() {
  const store = useCartStore()
  const { cart, issues } = useSyncExternalStore(store.subscribe, store.getSnapshot)

  return useMemo(
    () => ({
      cart,
      issues,
      lines: resolveLines(cart, productLookup),
      summary: summarizeCart(cart, productLookup, shopConfig),
      quantityOf: (productId: string) => quantityInCart(cart, productId),
    }),
    [cart, issues],
  )
}

/** Sepeti değiştirir. Okuma kancasından ayrıdır; yalnızca işlem yapan bileşenler sepet değişince yeniden çizilmez. */
export function useCartActions(): CartActions {
  const store = useCartStore()
  return useMemo(
    () => ({
      add: store.add,
      setQuantity: store.setQuantity,
      remove: store.remove,
      clear: store.clear,
      dismissIssues: store.dismissIssues,
    }),
    [store],
  )
}
