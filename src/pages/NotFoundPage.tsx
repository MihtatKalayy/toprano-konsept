import { Link } from 'react-router'
import { PagePlaceholder } from '../components/PagePlaceholder'
import { site } from '../content/site'
import { paths } from '../routes/paths'

export function NotFoundPage() {
  const { title, placeholder, backHome } = site.pages.notFound

  return (
    <PagePlaceholder title={title} description={placeholder}>
      <Link
        to={paths.home}
        className="mt-8 inline-flex min-h-11 items-center rounded-md bg-vurgu px-5 font-semibold text-vurgu-metin transition-colors hover:bg-vurgu-hover"
      >
        {backHome}
      </Link>
    </PagePlaceholder>
  )
}
