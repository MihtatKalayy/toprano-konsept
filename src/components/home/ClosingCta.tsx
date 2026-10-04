import { Link } from 'react-router'
import { site } from '../../content/site'
import { paths } from '../../routes/paths'

const copy = site.pages.home.closing

export function ClosingCta() {
  return (
    <section aria-labelledby="kapanis" className="mx-auto max-w-6xl px-4 py-16 text-center sm:px-6">
      <h2 id="kapanis" className="text-3xl font-semibold">
        {copy.heading}
      </h2>
      <p className="mx-auto mt-3 max-w-prose text-lg text-antrasit-700">{copy.text}</p>
      <Link
        to={paths.products}
        className="mt-8 inline-flex min-h-12 items-center rounded-md bg-vurgu px-6 text-lg font-semibold text-vurgu-metin transition-colors hover:bg-vurgu-hover"
      >
        {copy.cta}
      </Link>
    </section>
  )
}
