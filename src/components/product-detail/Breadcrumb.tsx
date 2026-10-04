import { Link } from 'react-router'
import { site } from '../../content/site'

export interface Crumb {
  label: string
  /** Son öğenin (geçerli sayfa) bağlantısı yoktur. */
  to?: string
}

export function Breadcrumb({ items }: { items: Crumb[] }) {
  return (
    <nav aria-label={site.pages.productDetail.breadcrumbLabel}>
      <ol className="flex flex-wrap items-center gap-x-2 gap-y-1 text-sm">
        {items.map((item, index) => (
          <li key={`${index}-${item.label}`} className="flex min-w-0 items-center gap-2">
            {index > 0 && (
              <svg aria-hidden="true" viewBox="0 0 16 16" className="size-3 shrink-0 text-antrasit-600" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M6 3l5 5-5 5" />
              </svg>
            )}
            {item.to ? (
              <Link to={item.to} className="inline-flex min-h-11 min-w-11 items-center text-kiremit-700 underline underline-offset-4 hover:text-kiremit-800">
                {item.label}
              </Link>
            ) : (
              <span aria-current="page" className="min-w-0 font-semibold break-words text-antrasit-700">
                {item.label}
              </span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  )
}
