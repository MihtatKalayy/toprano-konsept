import type { Ref } from 'react'
import { Link } from 'react-router'
import { shopConfig } from '../../config/shop'
import { site } from '../../content/site'
import type { ResolvedLine } from '../../lib/cart'
import { formatPrice } from '../../lib/money'
import { productPath } from '../../routes/paths'
import { QuantityInput } from './QuantityInput'

interface CartLineItemProps {
  line: ResolvedLine
  nameLinkRef: Ref<HTMLAnchorElement>
  onQuantityChange: (quantity: number) => void
  onRemove: () => void
}

const copy = site.pages.cart

export function CartLineItem({ line, nameLinkRef, onQuantityChange, onRemove }: CartLineItemProps) {
  const { product, quantity, lineTotalKurus } = line
  const [image] = product.images

  return (
    <article className="grid grid-cols-[5rem_minmax(0,1fr)] gap-x-4 gap-y-3 rounded-lg bg-notr p-3 ring-1 ring-krem-200 sm:grid-cols-[6rem_minmax(0,1fr)] md:grid-cols-[6rem_minmax(0,1fr)_auto_7rem] md:items-center md:gap-x-6 md:p-4">
      <div className="row-span-2 aspect-square overflow-hidden rounded-md bg-krem-200 md:row-span-1">
        {image && (
          <img src={image.src} alt="" width={image.width} height={image.height} loading="lazy" decoding="async" className="size-full object-cover" />
        )}
      </div>

      <div className="min-w-0">
        <h3 className="text-lg leading-snug font-semibold">
          <Link ref={nameLinkRef} to={productPath(product.slug)} className="hover:text-kiremit-700 hover:underline">
            {product.name}
          </Link>
        </h3>
        <p className="mt-1 text-sm text-antrasit-700">
          {copy.unitPrice}: <span className="font-semibold text-antrasit-900">{formatPrice(product.priceKurus)}</span>
        </p>
      </div>

      <div className="col-start-2 flex flex-wrap items-center gap-3 md:col-start-auto">
        <QuantityInput
          value={quantity}
          min={shopConfig.minQuantity}
          max={shopConfig.maxQuantityPerProduct}
          label={copy.quantityLabel(product.name)}
          showLabel={false}
          onChange={onQuantityChange}
        />
        <button
          type="button"
          onClick={onRemove}
          aria-label={copy.removeLabel(product.name)}
          className="inline-flex min-h-11 items-center rounded-md px-2 font-semibold text-kiremit-700 underline underline-offset-4 hover:text-kiremit-800"
        >
          {copy.remove}
        </button>
      </div>

      <p className="col-span-2 flex items-baseline justify-between border-t border-krem-200 pt-3 md:col-span-1 md:block md:border-0 md:pt-0 md:text-right">
        <span className="text-sm text-antrasit-700 md:block">{copy.lineTotal}</span>
        <span className="text-lg font-semibold text-antrasit-900">{formatPrice(lineTotalKurus)}</span>
      </p>
    </article>
  )
}
