import { useCart, useCartActions } from '../../cart/useCart'
import { site } from '../../content/site'

/** Kayıtlı sepet okunurken geçersiz kayıtlar ayıklandıysa kısa bir bilgi gösterir. */
export function CartNotice() {
  const { issues } = useCart()
  const { dismissIssues } = useCartActions()

  return (
    <div role="status">
      {issues.length > 0 && (
        <div className="border-b border-kiremit-300 bg-kiremit-50 text-kiremit-800">
          <div className="mx-auto flex max-w-6xl items-start justify-between gap-4 px-4 py-2 sm:px-6">
            <p className="py-2.5 font-semibold">{site.cartNotice.message}</p>
            <button
              type="button"
              onClick={dismissIssues}
              aria-label={site.cartNotice.dismiss}
              className="grid size-11 shrink-0 place-items-center rounded-md hover:bg-kiremit-100"
            >
              <svg aria-hidden="true" viewBox="0 0 16 16" className="size-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                <path d="M4 4l8 8M12 4l-8 8" />
              </svg>
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
