import { CategoryGrid } from '../components/home/CategoryGrid'
import { ClosingCta } from '../components/home/ClosingCta'
import { FeaturedProducts } from '../components/home/FeaturedProducts'
import { HomeHero } from '../components/home/HomeHero'
import { ValuesStrip } from '../components/home/ValuesStrip'
import { WorkshopSection } from '../components/home/WorkshopSection'
import { site } from '../content/site'
import { usePageMeta } from '../hooks/usePageMeta'

const { title, metaDescription } = site.pages.home

export function HomePage() {
  usePageMeta(title, metaDescription)

  return (
    <>
      <HomeHero />
      <CategoryGrid />
      <FeaturedProducts />
      <WorkshopSection />
      <ValuesStrip />
      <ClosingCta />
    </>
  )
}
