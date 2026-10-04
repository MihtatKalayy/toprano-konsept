import type { ReactNode } from 'react'
import { shopConfig } from '../../config/shop'
import { site } from '../../content/site'
import { formatPrice } from '../../lib/money'

const copy = site.pages.home.values

const icon = (path: ReactNode) => (
  <svg aria-hidden="true" viewBox="0 0 32 32" className="size-9 shrink-0 text-kiremit-300" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    {path}
  </svg>
)

const items = [
  { id: 'handmade', ...copy.handmade, icon: icon(<path d="M9 14V8a2 2 0 0 1 4 0v5M13 12V6a2 2 0 0 1 4 0v7M17 12V8a2 2 0 0 1 4 0v8c0 5-3 9-8 9-3 0-5-2-7-5l-2-4a2 2 0 0 1 3-2l2 2" />) },
  { id: 'packaging', ...copy.packaging, icon: icon(<path d="M4 10l12-5 12 5v12l-12 5-12-5ZM4 10l12 5 12-5M16 15v12" />) },
  {
    id: 'shipping',
    title: copy.shipping.title,
    // Kargo kuralı sepetle aynı yapılandırmadan okunur.
    text: copy.shipping.text(formatPrice(shopConfig.freeShippingThresholdKurus), formatPrice(shopConfig.shippingFeeKurus)),
    icon: icon(<path d="M3 9h15v12H3ZM18 13h6l4 4v4h-10M8 25a2 2 0 1 0 0-4 2 2 0 0 0 0 4ZM23 25a2 2 0 1 0 0-4 2 2 0 0 0 0 4Z" />),
  },
]

export function ValuesStrip() {
  return (
    <section aria-labelledby="degerler" className="bg-antrasit-900 text-krem">
      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
        <h2 id="degerler" className="sr-only">
          {copy.heading}
        </h2>
        <ul className="grid gap-8 md:grid-cols-3">
          {items.map((item) => (
            <li key={item.id} className="flex gap-4">
              {item.icon}
              <div>
                <h3 className="text-xl font-semibold text-krem">{item.title}</h3>
                <p className="mt-1 text-krem-200">{item.text}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
