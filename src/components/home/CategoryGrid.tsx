import { Link } from 'react-router'
import { categories, products } from '../../content/catalog'
import { site } from '../../content/site'
import { getCategoryShowcase } from '../../lib/catalog'
import { productsPathForCategory } from '../../lib/productQuery'

const copy = site.pages.home.categories

export function CategoryGrid() {
  const showcase = getCategoryShowcase(categories, products)

  return (
    <section aria-labelledby="kategoriler" className="mx-auto max-w-6xl px-4 py-14 sm:px-6">
      <h2 id="kategoriler" className="text-3xl font-semibold">
        {copy.heading}
      </h2>
      <p className="mt-2 text-lg text-antrasit-700">{copy.intro}</p>
      <ul className="mt-8 grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
        {showcase.map(({ category, productCount, coverProduct }) => {
          // Öne çıkan ürünlerle aynı görseli tekrarlamamak için kapakta yakın görünüm kullanılır.
          const image = coverProduct?.images[1] ?? coverProduct?.images[0]
          return (
            <li key={category.id}>
              <Link
                to={productsPathForCategory(category, categories)}
                className="group flex h-full flex-col overflow-hidden rounded-lg bg-notr ring-1 ring-krem-200 transition-shadow hover:shadow-md"
              >
                <div className="aspect-[4/3] overflow-hidden bg-krem-200">
                  {image && (
                    // Kategori adı kartta yazılı; görsel süs niteliğindedir.
                    <img
                      src={image.src}
                      alt=""
                      width={image.width}
                      height={image.height}
                      loading="lazy"
                      decoding="async"
                      className="size-full object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                  )}
                </div>
                <div className="flex flex-1 flex-col p-3 sm:p-4">
                  <h3 className="text-lg font-semibold group-hover:text-kiremit-700 sm:text-xl">{category.name}</h3>
                  <p className="mt-1 text-sm text-antrasit-700 sm:text-base">{copy.descriptions[category.id]}</p>
                  <p className="mt-auto pt-3 text-sm font-semibold text-antrasit-600">{copy.productCount(productCount)}</p>
                </div>
              </Link>
            </li>
          )
        })}
      </ul>
    </section>
  )
}
