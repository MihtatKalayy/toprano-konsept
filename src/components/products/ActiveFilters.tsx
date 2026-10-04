import { categories } from '../../content/catalog'
import { site } from '../../content/site'
import { emptyFilters, findCategory, type ProductQuery } from '../../lib/catalog'
import { formatPrice } from '../../lib/money'

interface ActiveFiltersProps {
  query: ProductQuery
  onChange: (patch: Partial<ProductQuery>) => void
}

interface Chip {
  key: string
  label: string
  patch: Partial<ProductQuery>
}

const copy = site.pages.products

export function ActiveFilters({ query, onChange }: ActiveFiltersProps) {
  const chips: Chip[] = [
    ...query.categoryIds.map((id) => ({
      key: id,
      label: findCategory(categories, id)?.name ?? id,
      patch: { categoryIds: query.categoryIds.filter((categoryId) => categoryId !== id) },
    })),
    ...(query.minKurus !== null
      ? [{ key: 'min', label: copy.minPriceChip(formatPrice(query.minKurus)), patch: { minKurus: null } }]
      : []),
    ...(query.maxKurus !== null
      ? [{ key: 'max', label: copy.maxPriceChip(formatPrice(query.maxKurus)), patch: { maxKurus: null } }]
      : []),
    ...(query.search.trim() !== ''
      ? [{ key: 'search', label: copy.searchChip(query.search.trim()), patch: { search: '' } }]
      : []),
  ]

  if (chips.length === 0) return null

  return (
    <div className="flex flex-wrap items-center gap-2">
      <h2 className="sr-only">{copy.activeFiltersLabel}</h2>
      <ul className="flex flex-wrap gap-2">
        {chips.map((chip) => (
          <li key={chip.key}>
            <button
              type="button"
              onClick={() => onChange(chip.patch)}
              aria-label={copy.removeFilter(chip.label)}
              className="inline-flex min-h-11 max-w-full items-center gap-2 rounded-full bg-krem-200 px-4 text-sm font-semibold text-antrasit-900 transition-colors hover:bg-kiremit-100"
            >
              <span className="truncate">{chip.label}</span>
              <svg aria-hidden="true" viewBox="0 0 16 16" className="size-3.5 shrink-0" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                <path d="M4 4l8 8M12 4l-8 8" />
              </svg>
            </button>
          </li>
        ))}
      </ul>
      <button
        type="button"
        onClick={() => onChange(emptyFilters)}
        className="min-h-11 rounded-md px-2 text-sm font-semibold text-kiremit-700 underline underline-offset-4 hover:text-kiremit-800"
      >
        {copy.clearFilters}
      </button>
    </div>
  )
}
