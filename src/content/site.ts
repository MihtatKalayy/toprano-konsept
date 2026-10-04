import { paths } from '../routes/paths'
import type { SiteContent } from './types'

// Sitedeki tüm metinler buradan okunur. Marka, adres ve iletişim bilgileri kurgusaldır.
const brandName = 'Toprana'

export const site: SiteContent = {
  brand: {
    name: brandName,
    tagline: 'Topraktan, elden, sofraya.',
    description:
      `${brandName}, el yapımı seramik kupa, tabak, vazo ve dekor objeleri üreten kurgusal bir atölyedir.`,
  },
  conceptNotice: 'Bu site bir konsept çalışmadır; gerçek satış yapılmaz.',
  nav: {
    label: 'Ana menü',
    items: [
      { id: 'home', label: 'Ana sayfa', to: paths.home },
      { id: 'products', label: 'Ürünler', to: paths.products },
    ],
  },
  header: {
    homeLinkLabel: `${brandName} ana sayfa`,
    menuOpenLabel: 'Menüyü aç',
    menuCloseLabel: 'Menüyü kapat',
    cartLabel: 'Sepet',
    cartCountLabel: (count) => (count === 0 ? 'Sepet, boş' : `Sepet, ${count} ürün`),
  },
  footer: {
    linksHeading: 'Bağlantılar',
    links: [
      { id: 'home', label: 'Ana sayfa', to: paths.home },
      { id: 'products', label: 'Ürünler', to: paths.products },
      { id: 'cart', label: 'Sepet', to: paths.cart },
    ],
    contactHeading: 'İletişim',
    contact: {
      email: 'merhaba@toprana.example',
      phone: '+90 000 000 00 00',
      address: 'Kil Sokağı No: 0, Kurgu Mahallesi',
    },
    contactNote: 'İletişim bilgileri yer tutucudur.',
    copyright: (year) => `© ${year} ${brandName} — konsept çalışma`,
  },
  a11y: {
    skipToContent: 'İçeriğe geç',
  },
  pageTitle: (pageTitle) => `${pageTitle} | ${brandName}`,
  pages: {
    home: {
      title: 'Ana sayfa',
      placeholder: 'Ana sayfa içeriği sonraki adımlarda eklenecek.',
    },
    products: {
      title: 'Ürünler',
      placeholder: 'Ürün listesi, filtreler ve arama sonraki adımlarda eklenecek.',
    },
    productDetail: {
      placeholder: 'Ürün detayı sonraki adımda eklenecek.',
    },
    cart: {
      title: 'Sepet',
      placeholder: 'Sepet sonraki adımlarda eklenecek.',
    },
    checkout: {
      title: 'Sipariş',
      placeholder: 'Sipariş adımı sonraki adımlarda eklenecek.',
    },
    notFound: {
      title: 'Sayfa bulunamadı',
      placeholder: 'Aradığınız sayfa taşınmış ya da hiç var olmamış olabilir.',
      backHome: 'Ana sayfaya dön',
    },
  },
}
