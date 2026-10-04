import type { SortOption } from '../lib/catalog'

export type NavItemId = 'home' | 'products'

export interface NavItem {
  id: NavItemId
  label: string
  to: string
}

export interface FooterLink {
  id: string
  label: string
  to: string
}

export interface ContactInfo {
  email: string
  phone: string
  address: string
}

export interface PageCopy {
  title: string
  placeholder: string
}

export interface ProductsPageCopy {
  title: string
  intro: string
  filtersHeading: string
  filtersToggle: (activeCount: number) => string
  categoryLegend: string
  priceLegend: string
  minPriceLabel: string
  maxPriceLabel: string
  applyPrice: string
  searchLabel: string
  searchPlaceholder: string
  sortLabel: string
  sortOptions: Record<SortOption, string>
  resultCount: (count: number) => string
  activeFiltersLabel: string
  minPriceChip: (price: string) => string
  maxPriceChip: (price: string) => string
  searchChip: (search: string) => string
  removeFilter: (label: string) => string
  clearFilters: string
  emptyTitle: string
  emptyText: string
  stockLabels: Record<StockStatus, string>
}

export interface ProductDetailPageCopy {
  metaDescription: (name: string, shortDescription: string) => string
  breadcrumbLabel: string
  homeCrumb: string
  productsCrumb: string
  galleryLabel: (productName: string) => string
  thumbnailLabel: (index: number, total: number, alt: string) => string
  imageAnnouncement: (index: number, total: number) => string
  purchaseHeading: string
  addToCart: string
  addedToCart: (productName: string, quantity: number) => string
  addLimited: (productName: string, added: number, max: number) => string
  atLimit: (max: number) => string
  inCart: (quantity: number) => string
  goToCart: string
  outOfStockTitle: string
  outOfStockText: string
  detailsHeading: string
  specsHeading: string
  specLabels: Record<keyof ProductSpecs, string>
  handmadeNote: string
  relatedHeading: string
}

export interface SiteContent {
  brand: {
    name: string
    tagline: string
    description: string
  }
  conceptNotice: string
  nav: {
    label: string
    items: NavItem[]
  }
  header: {
    homeLinkLabel: string
    menuOpenLabel: string
    menuCloseLabel: string
    cartLabel: string
    cartCountLabel: (count: number) => string
  }
  footer: {
    linksHeading: string
    links: FooterLink[]
    contactHeading: string
    contact: ContactInfo
    contactNote: string
    copyright: (year: number) => string
  }
  a11y: {
    skipToContent: string
  }
  quantity: {
    label: string
    decrease: string
    increase: string
    range: (min: number, max: number) => string
  }
  cartNotice: {
    message: string
    dismiss: string
  }
  pageTitle: (pageTitle: string) => string
  /** index.html'deki açıklama ile aynı; ürün dışı sayfalarda kullanılır. */
  defaultMetaDescription: string
  pages: {
    home: PageCopy
    products: ProductsPageCopy
    productDetail: ProductDetailPageCopy
    cart: PageCopy
    checkout: PageCopy
    notFound: PageCopy & {
      backHome: string
    }
  }
}

export type CategoryId = 'cat-kupa-fincan' | 'cat-tabak-kase' | 'cat-vazo' | 'cat-dekor'

export interface Category {
  id: CategoryId
  slug: string
  name: string
}

export type StockStatus = 'in-stock' | 'low-stock' | 'out-of-stock'

export interface ProductImage {
  src: string
  alt: string
  width: number
  height: number
}

export interface ProductSpecs {
  /** Ölçü, örn. "Ø 9 cm × 10 cm" */
  dimensions: string
  /** Yalnızca içine bir şey konan ürünlerde, örn. "350 ml" */
  capacity?: string
  /** Örn. "420 g" */
  weight: string
  care: string
}

export interface Product {
  id: string
  slug: string
  name: string
  categoryId: CategoryId
  /** Kuruş cinsinden tam sayı */
  priceKurus: number
  shortDescription: string
  description: string
  specs: ProductSpecs
  stock: StockStatus
  images: ProductImage[]
  featured: boolean
  /** ISO tarih, YYYY-AA-GG */
  addedAt: string
}
