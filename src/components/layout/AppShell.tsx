import type { MouseEvent, ReactNode, Ref } from 'react'
import { site } from '../../content/site'
import { CartNotice } from '../cart/CartNotice'
import { Footer } from './Footer'
import { Header } from './Header'

export const mainId = 'icerik'

interface AppShellProps {
  mainRef: Ref<HTMLElement>
  children: ReactNode
  /** Ana içerik yüklenirken `aria-busy` */
  busy?: boolean
}

/** Tüm sayfalarda ortak iskelet: içeriğe geç bağlantısı, header, ana içerik ve footer. */
export function AppShell({ mainRef, children, busy = false }: AppShellProps) {
  // Adres çubuğuna # eklemeden odağı ana içeriğe taşır; böylece yönlendirme tetiklenmez.
  const skipToContent = (event: MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault()
    const main = document.getElementById(mainId)
    main?.focus()
    main?.scrollIntoView()
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
      <main id={mainId} ref={mainRef} tabIndex={-1} aria-busy={busy || undefined} className="flex-1 scroll-mt-16 focus:outline-none">
        <CartNotice />
        {children}
      </main>
      <Footer />
    </div>
  )
}
