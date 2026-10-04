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
  quantity: {
    label: 'Adet',
    decrease: 'Adedi azalt',
    increase: 'Adedi artır',
    range: (min, max) => `${min} ile ${max} arasında`,
  },
  cartNotice: {
    message: 'Kayıtlı sepetinizdeki bazı ürünler artık mevcut olmadığı ya da geçersiz olduğu için sepetiniz güncellendi.',
    dismiss: 'Bilgiyi kapat',
  },
  pageTitle: (pageTitle) => `${pageTitle} | ${brandName}`,
  pages: {
    home: {
      title: 'El yapımı seramik atölyesi',
      metaDescription: `${brandName}: elde şekillendirilen kupa, tabak, vazo ve dekor objeleri sunan kurgusal bir seramik atölyesinin vitrini. Bu site bir konsept çalışmadır; gerçek satış yapılmaz.`,
      hero: {
        heading: 'Topraktan elde şekillenen, her gün kullanılacak seramikler',
        text: 'Her parça çarkta tek tek şekillenir, elle sırlanır ve fırında pişer. Sofranıza ve evinize sıcak, sade ve dayanıklı objeler.',
        cta: 'Ürünleri keşfet',
        image: {
          src: '/images/ana-sayfa/atolye-hero.svg',
          alt: 'Krem bir zemin üzerinde kiremit sırlı kupa, antrasit kase, krem şeritli büyük kiremit vazo ve tek dallı küçük krem vazo',
          width: 1200,
          height: 900,
        },
      },
      categories: {
        heading: 'Kategoriler',
        intro: 'Sabah kahvesinden duvardaki son dokunuşa kadar.',
        descriptions: {
          'cat-kupa-fincan': 'Günlük kupalar, espresso fincanları ve kulpsuz çay kaseleri.',
          'cat-tabak-kase': 'Paylaşmak için servis tabakları, derin kaseler ve tatlı tabakları.',
          'cat-vazo': 'Tek bir dal için küçük vazolardan gövdeli büyük formlara.',
          'cat-dekor': 'Mumluklar, duvar tabakları ve küçük takı tabakları.',
        },
        productCount: (count) => `${count} ürün`,
      },
      featured: {
        heading: 'Öne çıkan ürünler',
        intro: 'Atölyenin her kategoriden seçtiği parçalar.',
        viewAll: 'Tüm ürünleri gör',
      },
      workshop: {
        heading: 'Atölyeden',
        story: [
          `${brandName}, bir çömlek çarkı ve birkaç torba kille başlayan küçük, kurgusal bir atölye. Amaç hep aynı: elde tutulduğunda iyi hissettiren, her gün gönül rahatlığıyla kullanılacak parçalar yapmak.`,
          'Seri üretim yerine küçük partiler halinde çalışılır. Bu yüzden her parçanın sır akışı ve dokusu birbirinden biraz farklıdır.',
        ],
        stepsHeading: 'Bir parçanın yolculuğu',
        steps: [
          {
            id: 'shaping',
            title: 'Şekillendirme',
            text: 'Kil yoğrulur ve çarkta elle şekillendirilir. Kurumaya bırakılan parça, ilk pişirimden önce düzeltilip pürüzleri alınır.',
            image: { src: '/images/ana-sayfa/surec-sekillendirme.svg', alt: '', width: 600, height: 450 },
          },
          {
            id: 'glazing',
            title: 'Sırlama',
            text: 'Her parça sır kabına elle daldırılır. Sırın nerede biteceğine göz ve el karar verir; iki parça hiçbir zaman aynı olmaz.',
            image: { src: '/images/ana-sayfa/surec-sirlama.svg', alt: '', width: 600, height: 450 },
          },
          {
            id: 'firing',
            title: 'Fırınlama',
            text: 'Sırlanan parçalar yüksek ısıda ikinci kez pişirilir. Sır camlaşır, parça günlük kullanıma dayanıklı hale gelir.',
            image: { src: '/images/ana-sayfa/surec-firinlama.svg', alt: '', width: 600, height: 450 },
          },
        ],
      },
      values: {
        heading: `Neden ${brandName}`,
        handmade: {
          title: 'El yapımı üretim',
          text: 'Her parça tek tek elde şekillendirilir ve sırlanır.',
        },
        packaging: {
          title: 'Özenli paketleme',
          text: 'Kırılmaya karşı geri dönüştürülmüş kâğıtla katman katman sarılır.',
        },
        shipping: {
          title: 'Kargo',
          text: (threshold, fee) => `${threshold} ve üzeri siparişlerde ücretsiz; altında ${fee}.`,
        },
      },
      closing: {
        heading: 'Sofranıza bir parça toprak',
        text: 'Kupalardan vazolara, atölyenin tüm parçalarına göz atın.',
        cta: 'Ürünleri keşfet',
      },
    },
    products: {
      title: 'Ürünler',
      metaDescription: `${brandName} el yapımı seramikleri: kupa ve fincanlar, tabak ve kaseler, vazolar ve dekor objeleri. Kategori, fiyat ve aramayla filtreleyin. Konsept çalışmadır; gerçek satış yapılmaz.`,
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
      metaDescription: (name, shortDescription) =>
        `${name}: ${shortDescription} ${brandName} konsept çalışmasıdır; gerçek satış yapılmaz.`,
      breadcrumbLabel: 'Yol göstergesi',
      homeCrumb: 'Ana sayfa',
      productsCrumb: 'Ürünler',
      galleryLabel: (productName) => `${productName} görselleri`,
      thumbnailLabel: (index, total, alt) => `Görsel ${index} / ${total}: ${alt}`,
      imageAnnouncement: (index, total) => `Görsel ${index} / ${total} gösteriliyor`,
      purchaseHeading: 'Satın alma',
      addToCart: 'Sepete ekle',
      addedToCart: (productName, quantity) => `${productName} sepete eklendi (${quantity} adet).`,
      addLimited: (productName, added, max) =>
        `Sepette bu üründen en fazla ${max} adet olabilir. ${productName} için yalnızca ${added} adet eklendi.`,
      atLimit: (max) => `Sepetinizde bu üründen zaten ${max} adet var; daha fazla eklenemez.`,
      inCart: (quantity) => `Sepetinizde bu üründen ${quantity} adet var.`,
      goToCart: 'Sepete git',
      outOfStockTitle: 'Tükendi',
      outOfStockText: 'Bu ürün şu anda stokta yok.',
      detailsHeading: 'Ürün ayrıntıları',
      specsHeading: 'Özellikler',
      specLabels: {
        dimensions: 'Ölçü',
        capacity: 'Hacim',
        weight: 'Ağırlık',
        care: 'Bakım',
      },
      handmadeNote:
        'Her parça elde şekillendirilip sırlandığı için renk, sır akışı ve ölçülerde küçük farklılıklar olabilir. Bu farklar el işçiliğinin doğal bir parçasıdır.',
      relatedHeading: 'Benzer ürünler',
    },
    cart: {
      title: 'Sepet',
      metaDescription: `${brandName} sepetiniz: ürünler, adetler, kargo ve genel toplam. Konsept çalışmadır; gerçek satış yapılmaz.`,
      emptyTitle: 'Sepetiniz boş',
      emptyText: 'Atölyenin kupa, tabak, vazo ve dekor objelerine göz atarak başlayabilirsiniz.',
      browseProducts: 'Ürünlere göz at',
      itemsHeading: 'Sepetteki ürünler',
      itemCount: (count) => `${count} ürün`,
      unitPrice: 'Birim fiyat',
      lineTotal: 'Toplam',
      quantityLabel: (productName) => `${productName} adedi`,
      remove: 'Çıkar',
      removeLabel: (productName) => `${productName} ürününü sepetten çıkar`,
      summaryHeading: 'Sipariş özeti',
      subtotal: 'Ara toplam',
      shipping: 'Kargo',
      freeShipping: 'Ücretsiz',
      total: 'Genel toplam',
      freeShippingRemaining: (amount) => `Ücretsiz kargo için ${amount} tutarında daha ürün ekleyin.`,
      freeShippingEarned: 'Ücretsiz kargo kazandınız.',
      freeShippingRule: (threshold, fee) => `${threshold} ve üzeri siparişlerde kargo ücretsiz, altında ${fee}.`,
      checkout: 'Siparişi tamamla',
      continueShopping: 'Alışverişe devam et',
      clearCart: 'Sepeti boşalt',
      clearConfirmTitle: 'Sepet boşaltılsın mı?',
      clearConfirmText: 'Sepetteki tüm ürünler çıkarılacak. Bu işlem geri alınamaz.',
      clearConfirm: 'Evet, boşalt',
      clearCancel: 'Vazgeç',
      announceTotals: (subtotal, shipping, total) =>
        `Sepet güncellendi. Ara toplam ${subtotal}, kargo ${shipping}, genel toplam ${total}.`,
      announceRemoved: (productName) => `${productName} sepetten çıkarıldı.`,
      announceCleared: 'Sepet boşaltıldı.',
    },
    checkout: {
      title: 'Sipariş',
      metaDescription: `${brandName} sipariş adımı: teslimat bilgileri ve sipariş özeti. Konsept çalışmadır; bilgiler gönderilmez, ödeme alınmaz.`,
      conceptNotice:
        'Bu site bir konsept çalışmadır. Gerçek sipariş oluşturulmaz, ödeme alınmaz; girdiğiniz bilgiler hiçbir yere gönderilmez ve kaydedilmez.',
      deliveryHeading: 'Teslimat bilgileri',
      optional: '(isteğe bağlı)',
      fields: {
        fullName: {
          label: 'Ad soyad',
          errors: { required: 'Lütfen adınızı ve soyadınızı yazın.', invalid: 'Adınızı ve soyadınızı aralarında boşluk bırakarak yazın.' },
        },
        phone: {
          label: 'Telefon',
          hint: 'Örn. 0532 123 45 67',
          errors: {
            required: 'Lütfen telefon numaranızı yazın.',
            invalid: 'Telefon numarası geçersiz. 0 ile başlayan 11 haneli ya da +90 ile başlayan bir numara yazın.',
          },
        },
        email: {
          label: 'E-posta',
          hint: 'Örn. ad@ornek.com',
          errors: { required: 'Lütfen e-posta adresinizi yazın.', invalid: 'E-posta adresi geçersiz. ad@ornek.com biçiminde yazın.' },
        },
        provinceCode: {
          label: 'İl',
          errors: { required: 'Lütfen bir il seçin.', invalid: 'Lütfen listeden bir il seçin.' },
        },
        district: {
          label: 'İlçe',
          errors: { required: 'Lütfen ilçeyi yazın.', invalid: 'İlçe adı en az 2 karakter olmalı.' },
        },
        address: {
          label: 'Açık adres',
          hint: 'Mahalle, sokak, bina ve daire numarası',
          errors: { required: 'Lütfen açık adresinizi yazın.', invalid: 'Adres çok kısa; en az 10 karakter olmalı.' },
        },
        postalCode: {
          label: 'Posta kodu',
          hint: '5 haneli, örn. 35000',
          errors: { invalid: 'Posta kodu 5 haneli olmalı ve 01–81 arasında bir il koduyla başlamalı.' },
        },
        note: {
          label: 'Sipariş notu',
          errors: { invalid: 'Sipariş notu en fazla 500 karakter olabilir.' },
        },
        consent: {
          label: 'Bilgilendirme metnini okudum.',
          errors: { required: 'Devam etmek için bilgilendirme metnini okuduğunuzu onaylayın.' },
        },
      },
      provincePlaceholder: 'İl seçin',
      consentHeading: 'Bilgilendirme metni (örnek metin)',
      consentText:
        'Bu bir örnek metindir. Konsept sitede girilen bilgiler yalnızca formun doğrulanması için tarayıcıda kullanılır; hiçbir yere gönderilmez ve saklanmaz.',
      paymentHeading: 'Ödeme',
      paymentText: 'Ödeme adımı konsept sitede yer almaz.',
      submit: 'Siparişi onayla',
      errorSummary: (count) => (count === 1 ? 'Formda düzeltilmesi gereken 1 alan var.' : `Formda düzeltilmesi gereken ${count} alan var.`),
      summary: {
        heading: 'Sipariş özeti',
        itemsToggle: (count) => `Ürünleri göster (${count} ürün)`,
        quantity: (count) => `${count} adet`,
        subtotal: 'Ara toplam',
        shipping: 'Kargo',
        freeShipping: 'Ücretsiz',
        total: 'Genel toplam',
        editCart: 'Sepeti düzenle',
      },
      empty: {
        title: 'Sepetiniz boş',
        text: 'Sipariş verebilmek için önce sepetinize ürün ekleyin.',
        cta: 'Ürünlere göz at',
      },
      confirmation: {
        title: 'Sipariş onayı',
        metaDescription: `${brandName} sipariş onayı. Konsept çalışmadır; gerçek sipariş oluşturulmaz.`,
        heading: 'Teşekkürler!',
        conceptNote:
          'Bu site bir konsept çalışma olduğu için gerçek bir sipariş oluşturulmadı ve ödeme alınmadı. Girdiğiniz bilgiler hiçbir yere gönderilmedi ve kaydedilmedi; sepetiniz boşaltıldı.',
        summaryHeading: 'Sipariş özeti',
        continueShopping: 'Alışverişe devam et',
      },
    },
    notFound: {
      title: 'Sayfa bulunamadı',
      metaDescription: `Aradığınız sayfa ${brandName} konsept mağazasında bulunamadı.`,
      description: 'Aradığınız sayfa taşınmış ya da hiç var olmamış olabilir.',
      backHome: 'Ana sayfaya dön',
    },
  },
}
