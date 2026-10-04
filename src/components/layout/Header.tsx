import { useId, useRef, useState, type KeyboardEvent } from 'react'
import { Link, NavLink, useLocation } from 'react-router'
import { useCart } from '../../cart/useCart'
import { site } from '../../content/site'
import { paths } from '../../routes/paths'

const navLinkClass = ({ isActive }: { isActive: boolean }) =>
  [
    'inline-flex min-h-11 items-center rounded-md px-3 font-semibold transition-colors',
    isActive ? 'text-kiremit-700 underline decoration-2 underline-offset-8' : 'text-antrasit-700 hover:text-kiremit-700',
  ].join(' ')

export function Header() {
  const { pathname } = useLocation()
  // Menü, açıldığı adrese bağlıdır; sayfa değişince kendiliğinden kapanır.
  const [menuOpenAt, setMenuOpenAt] = useState<string | null>(null)
  const menuOpen = menuOpenAt === pathname
  const menuId = useId()
  const menuButtonRef = useRef<HTMLButtonElement>(null)
  const { header, nav, brand } = site
  const cartCount = useCart().summary.itemCount

  const closeMenu = () => setMenuOpenAt(null)

  const handleMenuKeyDown = (event: KeyboardEvent) => {
    if (menuOpen && event.key === 'Escape') {
      closeMenu()
      menuButtonRef.current?.focus()
    }
  }

  return (
    <header className="sticky top-0 z-40 border-b border-krem-200 bg-krem/95 backdrop-blur" onKeyDown={handleMenuKeyDown}>
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-4 sm:px-6">
        <Link
          to={paths.home}
          aria-label={header.homeLinkLabel}
          className="inline-flex min-h-11 items-center gap-2 rounded-md font-display text-2xl font-semibold text-antrasit-900"
        >
          <svg aria-hidden="true" viewBox="0 0 32 32" className="size-8 shrink-0">
            <rect width="32" height="32" rx="8" className="fill-kiremit-600" />
            <path d="M9 12h14l-1.6 10.4A3 3 0 0 1 18.4 25h-4.8a3 3 0 0 1-3-2.6Z" className="fill-krem" />
            <path d="M8 9.5h16" className="stroke-krem" strokeWidth="2.4" strokeLinecap="round" />
          </svg>
          <span>{brand.name}</span>
        </Link>

        <nav aria-label={nav.label} className="hidden md:block">
          <ul className="flex items-center gap-2">
            {nav.items.map((item) => (
              <li key={item.id}>
                <NavLink to={item.to} end={item.to === paths.home} className={navLinkClass}>
                  {item.label}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-1">
          <Link
            to={paths.cart}
            aria-label={header.cartCountLabel(cartCount)}
            className="relative inline-flex min-h-11 min-w-11 items-center justify-center gap-2 rounded-md px-2 font-semibold text-antrasit-900 transition-colors hover:text-kiremit-700"
          >
            <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="size-6">
              <path d="M5 8h14l-1.2 11.1a2 2 0 0 1-2 1.9H8.2a2 2 0 0 1-2-1.9Z" />
              <path d="M9 10V7a3 3 0 0 1 6 0v3" />
            </svg>
            <span className="hidden sm:inline">{header.cartLabel}</span>
            {cartCount > 0 && (
              <span className="absolute -top-0.5 -right-0.5 grid min-w-5 place-items-center rounded-full bg-vurgu px-1 text-xs font-bold text-vurgu-metin sm:static">
                {cartCount}
              </span>
            )}
          </Link>

          <button
            ref={menuButtonRef}
            type="button"
            aria-expanded={menuOpen}
            aria-controls={menuId}
            onClick={() => setMenuOpenAt(menuOpen ? null : pathname)}
            className="inline-flex min-h-11 min-w-11 items-center justify-center rounded-md text-antrasit-900 md:hidden"
          >
            <span className="sr-only">{menuOpen ? header.menuCloseLabel : header.menuOpenLabel}</span>
            <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" className="size-6">
              {menuOpen ? <path d="M6 6l12 12M18 6L6 18" /> : <path d="M4 7h16M4 12h16M4 17h16" />}
            </svg>
          </button>
        </div>
      </div>

      <nav id={menuId} aria-label={nav.label} hidden={!menuOpen} className="border-t border-krem-200 md:hidden">
        <ul className="mx-auto flex max-w-6xl flex-col px-4 py-2">
          {nav.items.map((item) => (
            <li key={item.id}>
              <NavLink to={item.to} end={item.to === paths.home} onClick={closeMenu} className={navLinkClass}>
                {item.label}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  )
}
