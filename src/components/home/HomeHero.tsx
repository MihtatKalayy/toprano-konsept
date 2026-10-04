import { Link } from 'react-router'
import { site } from '../../content/site'
import { paths } from '../../routes/paths'

const { hero } = site.pages.home

export function HomeHero() {
  return (
    <section aria-labelledby="ana-baslik" className="bg-krem-200">
      <div className="mx-auto grid max-w-6xl items-center gap-8 px-4 py-10 sm:px-6 md:grid-cols-2 md:py-16 lg:gap-12">
        <div>
          <h1 id="ana-baslik" className="text-4xl leading-tight font-semibold sm:text-5xl">
            {hero.heading}
          </h1>
          <p className="mt-5 max-w-prose text-lg text-antrasit-700">{hero.text}</p>
          <Link
            to={paths.products}
            className="mt-8 inline-flex min-h-12 items-center rounded-md bg-vurgu px-6 text-lg font-semibold text-vurgu-metin transition-colors hover:bg-vurgu-hover"
          >
            {hero.cta}
          </Link>
        </div>
        <div className="aspect-[4/3] overflow-hidden rounded-lg">
          <img
            src={hero.image.src}
            alt={hero.image.alt}
            width={hero.image.width}
            height={hero.image.height}
            loading="eager"
            fetchPriority="high"
            decoding="async"
            className="size-full object-cover"
          />
        </div>
      </div>
    </section>
  )
}
