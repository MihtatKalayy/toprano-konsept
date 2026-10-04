import { useCallback, useMemo } from 'react'
import { useSearchParams } from 'react-router'
import { categories } from '../content/catalog'
import type { ProductQuery } from '../lib/catalog'
import { parseProductQuery, toSearchParams } from '../lib/productQuery'

/**
 * Ürünler sayfasının filtre, arama ve sıralama durumu adres çubuğunda tutulur.
 * Her değişiklik yeni bir geçmiş kaydı ekler; böylece geri tuşu bir önceki duruma döner.
 */
export function useProductQuery() {
  const [searchParams, setSearchParams] = useSearchParams()
  const query = useMemo(() => parseProductQuery(searchParams, categories), [searchParams])

  const updateQuery = useCallback(
    (patch: Partial<ProductQuery>) => {
      const next = toSearchParams({ ...query, ...patch }, categories)
      // Görünüm değişmiyorsa geçmişe yinelenen kayıt eklenmez.
      if (next.toString() === toSearchParams(query, categories).toString()) return
      setSearchParams(next, { preventScrollReset: true })
    },
    [query, setSearchParams],
  )

  return { query, updateQuery }
}
