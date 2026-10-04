import type { Category } from '../content/types'
import { defaultSort, sortOptions, type ProductQuery, type SortOption } from './catalog'
import { kurusToWholeLira, liraToKurus } from './money'

// Ürünler sayfasının adres çubuğundaki sorgu parametreleri.
export const queryKeys = {
  category: 'kategori',
  min: 'min',
  max: 'max',
  search: 'q',
  sort: 'sirala',
} as const

const maxSearchLength = 100
const maxLira = 1_000_000

/** "250" gibi tam lira değerini kuruşa çevirir; geçersizse null döner. */
function parseLira(value: string | null): number | null {
  if (value === null || !/^\d{1,7}$/.test(value.trim())) return null
  const lira = Number(value.trim())
  return lira <= maxLira ? liraToKurus(lira) : null
}

function isSortOption(value: string | null): value is SortOption {
  return sortOptions.some((option) => option === value)
}

/**
 * Sorgu parametrelerini güvenli şekilde okur. Tanınmayan kategori, sayı olmayan fiyat ve
 * bilinmeyen sıralama değerleri yok sayılır; en düşük fiyat en yüksekten büyükse ikisi yer değiştirir.
 */
export function parseProductQuery(params: URLSearchParams, categories: Category[]): ProductQuery {
  const requestedSlugs = new Set(params.getAll(queryKeys.category))
  const categoryIds = categories.filter((category) => requestedSlugs.has(category.slug)).map((category) => category.id)

  let minKurus = parseLira(params.get(queryKeys.min))
  let maxKurus = parseLira(params.get(queryKeys.max))
  if (minKurus !== null && maxKurus !== null && minKurus > maxKurus) {
    ;[minKurus, maxKurus] = [maxKurus, minKurus]
  }

  const sort = params.get(queryKeys.sort)

  return {
    categoryIds,
    minKurus,
    maxKurus,
    search: (params.get(queryKeys.search) ?? '').slice(0, maxSearchLength),
    sort: isSortOption(sort) ? sort : defaultSort,
  }
}

/** Sorguyu adres parametrelerine çevirir; varsayılan değerler adrese yazılmaz. */
export function toSearchParams(query: ProductQuery, categories: Category[]): URLSearchParams {
  const params = new URLSearchParams()
  for (const category of categories) {
    if (query.categoryIds.includes(category.id)) params.append(queryKeys.category, category.slug)
  }
  if (query.minKurus !== null) params.set(queryKeys.min, String(kurusToWholeLira(query.minKurus)))
  if (query.maxKurus !== null) params.set(queryKeys.max, String(kurusToWholeLira(query.maxKurus)))
  if (query.search.trim() !== '') params.set(queryKeys.search, query.search)
  if (query.sort !== defaultSort) params.set(queryKeys.sort, query.sort)
  return params
}
