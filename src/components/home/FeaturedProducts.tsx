import { Link } from 'react-router'
import { categories, products } from '../../content/catalog'
import { site } from '../../content/site'
import { findCategory, getFeaturedProducts } from '../../lib/catalog'
import { paths } from '../../routes/paths'
import { ProductCard } from '../products/ProductCard'

const copy = site.pages.home.featured

export function FeaturedProducts() {
  const featured = getFeaturedProducts(products)
  if (featured.length === 0) return null

  return (
    <section aria-labelledby="one-cikanlar" className="bg-krem-200">
      <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6">
        <h2 id="one-cikanlar" className="text-3xl font-semibold">
          {copy.heading}
        </h2>
        <p className="mt-2 text-lg text-antrasit-700">{copy.intro}</p>
        <ul className="mt-8 grid grid-cols-2 gap-3 sm:gap-5 md:grid-cols-4">
          {featured.map((product) => (
            <li key={product.id}>
              <ProductCard product={product} category={findCategory(categories, product.categoryId)} eager={false} headingLevel="h3" />
            </li>
          ))}
        </ul>
        <Link
          to={paths.products}
          className="mt-8 inline-flex min-h-11 items-center gap-2 font-semibold text-kiremit-700 underline underline-offset-4 hover:text-kiremit-800"
        >
          {copy.viewAll}
          <svg aria-hidden="true" viewBox="0 0 16 16" className="size-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M3 8h10M9 4l4 4-4 4" />
          </svg>
        </Link>
      </div>
    </section>
  )
}
