import { useEffect, useId, useState, type FormEvent } from 'react'
import { site } from '../../content/site'
import { sortOptions, type ProductQuery, type SortOption } from '../../lib/catalog'

interface ProductToolbarProps {
  query: ProductQuery
  onChange: (patch: Partial<ProductQuery>) => void
}

const copy = site.pages.products
const searchDelayMs = 400

const fieldClass = 'mt-1 block min-h-11 w-full rounded-md border border-antrasit-600 bg-notr px-3 text-antrasit-900'

export function ProductToolbar({ query, onChange }: ProductToolbarProps) {
  const searchId = useId()
  const sortId = useId()
  const [text, setText] = useState(query.search)
  const [syncedSearch, setSyncedSearch] = useState(query.search)

  // Adresteki arama değişince (geri tuşu, filtre temizleme) kutuyu güncelle.
  if (syncedSearch !== query.search) {
    setSyncedSearch(query.search)
    setText(query.search)
  }

  // Yazmaya ara verilince arama adrese yazılır.
  useEffect(() => {
    if (text === query.search) return
    const timer = window.setTimeout(() => {
      setSyncedSearch(text)
      onChange({ search: text })
    }, searchDelayMs)
    return () => window.clearTimeout(timer)
  }, [text, query.search, onChange])

  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (text === query.search) return
    setSyncedSearch(text)
    onChange({ search: text })
  }

  return (
    <div className="grid gap-3 sm:grid-cols-[1fr_auto]">
      <form role="search" onSubmit={submit}>
        <label htmlFor={searchId} className="block text-sm font-semibold text-antrasit-700">
          {copy.searchLabel}
        </label>
        <input
          id={searchId}
          type="search"
          value={text}
          maxLength={100}
          placeholder={copy.searchPlaceholder}
          onChange={(event) => setText(event.target.value)}
          className={fieldClass}
        />
      </form>
      <div>
        <label htmlFor={sortId} className="block text-sm font-semibold text-antrasit-700">
          {copy.sortLabel}
        </label>
        <select
          id={sortId}
          value={query.sort}
          onChange={(event) => onChange({ sort: event.target.value as SortOption })}
          className={fieldClass}
        >
          {sortOptions.map((option) => (
            <option key={option} value={option}>
              {copy.sortOptions[option]}
            </option>
          ))}
        </select>
      </div>
    </div>
  )
}
