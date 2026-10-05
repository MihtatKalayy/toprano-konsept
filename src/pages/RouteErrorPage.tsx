import { useEffect, useRef } from 'react'
import { Link, useRouteError } from 'react-router'
import { AppShell } from '../components/layout/AppShell'
import { site } from '../content/site'
import { usePageMeta } from '../hooks/usePageMeta'
import { paths } from '../routes/paths'

const copy = site.routeError

/** Sayfa parçası yüklenemezse (örn. yeni yayından sonra eski dosya) ya da beklenmedik bir hata olursa gösterilir. */
export function RouteErrorPage() {
  const error = useRouteError()
  const mainRef = useRef<HTMLElement>(null)
  usePageMeta(copy.title, copy.metaDescription, { noindex: true })

  useEffect(() => {
    console.error('[sayfa] Sayfa gösterilemedi.', error)
  }, [error])

  return (
    <AppShell mainRef={mainRef}>
      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-16">
        <h1 className="text-3xl font-semibold sm:text-4xl">{copy.title}</h1>
        <p className="mt-4 max-w-prose text-lg text-antrasit-700">{copy.description}</p>
        <div className="mt-8 flex flex-wrap gap-3">
          <button
            type="button"
            onClick={() => window.location.reload()}
            className="inline-flex min-h-11 items-center rounded-md bg-vurgu px-5 font-semibold text-vurgu-metin transition-colors hover:bg-vurgu-hover"
          >
            {copy.reload}
          </button>
          <Link to={paths.home} className="inline-flex min-h-11 items-center rounded-md px-3 font-semibold text-kiremit-700 underline underline-offset-4">
            {copy.backHome}
          </Link>
        </div>
      </div>
    </AppShell>
  )
}
