import { useParams } from 'react-router'
import { ProductDetail } from '../components/product-detail/ProductDetail'
import { products } from '../content/catalog'
import { findProductBySlug } from '../lib/catalog'
import { NotFoundPage } from './NotFoundPage'

export function ProductDetailPage() {
  const { slug = '' } = useParams()
  const product = findProductBySlug(products, slug)

  if (!product) return <NotFoundPage />

  // Ürün değişince galeri ve diğer yerel durumlar sıfırlansın diye anahtar ürün id'sidir.
  return <ProductDetail key={product.id} product={product} />
}
