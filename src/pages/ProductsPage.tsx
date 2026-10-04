import { useId, useMemo, useState } from 'react'
import { ActiveFilters } from '../components/products/ActiveFilters'
import { FilterPanel } from '../components/products/FilterPanel'
import { ProductCard } from '../components/products/ProductCard'
import { ProductToolbar } from '../components/products/ProductToolbar'
import { categories, products } from '../content/catalog'
import { site } from '../content/site'
import { usePageTitle } from '../hooks/usePageTitle'
import { useProductQuery } from '../hooks/useProductQuery'
import { emptyFilters, findCategory, queryProducts } from '../lib/catalog'

const copy = site.pages.products
// Mobilde ilk ekranda görünen kart sayısı; bunların görselleri tembel yüklenmez.
const eagerImageCount = 2

export function ProductsPage() {
  usePageTitle(copy.title)
  const { query, updateQuery } = useProductQuery()
  const results = useMemo(() => queryProducts(products, categories, query), [query])
  const [filtersOpen, setFiltersOpen] = useState(false)
  const panelId = useId()

  const activeFilterCount =
    query.categoryIds.length + Number(query.minKurus !== null) + Number(query.maxKurus !== null)

  return (
    <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 sm:py-12">
      <h1 className="text-3xl font-semibold sm:text-4xl">{copy.title}</h1>
      <p className="mt-3 max-w-prose text-lg text-antrasit-700">{copy.intro}</p>

      <div className="mt-8 grid gap-8 lg:grid-cols-[15rem_minmax(0,1fr)]">
        <aside aria-labelledby={`${panelId}-baslik`}>
          <button
            type="button"
            aria-expanded={filtersOpen}
            aria-controls={panelId}
            onClick={() => setFiltersOpen((open) => !open)}
            className="inline-flex min-h-11 w-full items-center justify-between rounded-md border border-antrasit-600 bg-notr px-4 font-semibold lg:hidden"
          >
            <span>{copy.filtersToggle(activeFilterCount)}</span>
            <svg aria-hidden="true" viewBox="0 0 16 16" className={`size-4 transition-transform ${filtersOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M3 6l5 5 5-5" />
            </svg>
          </button>
          <div id={panelId} className={`${filtersOpen ? 'block' : 'hidden'} mt-4 rounded-lg bg-notr p-4 ring-1 ring-krem-200 lg:mt-0 lg:block`}>
            <h2 id={`${panelId}-baslik`} className="sr-only lg:not-sr-only lg:mb-4 lg:font-display lg:text-xl lg:font-semibold">
              {copy.filtersHeading}
            </h2>
            <FilterPanel query={query} onChange={updateQuery} />
          </div>
        </aside>

        <section className="min-w-0">
          <ProductToolbar query={query} onChange={updateQuery} />

          <div className="mt-6 flex flex-col gap-3">
            <p role="status" className="font-semibold text-antrasit-700">
              {copy.resultCount(results.length)}
            </p>
            <ActiveFilters query={query} onChange={updateQuery} />
          </div>

          {results.length > 0 ? (
            <ul className="mt-6 grid grid-cols-2 gap-3 sm:gap-5 md:grid-cols-3 xl:grid-cols-4">
              {results.map((product, index) => (
                <li key={product.id}>
                  <ProductCard
                    product={product}
                    category={findCategory(categories, product.categoryId)}
                    eager={index < eagerImageCount}
                  />
                </li>
              ))}
            </ul>
          ) : (
            <div className="mt-6 rounded-lg border border-dashed border-antrasit-600 bg-notr px-6 py-10 text-center">
              <h2 className="text-xl font-semibold">{copy.emptyTitle}</h2>
              <p className="mx-auto mt-2 max-w-prose text-antrasit-700">{copy.emptyText}</p>
              <button
                type="button"
                onClick={() => updateQuery(emptyFilters)}
                className="mt-6 inline-flex min-h-11 items-center rounded-md bg-vurgu px-5 font-semibold text-vurgu-metin transition-colors hover:bg-vurgu-hover"
              >
                {copy.clearFilters}
              </button>
            </div>
          )}
        </section>
      </div>
    </div>
  )
}
