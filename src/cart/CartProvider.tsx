import { useEffect, useState, type ReactNode } from 'react'
import { shopConfig } from '../config/shop'
import { CartStoreContext, productLookup } from './cartContext'
import { createCartStore, getBrowserStorage } from './cartStore'

export function CartProvider({ children }: { children: ReactNode }) {
  const [store] = useState(() => createCartStore({ storage: getBrowserStorage(), lookup: productLookup, config: shopConfig }))

  // Aynı sitenin başka bir sekmesinde sepet değişirse bu sekme de güncellenir.
  useEffect(() => store.connect(window), [store])

  return <CartStoreContext value={store}>{children}</CartStoreContext>
}
