import { useEffect, useRef, useState } from 'react'
import { Link, Navigate } from 'react-router'
import { useCartActions } from '../cart/useCart'
import { discardConfirmation, peekConfirmation } from '../checkout/confirmation'
import { OrderSummary } from '../components/checkout/OrderSummary'
import { site } from '../content/site'
import { usePageMeta } from '../hooks/usePageMeta'
import { paths } from '../routes/paths'

const copy = site.pages.checkout.confirmation

export function CheckoutConfirmationPage() {
  usePageMeta(copy.title, copy.metaDescription, { noindex: true })
  // Onay bellekten bir kez okunur. Yenilemede ya da adres doğrudan açıldığında bulunmaz ve ana sayfaya yönlenilir.
  const [confirmation] = useState(peekConfirmation)
  const { clear } = useCartActions()
  const headingRef = useRef<HTMLHeadingElement>(null)

  useEffect(() => {
    if (!confirmation) return
    discardConfirmation()
    clear()
    // Odak başlığa taşınır; ekran okuyucu onay ekranını başlıkla birlikte duyurur.
    headingRef.current?.focus()
  }, [confirmation, clear])

  if (!confirmation) return <Navigate to={paths.home} replace />

  return (
    <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6 sm:py-14">
      <h1 ref={headingRef} tabIndex={-1} className="text-4xl font-semibold focus:outline-none">
        {copy.heading}
      </h1>
      <p className="mt-4 rounded-lg border-2 border-kiremit-700 bg-kiremit-50 px-4 py-3 text-lg font-semibold text-kiremit-800">{copy.conceptNote}</p>
      <div className="mt-8">
        <OrderSummary lines={confirmation.lines} summary={confirmation.summary} headingId="onay-ozeti" heading={copy.summaryHeading} />
      </div>
      <Link
        to={paths.products}
        className="mt-8 inline-flex min-h-12 items-center rounded-md bg-vurgu px-6 text-lg font-semibold text-vurgu-metin transition-colors hover:bg-vurgu-hover"
      >
        {copy.continueShopping}
      </Link>
    </div>
  )
}
