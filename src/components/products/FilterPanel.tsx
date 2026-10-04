import { useState, type FormEvent } from 'react'
import { categories } from '../../content/catalog'
import { site } from '../../content/site'
import type { CategoryId } from '../../content/types'
import type { ProductQuery } from '../../lib/catalog'
import { kurusToWholeLira } from '../../lib/money'
import { maxFilterLira, parseLira } from '../../lib/productQuery'

interface FilterPanelProps {
  query: ProductQuery
  onChange: (patch: Partial<ProductQuery>) => void
}

const copy = site.pages.products

const toInputValue = (kurus: number | null) => (kurus === null ? '' : String(kurusToWholeLira(kurus)))

const inputClass =
  'mt-1 block min-h-11 w-full rounded-md border border-antrasit-600 bg-notr px-3 text-antrasit-900'

export function FilterPanel({ query, onChange }: FilterPanelProps) {
  const toggleCategory = (id: CategoryId, checked: boolean) => {
    const next = checked ? [...query.categoryIds, id] : query.categoryIds.filter((categoryId) => categoryId !== id)
    onChange({ categoryIds: next })
  }

  return (
    <div className="space-y-8">
      <fieldset>
        <legend className="font-display text-lg font-semibold">{copy.categoryLegend}</legend>
        <ul className="mt-2">
          {categories.map((category) => (
            <li key={category.id}>
              <label className="flex min-h-11 cursor-pointer items-center gap-3">
                <input
                  type="checkbox"
                  checked={query.categoryIds.includes(category.id)}
                  onChange={(event) => toggleCategory(category.id, event.target.checked)}
                  className="size-5 accent-vurgu"
                />
                <span>{category.name}</span>
              </label>
            </li>
          ))}
        </ul>
      </fieldset>

      <PriceFilter minKurus={query.minKurus} maxKurus={query.maxKurus} onChange={onChange} />
    </div>
  )
}

interface PriceFilterProps {
  minKurus: number | null
  maxKurus: number | null
  onChange: (patch: Partial<ProductQuery>) => void
}

function PriceFilter({ minKurus, maxKurus, onChange }: PriceFilterProps) {
  const [min, setMin] = useState(toInputValue(minKurus))
  const [max, setMax] = useState(toInputValue(maxKurus))
  const [synced, setSynced] = useState({ minKurus, maxKurus })

  // Adres değişince (geri tuşu, filtre temizleme) kutuları adresteki değerle eşitle.
  if (synced.minKurus !== minKurus || synced.maxKurus !== maxKurus) {
    setSynced({ minKurus, maxKurus })
    setMin(toInputValue(minKurus))
    setMax(toInputValue(maxKurus))
  }

  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const nextMin = parseLira(min)
    const nextMax = parseLira(max)
    const swap = nextMin !== null && nextMax !== null && nextMin > nextMax
    onChange(swap ? { minKurus: nextMax, maxKurus: nextMin } : { minKurus: nextMin, maxKurus: nextMax })
  }

  return (
    <form onSubmit={submit}>
      <fieldset>
        <legend className="font-display text-lg font-semibold">{copy.priceLegend}</legend>
        <div className="mt-2 grid grid-cols-2 gap-3">
          <label className="block text-sm font-semibold text-antrasit-700">
            {copy.minPriceLabel}
            <input
              type="number"
              inputMode="numeric"
              min={0}
              max={maxFilterLira}
              step={1}
              value={min}
              onChange={(event) => setMin(event.target.value)}
              className={inputClass}
            />
          </label>
          <label className="block text-sm font-semibold text-antrasit-700">
            {copy.maxPriceLabel}
            <input
              type="number"
              inputMode="numeric"
              min={0}
              max={maxFilterLira}
              step={1}
              value={max}
              onChange={(event) => setMax(event.target.value)}
              className={inputClass}
            />
          </label>
        </div>
        <button
          type="submit"
          className="mt-3 min-h-11 w-full rounded-md border border-vurgu px-4 font-semibold text-kiremit-700 transition-colors hover:bg-kiremit-50"
        >
          {copy.applyPrice}
        </button>
      </fieldset>
    </form>
  )
}
