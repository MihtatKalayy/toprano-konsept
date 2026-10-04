import { Link } from 'react-router'
import { site } from '../content/site'
import { usePageMeta } from '../hooks/usePageMeta'
import { paths } from '../routes/paths'

const copy = site.pages.notFound

export function NotFoundPage() {
  usePageMeta(copy.title, copy.metaDescription, { noindex: true })

  return (
    <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-16">
      <h1 className="text-3xl font-semibold sm:text-4xl">{copy.title}</h1>
      <p className="mt-4 max-w-prose text-lg text-antrasit-700">{copy.description}</p>
      <Link
        to={paths.home}
        className="mt-8 inline-flex min-h-11 items-center rounded-md bg-vurgu px-5 font-semibold text-vurgu-metin transition-colors hover:bg-vurgu-hover"
      >
        {copy.backHome}
      </Link>
    </div>
  )
}
