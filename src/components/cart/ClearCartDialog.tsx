import { useRef } from 'react'
import { site } from '../../content/site'

const copy = site.pages.cart

/** "Sepeti boşalt" butonu ve tarayıcının yerleşik modal penceresiyle onay. */
export function ClearCartDialog({ onConfirm }: { onConfirm: () => void }) {
  const dialogRef = useRef<HTMLDialogElement>(null)

  const confirm = () => {
    dialogRef.current?.close()
    onConfirm()
  }

  return (
    <>
      <button
        type="button"
        onClick={() => dialogRef.current?.showModal()}
        className="inline-flex min-h-11 items-center rounded-md px-2 font-semibold text-antrasit-700 underline underline-offset-4 hover:text-antrasit-900"
      >
        {copy.clearCart}
      </button>
      <dialog
        ref={dialogRef}
        aria-labelledby="sepeti-bosalt-baslik"
        aria-describedby="sepeti-bosalt-aciklama"
        className="m-auto w-[min(28rem,calc(100%-2rem))] rounded-lg bg-notr p-6 text-antrasit-900 shadow-xl backdrop:bg-antrasit-900/60"
      >
        <h2 id="sepeti-bosalt-baslik" className="text-xl font-semibold">
          {copy.clearConfirmTitle}
        </h2>
        <p id="sepeti-bosalt-aciklama" className="mt-2 text-antrasit-700">
          {copy.clearConfirmText}
        </p>
        <div className="mt-6 flex flex-wrap justify-end gap-3">
          <button
            type="button"
            autoFocus
            onClick={() => dialogRef.current?.close()}
            className="min-h-11 rounded-md border border-antrasit-600 px-5 font-semibold hover:bg-krem-200"
          >
            {copy.clearCancel}
          </button>
          <button
            type="button"
            onClick={confirm}
            className="min-h-11 rounded-md bg-vurgu px-5 font-semibold text-vurgu-metin hover:bg-vurgu-hover"
          >
            {copy.clearConfirm}
          </button>
        </div>
      </dialog>
    </>
  )
}
