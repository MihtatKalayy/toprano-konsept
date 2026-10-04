import { Link } from 'react-router'
import { shopConfig } from '../../config/shop'
import { site } from '../../content/site'
import type { CartSummary as Summary } from '../../lib/cart'
import { formatPrice } from '../../lib/money'
import { paths } from '../../routes/paths'

const copy = site.pages.cart

export function CartSummary({ summary }: { summary: Summary }) {
  const shippingText = summary.shippingKurus === 0 ? copy.freeShipping : formatPrice(summary.shippingKurus)

  return (
    <section aria-labelledby="siparis-ozeti" className="rounded-lg bg-notr p-5 ring-1 ring-krem-200 lg:sticky lg:top-24">
      <h2 id="siparis-ozeti" className="text-xl font-semibold">
        {copy.summaryHeading}
      </h2>
      <dl className="mt-4 space-y-2">
        <div className="flex justify-between gap-4">
          <dt className="text-antrasit-700">{copy.subtotal}</dt>
          <dd className="font-semibold">{formatPrice(summary.subtotalKurus)}</dd>
        </div>
        <div className="flex justify-between gap-4">
          <dt className="text-antrasit-700">{copy.shipping}</dt>
          <dd className="font-semibold">{shippingText}</dd>
        </div>
        <div className="flex justify-between gap-4 border-t border-krem-200 pt-3 text-lg">
          <dt className="font-semibold">{copy.total}</dt>
          <dd className="font-semibold">{formatPrice(summary.totalKurus)}</dd>
        </div>
      </dl>

      <p className="mt-4 rounded-md bg-kiremit-50 px-3 py-2 text-sm font-semibold text-kiremit-800">
        {summary.remainingForFreeShippingKurus > 0
          ? copy.freeShippingRemaining(formatPrice(summary.remainingForFreeShippingKurus))
          : copy.freeShippingEarned}
      </p>
      <p className="mt-2 text-sm text-antrasit-700">
        {copy.freeShippingRule(formatPrice(shopConfig.freeShippingThresholdKurus), formatPrice(shopConfig.shippingFeeKurus))}
      </p>

      <Link
        to={paths.checkout}
        className="mt-5 flex min-h-11 items-center justify-center rounded-md bg-vurgu px-5 font-semibold text-vurgu-metin transition-colors hover:bg-vurgu-hover"
      >
        {copy.checkout}
      </Link>
      <Link
        to={paths.products}
        className="mt-2 flex min-h-11 items-center justify-center rounded-md px-5 font-semibold text-kiremit-700 underline underline-offset-4 hover:text-kiremit-800"
      >
        {copy.continueShopping}
      </Link>
    </section>
  )
}
