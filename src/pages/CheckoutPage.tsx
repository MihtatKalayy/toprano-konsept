import { PagePlaceholder } from '../components/PagePlaceholder'
import { site } from '../content/site'

export function CheckoutPage() {
  const { title, placeholder } = site.pages.checkout

  return (
    <PagePlaceholder title={title} description={placeholder}>
      <p className="mt-6 rounded-md border border-kiremit-300 bg-kiremit-50 p-4 font-semibold text-kiremit-800">
        {site.conceptNotice}
      </p>
    </PagePlaceholder>
  )
}
