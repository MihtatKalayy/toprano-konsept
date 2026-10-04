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
  pageTitle: (pageTitle: string) => string
  pages: {
    home: PageCopy
    products: PageCopy
    productDetail: PageCopy & {
      slugLabel: string
    }
    cart: PageCopy
    checkout: PageCopy
    notFound: PageCopy & {
      backHome: string
    }
  }
}
