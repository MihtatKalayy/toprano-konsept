export const paths = {
  home: '/',
  products: '/urunler',
  productDetail: '/urunler/:slug',
  cart: '/sepet',
  checkout: '/siparis',
  checkoutConfirmation: '/siparis/onay',
} as const

export function productPath(slug: string): string {
  return `${paths.products}/${encodeURIComponent(slug)}`
}
