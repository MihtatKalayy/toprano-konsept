import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router'
import { productLookup } from '../cart/cartContext'
import { useCart, useCartActions } from '../cart/useCart'
import { CartLineItem } from '../components/cart/CartLineItem'
import { CartSummary } from '../components/cart/CartSummary'
import { ClearCartDialog } from '../components/cart/ClearCartDialog'
import { shopConfig } from '../config/shop'
import { site } from '../content/site'
import { usePageMeta } from '../hooks/usePageMeta'
import { summarizeCart, type Cart } from '../lib/cart'
import { formatPrice } from '../lib/money'
import { paths } from '../routes/paths'

const copy = site.pages.cart

interface Announcement {
  id: number
  text: string
}

function totalsText(cart: Cart): string {
  const summary = summarizeCart(cart, productLookup, shopConfig)
  return copy.announceTotals(
    formatPrice(summary.subtotalKurus),
    summary.shippingKurus === 0 ? copy.freeShipping : formatPrice(summary.shippingKurus),
    formatPrice(summary.totalKurus),
  )
}

export function CartPage() {
  usePageMeta(copy.title)
  const { lines, summary } = useCart()
  const actions = useCartActions()
  const [announcement, setAnnouncement] = useState<Announcement | null>(null)
  const headingRef = useRef<HTMLHeadingElement>(null)
  const nameLinks = useRef(new Map<string, HTMLAnchorElement>())
  // Çıkarma ya da boşaltma sonrası odaklanacak öğe; çizim tamamlanınca uygulanır.
  const pendingFocus = useRef<string | 'heading' | null>(null)

  useEffect(() => {
    const target = pendingFocus.current
    if (target === null) return
    pendingFocus.current = null
    const element = target === 'heading' ? headingRef.current : nameLinks.current.get(target)
    element?.focus()
  })

  const announce = (text: string) => setAnnouncement((previous) => ({ id: (previous?.id ?? 0) + 1, text }))

  const changeQuantity = (productId: string, quantity: number) => {
    announce(totalsText(actions.setQuantity(productId, quantity)))
  }

  const remove = (productId: string, productName: string) => {
    const index = lines.findIndex((line) => line.product.id === productId)
    // Odak, çıkarılan satırdan sonraki satıra; son satırsa bir öncekine; sepet boşalırsa başlığa gider.
    const neighbour = lines[index + 1] ?? lines[index - 1]
    pendingFocus.current = neighbour ? neighbour.product.id : 'heading'
    const next = actions.remove(productId)
    announce(next.length > 0 ? `${copy.announceRemoved(productName)} ${totalsText(next)}` : copy.announceRemoved(productName))
  }

  const clear = () => {
    pendingFocus.current = 'heading'
    actions.clear()
    announce(copy.announceCleared)
  }

  return (
    <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 sm:py-12">
      <h1 ref={headingRef} tabIndex={-1} className="text-3xl font-semibold focus:outline-none sm:text-4xl">
        {copy.title}
      </h1>

      <p role="status" className="sr-only">
        {announcement && <span key={announcement.id}>{announcement.text}</span>}
      </p>

      {lines.length === 0 ? (
        <div className="mt-8 rounded-lg border border-dashed border-antrasit-600 bg-notr px-6 py-12 text-center">
          <h2 className="text-2xl font-semibold">{copy.emptyTitle}</h2>
          <p className="mx-auto mt-2 max-w-prose text-antrasit-700">{copy.emptyText}</p>
          <Link
            to={paths.products}
            className="mt-6 inline-flex min-h-11 items-center rounded-md bg-vurgu px-5 font-semibold text-vurgu-metin transition-colors hover:bg-vurgu-hover"
          >
            {copy.browseProducts}
          </Link>
        </div>
      ) : (
        <div className="mt-8 grid items-start gap-8 lg:grid-cols-[minmax(0,1fr)_22rem]">
          <section aria-labelledby="sepetteki-urunler">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <h2 id="sepetteki-urunler" className="text-xl font-semibold">
                {copy.itemsHeading} <span className="font-sans text-base font-normal text-antrasit-700">({copy.itemCount(summary.itemCount)})</span>
              </h2>
              <ClearCartDialog onConfirm={clear} />
            </div>
            <ul className="mt-4 space-y-3">
              {lines.map((line) => (
                <li key={line.product.id}>
                  <CartLineItem
                    line={line}
                    nameLinkRef={(element) => {
                      if (element) nameLinks.current.set(line.product.id, element)
                      else nameLinks.current.delete(line.product.id)
                    }}
                    onQuantityChange={(quantity) => changeQuantity(line.product.id, quantity)}
                    onRemove={() => remove(line.product.id, line.product.name)}
                  />
                </li>
              ))}
            </ul>
          </section>
          <CartSummary summary={summary} />
        </div>
      )}
    </div>
  )
}
