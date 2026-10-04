import { site } from '../../content/site'
import type { StockStatus } from '../../content/types'

const styles: Record<Exclude<StockStatus, 'in-stock'>, string> = {
  'low-stock': 'border border-kiremit-300 bg-kiremit-50 text-kiremit-800',
  'out-of-stock': 'bg-antrasit-900 text-krem',
}

// Yalnızca dikkat gerektiren durumlarda gösterilir; "stokta" için rozet yoktur.
export function StockBadge({ stock, className = '' }: { stock: StockStatus; className?: string }) {
  if (stock === 'in-stock') return null

  return (
    <span className={`inline-block rounded-full px-2.5 py-0.5 text-sm font-semibold ${styles[stock]} ${className}`}>
      {site.pages.products.stockLabels[stock]}
    </span>
  )
}
