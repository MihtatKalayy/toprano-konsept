export const paths = {
  home: '/',
  products: '/urunler',
  productDetail: '/urunler/:slug',
  cart: '/sepet',
  checkout: '/siparis',
} as const

export function productPath(slug: string): string {
  return `${paths.products}/${encodeURIComponent(slug)}`
}
