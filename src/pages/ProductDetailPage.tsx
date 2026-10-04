import { useParams } from 'react-router'
import { PagePlaceholder } from '../components/PagePlaceholder'
import { products } from '../content/catalog'
import { site } from '../content/site'
import { findProductBySlug } from '../lib/catalog'
import { NotFoundPage } from './NotFoundPage'

export function ProductDetailPage() {
  const { slug = '' } = useParams()
  const product = findProductBySlug(products, slug)

  if (!product) return <NotFoundPage />

  return <PagePlaceholder title={product.name} description={site.pages.productDetail.placeholder} />
}
