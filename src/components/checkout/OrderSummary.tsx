import { Link } from 'react-router'
import { site } from '../../content/site'
import type { CartSummary, ResolvedLine } from '../../lib/cart'
import { formatPrice } from '../../lib/money'
import { paths } from '../../routes/paths'

const copy = site.pages.checkout.summary

interface OrderSummaryProps {
  lines: ResolvedLine[]
  summary: CartSummary
  headingId: string
  heading?: string
  /** Sipariş sayfasında "Sepeti düzenle" bağlantısı gösterilir; onay ekranında gösterilmez. */
  showEditLink?: boolean
  /** Mobilde ürün listesi açılır-kapanır bir alanda (kısa özet); geniş ekranda her zaman açık. */
  collapsibleOnMobile?: boolean
}

function LineList({ lines }: { lines: ResolvedLine[] }) {
  return (
    <ul className="divide-y divide-krem-200">
      {lines.map(({ product, quantity, lineTotalKurus }) => {
        const [image] = product.images
        return (
          <li key={product.id} className="flex items-center gap-3 py-3">
            <div className="size-14 shrink-0 overflow-hidden rounded-md bg-krem-200">
              {image && (
                <img src={image.src} alt="" width={image.width} height={image.height} loading="lazy" decoding="async" className="size-full object-cover" />
              )}
            </div>
            <div className="min-w-0 flex-1">
              <p className="font-semibold leading-snug">{product.name}</p>
              <p className="text-sm text-antrasit-700">{copy.quantity(quantity)}</p>
            </div>
            <p className="font-semibold">{formatPrice(lineTotalKurus)}</p>
          </li>
        )
      })}
    </ul>
  )
}

/** Satırlar ve toplamlar sepet hesaplama işlevlerinden gelir; burada yeniden hesaplanmaz. */
export function OrderSummary({ lines, summary, headingId, heading = copy.heading, showEditLink = false, collapsibleOnMobile = false }: OrderSummaryProps) {
  return (
    <section aria-labelledby={headingId} className="rounded-lg bg-notr p-5 ring-1 ring-krem-200">
      <div className="flex flex-wrap items-baseline justify-between gap-2">
        <h2 id={headingId} className="text-xl font-semibold">
          {heading}
        </h2>
        {showEditLink && (
          <Link to={paths.cart} className="inline-flex min-h-11 items-center text-sm font-semibold text-kiremit-700 underline underline-offset-4 hover:text-kiremit-800">
            {copy.editCart}
          </Link>
        )}
      </div>

      {collapsibleOnMobile ? (
        <>
          <details className="mt-2 lg:hidden">
            <summary className="flex min-h-11 cursor-pointer items-center font-semibold text-kiremit-700">{copy.itemsToggle(summary.itemCount)}</summary>
            <LineList lines={lines} />
          </details>
          <div className="mt-2 hidden lg:block">
            <LineList lines={lines} />
          </div>
        </>
      ) : (
        <div className="mt-2">
          <LineList lines={lines} />
        </div>
      )}

      <dl className="mt-3 space-y-2 border-t border-krem-200 pt-3">
        <div className="flex justify-between gap-4">
          <dt className="text-antrasit-700">{copy.subtotal}</dt>
          <dd className="font-semibold">{formatPrice(summary.subtotalKurus)}</dd>
        </div>
        <div className="flex justify-between gap-4">
          <dt className="text-antrasit-700">{copy.shipping}</dt>
          <dd className="font-semibold">{summary.shippingKurus === 0 ? copy.freeShipping : formatPrice(summary.shippingKurus)}</dd>
        </div>
        <div className="flex justify-between gap-4 border-t border-krem-200 pt-3 text-lg">
          <dt className="font-semibold">{copy.total}</dt>
          <dd className="font-semibold">{formatPrice(summary.totalKurus)}</dd>
        </div>
      </dl>
    </section>
  )
}
