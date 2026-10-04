import { useRef, type MouseEvent } from 'react'
import { Outlet, ScrollRestoration } from 'react-router'
import { site } from '../../content/site'
import { Footer } from './Footer'
import { Header } from './Header'

const mainId = 'icerik'

export function RootLayout() {
  const mainRef = useRef<HTMLElement>(null)

  // Adres çubuğuna # eklemeden odağı ana içeriğe taşır; böylece yönlendirme tetiklenmez.
  const skipToContent = (event: MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault()
    mainRef.current?.focus()
    mainRef.current?.scrollIntoView()
  }

  return (
    <div className="flex min-h-dvh flex-col">
      <a
        href={`#${mainId}`}
        onClick={skipToContent}
        className="sr-only z-50 rounded-md bg-vurgu px-4 py-3 font-semibold text-vurgu-metin focus:not-sr-only focus:fixed focus:top-3 focus:left-3"
      >
        {site.a11y.skipToContent}
      </a>
      <Header />
      <main id={mainId} ref={mainRef} tabIndex={-1} className="flex-1 scroll-mt-16 focus:outline-none">
        <Outlet />
      </main>
      <Footer />
      <ScrollRestoration />
    </div>
  )
}
