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
  defaultMetaDescription: `${brandName}, el yapımı seramikler satan kurgusal bir atölyenin online mağazası. Bu site bir konsept çalışmadır; gerçek satış yapılmaz.`,
  pages: {
    home: {
      title: 'Ana sayfa',
      placeholder: 'Ana sayfa içeriği sonraki adımlarda eklenecek.',
    },
    products: {
      title: 'Ürünler',
      intro: 'Atölyede tek tek elde şekillendirilen kupa, tabak, vazo ve dekor objeleri.',
      filtersHeading: 'Filtreler',
      filtersToggle: (activeCount) => (activeCount > 0 ? `Filtreler (${activeCount})` : 'Filtreler'),
      categoryLegend: 'Kategori',
      priceLegend: 'Fiyat aralığı (₺)',
      minPriceLabel: 'En düşük',
      maxPriceLabel: 'En yüksek',
      applyPrice: 'Fiyatı uygula',
      searchLabel: 'Ürünlerde ara',
      searchPlaceholder: 'Örn. kase, vazo',
      sortLabel: 'Sırala',
      sortOptions: {
        onerilen: 'Önerilen',
        'fiyat-artan': 'Fiyat: düşükten yükseğe',
        'fiyat-azalan': 'Fiyat: yüksekten düşüğe',
        'en-yeni': 'En yeni',
      },
      resultCount: (count) => (count === 0 ? 'Ürün bulunamadı' : `${count} ürün listeleniyor`),
      activeFiltersLabel: 'Etkin filtreler',
      minPriceChip: (price) => `En az ${price}`,
      maxPriceChip: (price) => `En çok ${price}`,
      searchChip: (search) => `Arama: “${search}”`,
      removeFilter: (label) => `${label} filtresini kaldır`,
      clearFilters: 'Filtreleri temizle',
      emptyTitle: 'Bu filtrelerle eşleşen ürün yok',
      emptyText: 'Farklı bir kelimeyle aramayı ya da fiyat aralığını genişletmeyi deneyin. Filtreleri temizleyerek tüm ürünlere dönebilirsiniz.',
      stockLabels: {
        'in-stock': 'Stokta',
        'low-stock': 'Az kaldı',
        'out-of-stock': 'Tükendi',
      },
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
