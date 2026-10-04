import { PagePlaceholder } from '../components/PagePlaceholder'
import { site } from '../content/site'

export function HomePage() {
  const { title, placeholder } = site.pages.home
  return <PagePlaceholder title={title} description={placeholder} />
}
