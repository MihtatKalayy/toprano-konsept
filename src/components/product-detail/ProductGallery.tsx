import { useRef, useState, type KeyboardEvent } from 'react'
import { site } from '../../content/site'
import type { ProductImage } from '../../content/types'

interface ProductGalleryProps {
  images: ProductImage[]
  productName: string
}

const copy = site.pages.productDetail

export function ProductGallery({ images, productName }: ProductGalleryProps) {
  const [selected, setSelected] = useState(0)
  const thumbnailRefs = useRef<(HTMLButtonElement | null)[]>([])
  const image = images[selected]
  const total = images.length

  if (!image) return null

  // Küçük görseller arasında ok tuşları, Home ve End ile gezinme.
  const handleKeyDown = (event: KeyboardEvent<HTMLUListElement>) => {
    const moves: Record<string, number> = {
      ArrowRight: (selected + 1) % total,
      ArrowDown: (selected + 1) % total,
      ArrowLeft: (selected - 1 + total) % total,
      ArrowUp: (selected - 1 + total) % total,
      Home: 0,
      End: total - 1,
    }
    const next = moves[event.key]
    if (next === undefined) return
    event.preventDefault()
    setSelected(next)
    thumbnailRefs.current[next]?.focus()
  }

  return (
    <section aria-label={copy.galleryLabel(productName)}>
      <div className="aspect-square overflow-hidden rounded-lg bg-krem-200 ring-1 ring-krem-200">
        <img
          src={image.src}
          alt={image.alt}
          width={image.width}
          height={image.height}
          loading="eager"
          fetchPriority="high"
          decoding="async"
          className="size-full object-cover"
        />
      </div>

      {total > 1 && (
        <>
          <p className="sr-only" aria-live="polite">
            {copy.imageAnnouncement(selected + 1, total)}
          </p>
          <ul className="mt-3 flex gap-3" onKeyDown={handleKeyDown}>
            {images.map((thumbnail, index) => {
              const isSelected = index === selected
              return (
                <li key={thumbnail.src} className="w-20 sm:w-24">
                  <button
                    ref={(element) => {
                      thumbnailRefs.current[index] = element
                    }}
                    type="button"
                    aria-label={copy.thumbnailLabel(index + 1, total, thumbnail.alt)}
                    aria-current={isSelected ? 'true' : undefined}
                    tabIndex={isSelected ? 0 : -1}
                    onClick={() => setSelected(index)}
                    className={`block aspect-square w-full overflow-hidden rounded-md ring-offset-2 ring-offset-krem transition ${
                      isSelected ? 'ring-3 ring-vurgu' : 'opacity-80 ring-1 ring-krem-200 hover:opacity-100'
                    }`}
                  >
                    <img
                      src={thumbnail.src}
                      alt=""
                      width={thumbnail.width}
                      height={thumbnail.height}
                      loading="lazy"
                      decoding="async"
                      className="size-full object-cover"
                    />
                  </button>
                </li>
              )
            })}
          </ul>
        </>
      )}
    </section>
  )
}
