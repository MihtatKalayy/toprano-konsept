import { useState, type FormEvent } from 'react'
import { Link } from 'react-router'
import { useCart, useCartActions } from '../../cart/useCart'
import { shopConfig } from '../../config/shop'
import { site } from '../../content/site'
import type { Product } from '../../content/types'
import { paths } from '../../routes/paths'
import { QuantityInput } from '../cart/QuantityInput'

const copy = site.pages.productDetail
const { minQuantity, maxQuantityPerProduct } = shopConfig

interface Feedback {
  /** Aynı mesaj art arda gelse de yeniden duyurulsun diye her eklemede artar. */
  id: number
  message: string
  /** Ekleme gerçekleştiyse "Sepete git" bağlantısı gösterilir. */
  added: boolean
}

export function AddToCart({ product }: { product: Product }) {
  const { quantityOf } = useCart()
  const { add } = useCartActions()
  const [quantity, setQuantity] = useState<number>(minQuantity)
  const [feedback, setFeedback] = useState<Feedback | null>(null)
  const inCart = quantityOf(product.id)

  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const result = add(product.id, quantity)
    const id = (feedback?.id ?? 0) + 1
    switch (result.status) {
      case 'added':
        setFeedback({ id, message: copy.addedToCart(product.name, result.addedQuantity), added: true })
        break
      case 'limited':
        setFeedback({ id, message: copy.addLimited(product.name, result.addedQuantity, maxQuantityPerProduct), added: true })
        break
      case 'at-limit':
        setFeedback({ id, message: copy.atLimit(maxQuantityPerProduct), added: false })
        break
      default:
        // Detay sayfası yalnızca bilinen ve stokta olan ürün için bu formu gösterir; buraya düşmek bir hatadır.
        throw new Error(`Sepete ekleme beklenmedik biçimde başarısız oldu: ${result.status}`)
    }
  }

  return (
    <form onSubmit={submit} className="space-y-4">
      <div className="flex flex-wrap items-end gap-3">
        <QuantityInput value={quantity} min={minQuantity} max={maxQuantityPerProduct} label={site.quantity.label} onChange={setQuantity} />
        <button
          type="submit"
          className="inline-flex min-h-11 flex-1 items-center justify-center rounded-md bg-vurgu px-6 font-semibold text-vurgu-metin transition-colors hover:bg-vurgu-hover sm:flex-none"
        >
          {copy.addToCart}
        </button>
      </div>

      {inCart > 0 && <p className="text-sm text-antrasit-700">{copy.inCart(inCart)}</p>}

      {/* Canlı bölge her zaman sayfada durur; içerik değişince ekran okuyucu duyurur. */}
      <div role="status">
        {feedback && (
          <div key={feedback.id} className={`rounded-lg px-4 py-3 ${feedback.added ? 'bg-kiremit-50 text-kiremit-800' : 'bg-krem-200 text-antrasit-900'}`}>
            <p className="font-semibold">{feedback.message}</p>
            {feedback.added && (
              <Link to={paths.cart} className="mt-1 inline-flex min-h-11 items-center font-semibold text-kiremit-700 underline underline-offset-4 hover:text-kiremit-800">
                {copy.goToCart}
              </Link>
            )}
          </div>
        )}
      </div>
    </form>
  )
}
