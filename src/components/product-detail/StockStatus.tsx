import { site } from '../../content/site'
import type { StockStatus as Stock } from '../../content/types'

// Renk tek başına bilgi taşımaz: her durumda metin ve ayrı bir simge vardır.
const styles: Record<Stock, { className: string; icon: string }> = {
  'in-stock': { className: 'text-antrasit-900', icon: 'M4 8.5l2.5 2.5L12 5.5' },
  'low-stock': { className: 'text-kiremit-800', icon: 'M8 4.5v4M8 11.2v.3' },
  'out-of-stock': { className: 'text-antrasit-900', icon: 'M5 5l6 6M11 5l-6 6' },
}

const iconBackground: Record<Stock, string> = {
  'in-stock': 'fill-krem-200',
  'low-stock': 'fill-kiremit-100',
  'out-of-stock': 'fill-krem-200',
}

export function StockStatus({ stock }: { stock: Stock }) {
  const { className, icon } = styles[stock]

  return (
    <p className={`inline-flex items-center gap-2 font-semibold ${className}`}>
      <svg aria-hidden="true" viewBox="0 0 16 16" className="size-5 shrink-0">
        <circle cx="8" cy="8" r="8" className={iconBackground[stock]} />
        <path d={icon} fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
      {site.pages.products.stockLabels[stock]}
    </p>
  )
}
