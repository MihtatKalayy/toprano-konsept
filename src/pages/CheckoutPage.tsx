import { Link, useNavigate } from 'react-router'
import { useCart } from '../cart/useCart'
import { stashConfirmation } from '../checkout/confirmation'
import { DeliveryForm } from '../components/checkout/DeliveryForm'
import { OrderSummary } from '../components/checkout/OrderSummary'
import { site } from '../content/site'
import { usePageMeta } from '../hooks/usePageMeta'
import { paths } from '../routes/paths'

const copy = site.pages.checkout

export function CheckoutPage() {
  usePageMeta(copy.title)
  const { lines, summary } = useCart()
  const navigate = useNavigate()

  // Geçerli gönderimde ağ isteği yapılmaz; yalnızca ürünler ve toplamlar bellekte onay ekranına aktarılır.
  // Sepet, onay ekranı gösterildiğinde boşaltılır.
  const confirm = () => {
    stashConfirmation({ lines, summary })
    void navigate(paths.checkoutConfirmation)
  }

  return (
    <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 sm:py-12">
      <h1 className="text-3xl font-semibold sm:text-4xl">{copy.title}</h1>
      <p className="mt-4 rounded-lg border-2 border-kiremit-700 bg-kiremit-50 px-4 py-3 font-semibold text-kiremit-800">{copy.conceptNotice}</p>

      {lines.length === 0 ? (
        <div className="mt-8 rounded-lg border border-dashed border-antrasit-600 bg-notr px-6 py-12 text-center">
          <h2 className="text-2xl font-semibold">{copy.empty.title}</h2>
          <p className="mx-auto mt-2 max-w-prose text-antrasit-700">{copy.empty.text}</p>
          <Link
            to={paths.products}
            className="mt-6 inline-flex min-h-11 items-center rounded-md bg-vurgu px-5 font-semibold text-vurgu-metin transition-colors hover:bg-vurgu-hover"
          >
            {copy.empty.cta}
          </Link>
        </div>
      ) : (
        // Özet DOM'da önce gelir: mobilde formdan önce görünür; geniş ekranda sağ sütuna yerleşir.
        <div className="mt-8 grid items-start gap-8 lg:grid-cols-[minmax(0,1fr)_24rem]">
          <div className="lg:sticky lg:top-24 lg:col-start-2 lg:row-start-1">
            <OrderSummary lines={lines} summary={summary} headingId="siparis-ozeti" showEditLink collapsibleOnMobile />
          </div>
          <div className="lg:col-start-1 lg:row-start-1">
            <DeliveryForm onValidSubmit={confirm} />
          </div>
        </div>
      )}
    </div>
  )
}
