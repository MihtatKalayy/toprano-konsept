import { Link } from 'react-router'
import type { Category, Product } from '../../content/types'
import { formatPrice } from '../../lib/money'
import { productPath } from '../../routes/paths'
import { StockBadge } from './StockBadge'

interface ProductCardProps {
  product: Product
  category: Category | undefined
  /** İlk ekranda görünen kartların görselleri beklemeden yüklenir. */
  eager: boolean
}

export function ProductCard({ product, category, eager }: ProductCardProps) {
  const [image] = product.images

  return (
    <Link
      to={productPath(product.slug)}
      className="group flex h-full flex-col rounded-lg bg-notr p-2 shadow-sm ring-1 ring-krem-200 transition-shadow hover:shadow-md sm:p-3"
    >
      <div className="relative aspect-square overflow-hidden rounded-md bg-krem-200">
        {image && (
          // Ürün adı kartta yazılı olduğundan görsel burada süs niteliğindedir; alt metin detay sayfasında kullanılır.
          <img
            src={image.src}
            alt=""
            width={image.width}
            height={image.height}
            loading={eager ? 'eager' : 'lazy'}
            decoding="async"
            className={`size-full object-cover transition-transform duration-300 group-hover:scale-105 ${product.stock === 'out-of-stock' ? 'opacity-60' : ''}`}
          />
        )}
        <StockBadge stock={product.stock} className="absolute top-2 left-2" />
      </div>
      <div className="flex flex-1 flex-col px-1 pt-3">
        <h2 className="text-base leading-snug font-semibold group-hover:text-kiremit-700 sm:text-lg">{product.name}</h2>
        {category && <p className="mt-1 text-sm text-antrasit-600">{category.name}</p>}
        <p className="mt-auto pt-2 font-semibold text-antrasit-900">{formatPrice(product.priceKurus)}</p>
      </div>
    </Link>
  )
}
