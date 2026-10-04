import type { Category, CategoryId, Product } from '../content/types'
import { matchesSearch } from './search'

export const sortOptions = ['onerilen', 'fiyat-artan', 'fiyat-azalan', 'en-yeni'] as const
export type SortOption = (typeof sortOptions)[number]
export const defaultSort: SortOption = 'onerilen'

export interface ProductFilters {
  /** Boşsa tüm kategoriler */
  categoryIds: CategoryId[]
  minKurus: number | null
  maxKurus: number | null
  search: string
}

export interface ProductQuery extends ProductFilters {
  sort: SortOption
}

export const emptyFilters: ProductFilters = {
  categoryIds: [],
  minKurus: null,
  maxKurus: null,
  search: '',
}

export function filterProducts(products: Product[], categories: Category[], filters: ProductFilters): Product[] {
  const categoryNames = new Map(categories.map((category) => [category.id, category.name]))

  return products.filter((product) => {
    if (filters.categoryIds.length > 0 && !filters.categoryIds.includes(product.categoryId)) return false
    if (filters.minKurus !== null && product.priceKurus < filters.minKurus) return false
    if (filters.maxKurus !== null && product.priceKurus > filters.maxKurus) return false
    const searchable = [product.name, categoryNames.get(product.categoryId) ?? '', product.shortDescription].join(' ')
    return matchesSearch(searchable, filters.search)
  })
}

const compareId = (a: Product, b: Product) => a.id.localeCompare(b.id)

const comparators: Record<SortOption, (a: Product, b: Product) => number> = {
  // Önerilen: öne çıkanlar önce, sonra kaynaktaki sıra (id).
  onerilen: (a, b) => Number(b.featured) - Number(a.featured) || compareId(a, b),
  'fiyat-artan': (a, b) => a.priceKurus - b.priceKurus || compareId(a, b),
  'fiyat-azalan': (a, b) => b.priceKurus - a.priceKurus || compareId(a, b),
  'en-yeni': (a, b) => b.addedAt.localeCompare(a.addedAt) || compareId(a, b),
}

export function sortProducts(products: Product[], sort: SortOption): Product[] {
  return [...products].sort(comparators[sort])
}

export function queryProducts(products: Product[], categories: Category[], query: ProductQuery): Product[] {
  return sortProducts(filterProducts(products, categories, query), query.sort)
}

export function hasActiveFilters(filters: ProductFilters): boolean {
  return (
    filters.categoryIds.length > 0 || filters.minKurus !== null || filters.maxKurus !== null || filters.search.trim() !== ''
  )
}

export function findProductBySlug(products: Product[], slug: string): Product | undefined {
  return products.find((product) => product.slug === slug)
}

export function findCategory(categories: Category[], id: CategoryId): Category | undefined {
  return categories.find((category) => category.id === id)
}

/**
 * Detay sayfasındaki benzer ürünler: aynı kategoriden, ürünün kendisi hariç,
 * önerilen sırayla en fazla `limit` ürün. Eşleştirme id ile yapılır.
 */
export function getRelatedProducts(products: Product[], product: Product, limit = 4): Product[] {
  const sameCategory = products.filter((other) => other.categoryId === product.categoryId && other.id !== product.id)
  return sortProducts(sameCategory, 'onerilen').slice(0, limit)
}
