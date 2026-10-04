import { createContext } from 'react'
import { products } from '../content/catalog'
import { createProductLookup } from '../lib/cart'
import type { CartStore } from './cartStore'

export const productLookup = createProductLookup(products)

export const CartStoreContext = createContext<CartStore | null>(null)
