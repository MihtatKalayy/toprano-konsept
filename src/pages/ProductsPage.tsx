import { PagePlaceholder } from '../components/PagePlaceholder'
import { site } from '../content/site'

export function ProductsPage() {
  const { title, placeholder } = site.pages.products
  return <PagePlaceholder title={title} description={placeholder} />
}
