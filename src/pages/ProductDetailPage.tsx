import { useParams } from 'react-router'
import { PagePlaceholder } from '../components/PagePlaceholder'
import { site } from '../content/site'

export function ProductDetailPage() {
  const { slug } = useParams()
  const { title, placeholder, slugLabel } = site.pages.productDetail

  return (
    <PagePlaceholder title={title} description={placeholder}>
      <p className="mt-6 text-antrasit-700">
        {slugLabel} <code className="rounded bg-krem-200 px-1.5 py-0.5 text-antrasit-900">{slug}</code>
      </p>
    </PagePlaceholder>
  )
}
