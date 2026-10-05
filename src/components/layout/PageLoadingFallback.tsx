import { useRef } from 'react'
import { site } from '../../content/site'
import { AppShell } from './AppShell'

/** İlk açılışta sayfa parçası gelene kadar gösterilir. Yer tutucu ekran yüksekliğinde olduğundan footer kaymaz. */
export function PageLoadingFallback() {
  const mainRef = useRef<HTMLElement>(null)
  return (
    <AppShell mainRef={mainRef} busy>
      <p role="status" className="min-h-dvh px-4 py-12 text-center text-antrasit-700">
        <span className="sr-only">{site.a11y.pageLoading}</span>
      </p>
    </AppShell>
  )
}
