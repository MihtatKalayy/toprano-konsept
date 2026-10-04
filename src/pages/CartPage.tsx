import { PagePlaceholder } from '../components/PagePlaceholder'
import { site } from '../content/site'

export function CartPage() {
  const { title, placeholder } = site.pages.cart
  return <PagePlaceholder title={title} description={placeholder} />
}
