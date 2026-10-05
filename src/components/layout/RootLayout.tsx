import { useEffect, useRef } from 'react'
import { Outlet, ScrollRestoration, useLocation, useNavigation } from 'react-router'
import { site } from '../../content/site'
import { AppShell } from './AppShell'

export function RootLayout() {
  const mainRef = useRef<HTMLElement>(null)
  const announcerRef = useRef<HTMLParagraphElement>(null)
  const { pathname } = useLocation()
  const previousPath = useRef(pathname)
  const loading = useNavigation().state === 'loading'

  // Sayfa değişince odak ana içeriğe taşınır ve yeni sayfanın başlığı ekran okuyucuya duyurulur.
  // Sayfa odağı kendisi yönettiyse (örn. sipariş onayı başlığı) dokunulmaz. Aynı sayfada filtre değişimi
  // yalnızca sorgu parametresini değiştirdiği için odak yerinde kalır.
  useEffect(() => {
    if (previousPath.current === pathname) return
    previousPath.current = pathname
    const main = mainRef.current
    if (!main) return
    const active = document.activeElement
    if (!active || active === document.body || !main.contains(active)) main.focus({ preventScroll: true })
    if (announcerRef.current) announcerRef.current.textContent = document.title
  }, [pathname])

  return (
    <>
      {/* Sayfa parçası yüklenirken üstte ince bir çubuk; kısa geçişlerde görünmesin diye gecikmeli belirir. */}
      {loading && <div aria-hidden="true" className="sayfa-yukleniyor fixed inset-x-0 top-0 z-50 h-1 bg-vurgu" />}
      <p role="status" className="sr-only">
        {loading ? site.a11y.pageLoading : ''}
      </p>
      <p ref={announcerRef} aria-live="polite" aria-atomic="true" className="sr-only" />
      <AppShell mainRef={mainRef} busy={loading}>
        <Outlet />
      </AppShell>
      <ScrollRestoration />
    </>
  )
}
