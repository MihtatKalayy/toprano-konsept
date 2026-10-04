import { categories, products } from '../../content/catalog'
import { site } from '../../content/site'
import type { Product, ProductSpecs } from '../../content/types'
import { usePageMeta } from '../../hooks/usePageMeta'
import { findCategory, getRelatedProducts } from '../../lib/catalog'
import { formatPrice } from '../../lib/money'
import { productsPathForCategory } from '../../lib/productQuery'
import { paths } from '../../routes/paths'
import { ProductCard } from '../products/ProductCard'
import { Breadcrumb, type Crumb } from './Breadcrumb'
import { ProductGallery } from './ProductGallery'
import { StockStatus } from './StockStatus'

const copy = site.pages.productDetail
const specOrder: (keyof ProductSpecs)[] = ['dimensions', 'capacity', 'weight', 'care']

export function ProductDetail({ product }: { product: Product }) {
  usePageMeta(product.name, copy.metaDescription(product.name, product.shortDescription))

  const category = findCategory(categories, product.categoryId)
  const related = getRelatedProducts(products, product)
  const crumbs: Crumb[] = [
    { label: copy.homeCrumb, to: paths.home },
    { label: copy.productsCrumb, to: paths.products },
    ...(category ? [{ label: category.name, to: productsPathForCategory(category, categories) }] : []),
    { label: product.name },
  ]
  const specs = specOrder.flatMap((key) => {
    const value = product.specs[key]
    return value ? [{ key, label: copy.specLabels[key], value }] : []
  })
  const soldOut = product.stock === 'out-of-stock'

  return (
    <div className="mx-auto max-w-6xl px-4 py-6 sm:px-6 sm:py-10">
      <Breadcrumb items={crumbs} />

      <div className="mt-4 grid gap-8 md:grid-cols-2 lg:gap-12">
        <ProductGallery images={product.images} productName={product.name} />

        <div className="min-w-0">
          {category && <p className="text-sm font-semibold tracking-wide text-antrasit-600 uppercase">{category.name}</p>}
          <h1 className="mt-1 text-3xl font-semibold sm:text-4xl">{product.name}</h1>
          <p className="mt-4 text-2xl font-semibold text-antrasit-900">{formatPrice(product.priceKurus)}</p>
          <div className="mt-3">
            <StockStatus stock={product.stock} />
          </div>
          <p className="mt-5 text-lg text-antrasit-700">{product.shortDescription}</p>

          <section aria-labelledby="satin-alma" className="mt-8">
            <h2 id="satin-alma" className="sr-only">
              {copy.purchaseHeading}
            </h2>
            {soldOut ? (
              <div className="rounded-lg bg-antrasit-900 px-5 py-4 text-krem">
                <p className="font-display text-xl font-semibold">{copy.outOfStockTitle}</p>
                <p className="mt-1 text-krem-200">{copy.outOfStockText}</p>
              </div>
            ) : (
              // Sepet adımında adet seçimi ve "Sepete ekle" butonu bu alana gelecek.
              <p className="rounded-lg border border-dashed border-antrasit-600 px-5 py-4 text-antrasit-700">
                {copy.purchasePlaceholder}
              </p>
            )}
          </section>
        </div>
      </div>

      <section aria-labelledby="ayrintilar" className="mt-12 grid gap-8 border-t border-krem-200 pt-10 lg:grid-cols-[3fr_2fr] lg:gap-12">
        <div>
          <h2 id="ayrintilar" className="text-2xl font-semibold">
            {copy.detailsHeading}
          </h2>
          <p className="mt-4 max-w-prose text-lg leading-relaxed text-antrasit-900">{product.description}</p>
          <p className="mt-4 max-w-prose rounded-md bg-kiremit-50 px-4 py-3 text-kiremit-800">{copy.handmadeNote}</p>
        </div>
        <div>
          <h3 className="text-xl font-semibold">{copy.specsHeading}</h3>
          <dl className="mt-4 divide-y divide-krem-200 rounded-lg bg-notr px-4 ring-1 ring-krem-200">
            {specs.map((spec) => (
              <div key={spec.key} className="grid gap-1 py-3 sm:grid-cols-[7rem_1fr] sm:gap-4">
                <dt className="font-semibold text-antrasit-700">{spec.label}</dt>
                <dd className="text-antrasit-900">{spec.value}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {related.length > 0 && (
        <section aria-labelledby="benzer-urunler" className="mt-12 border-t border-krem-200 pt-10">
          <h2 id="benzer-urunler" className="text-2xl font-semibold">
            {copy.relatedHeading}
          </h2>
          <ul className="mt-6 grid grid-cols-2 gap-3 sm:gap-5 md:grid-cols-3 xl:grid-cols-4">
            {related.map((item) => (
              <li key={item.id}>
                <ProductCard
                  product={item}
                  category={findCategory(categories, item.categoryId)}
                  eager={false}
                  headingLevel="h3"
                />
              </li>
            ))}
          </ul>
        </section>
      )}
    </div>
  )
}
