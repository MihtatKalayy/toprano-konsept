import type { Category, Product, ProductImage } from './types'

// Ürün ve kategori verisinin tek kaynağı. Ürünler, fiyatlar ve stok bilgisi kurgusaldır.

export const categories: Category[] = [
  { id: 'cat-kupa-fincan', slug: 'kupa-fincan', name: 'Kupa & Fincan' },
  { id: 'cat-tabak-kase', slug: 'tabak-kase', name: 'Tabak & Kase' },
  { id: 'cat-vazo', slug: 'vazo', name: 'Vazo' },
  { id: 'cat-dekor', slug: 'dekor', name: 'Dekor' },
]

const imageSize = 800

// Özgün SVG illüstrasyonlar: public/images/urunler/<slug>-1.svg (genel görünüm) ve -2.svg (yakın görünüm).
function illustrations(slug: string, overviewAlt: string, closeUpAlt: string): ProductImage[] {
  return [
    { src: `/images/urunler/${slug}-1.svg`, alt: overviewAlt, width: imageSize, height: imageSize },
    { src: `/images/urunler/${slug}-2.svg`, alt: closeUpAlt, width: imageSize, height: imageSize },
  ]
}

const dishwasherSafe = 'Bulaşık makinesinde yıkanabilir; mikrodalgada kullanılabilir. Ani sıcaklık değişimlerinden koruyun.'
const handWash = 'Elde, ılık su ve yumuşak süngerle yıkayın. Aşındırıcı temizleyici kullanmayın.'
const decorOnly = 'Yalnızca dekoratif kullanım içindir. Nemli, yumuşak bir bezle silin.'

export const products: Product[] = [
  {
    id: 'p-001',
    slug: 'kiremit-sirli-kupa',
    name: 'Kiremit Sırlı Kupa',
    categoryId: 'cat-kupa-fincan',
    priceKurus: 42000,
    shortDescription: 'Üst yarısı kiremit sırlı, alt yarısı çıplak kil bırakılmış günlük kupa.',
    description:
      'Çarkta şekillendirilen bu kupa, sır kabına elle daldırılarak sırlanır; bu yüzden sır çizgisi her kupada biraz farklı düşer. Alt kısımda bırakılan çıplak kil, avuca sıcak ve hafif pürüzlü bir tutuş verir. Geniş kulpu dört parmağı rahatça alır.',
    specs: { dimensions: 'Ø 9 cm × 10 cm', capacity: '350 ml', weight: '380 g', care: dishwasherSafe },
    stock: 'in-stock',
    images: illustrations(
      'kiremit-sirli-kupa',
      'Üst yarısı kiremit rengi sırlı, alt yarısı açık kahve çıplak kil olan kulplu kupa',
      'Kiremit sırın çıplak kile dalgalı bir çizgiyle geçtiği yerin yakın görünümü',
    ),
    featured: true,
    addedAt: '2026-03-12',
  },
  {
    id: 'p-002',
    slug: 'kum-tanesi-espresso-fincani',
    name: 'Kum Tanesi Espresso Fincanı (2’li)',
    categoryId: 'cat-kupa-fincan',
    priceKurus: 48000,
    shortDescription: 'Benekli krem sırlı, tabaklı iki espresso fincanı.',
    description:
      'Demir taneli kil, fırında sırın içinden yüzeye çıkarak kum tanesi gibi küçük benekler bırakır. Kalın cidarı kahveyi daha uzun sıcak tutar. Set, iki fincan ve iki tabaktan oluşur.',
    specs: { dimensions: 'Fincan Ø 6,5 cm × 6 cm; tabak Ø 12 cm', capacity: '90 ml', weight: '2 × 210 g', care: dishwasherSafe },
    stock: 'low-stock',
    images: illustrations(
      'kum-tanesi-espresso-fincani',
      'Tabakları üzerinde duran, koyu benekli krem renkli iki küçük espresso fincanı',
      'Benekli krem fincanın kulpu ve içindeki kahvenin yakın görünümü',
    ),
    featured: false,
    addedAt: '2026-05-04',
  },
  {
    id: 'p-003',
    slug: 'kulpsuz-cay-kasesi',
    name: 'Kulpsuz Çay Kasesi',
    categoryId: 'cat-kupa-fincan',
    priceKurus: 36000,
    shortDescription: 'Adaçayı yeşili sırlı, iki elle tutulan uzun çay kasesi.',
    description:
      'Uzun ve ince gövdesiyle bitki çayları ve yeşil çay için tasarlandı. Adaçayı yeşili sır, fırınlama sırasında aşağı doğru akarak her kasede kendine özgü damlalar bırakır. Kulpsuz formu, sıcak içeceği avuçlarda tutmaya davet eder.',
    specs: { dimensions: 'Ø 7,5 cm × 12 cm', capacity: '220 ml', weight: '290 g', care: dishwasherSafe },
    stock: 'in-stock',
    images: illustrations(
      'kulpsuz-cay-kasesi',
      'Üst kısmı adaçayı yeşili sırlı, altı çıplak kil olan uzun ve kulpsuz çay kasesi',
      'Yeşil sırın çıplak kil üzerine damlayarak aktığı kenarın yakın görünümü',
    ),
    featured: false,
    addedAt: '2026-01-20',
  },
  {
    id: 'p-004',
    slug: 'ege-servis-tabagi',
    name: 'Ege Servis Tabağı',
    categoryId: 'cat-tabak-kase',
    priceKurus: 89000,
    shortDescription: 'Deniz mavisi kenarlı, krem iç yüzeyli geniş servis tabağı.',
    description:
      'Sofranın ortasına konan, paylaşmak için yapılmış geniş bir tabak. Kenarındaki deniz mavisi sır, krem iç yüzeye doğru yumuşakça incelir. Mezeler, salatalar ya da fırından çıkan bir börek için yeterince geniş.',
    specs: { dimensions: 'Ø 28 cm × 4 cm', weight: '1,1 kg', care: dishwasherSafe },
    stock: 'in-stock',
    images: illustrations(
      'ege-servis-tabagi',
      'Kenarı deniz mavisi, ortası benekli krem renkli geniş, yuvarlak servis tabağı',
      'Mavi kenar sırının krem iç yüzeyle buluştuğu yerin yakın görünümü',
    ),
    featured: true,
    addedAt: '2026-02-08',
  },
  {
    id: 'p-005',
    slug: 'derin-corba-kasesi',
    name: 'Derin Çorba Kasesi',
    categoryId: 'cat-tabak-kase',
    priceKurus: 54000,
    shortDescription: 'Dışı antrasit, içi krem sırlı derin kase.',
    description:
      'Dışındaki mat antrasit sır ile içindeki parlak krem sır arasındaki karşıtlık, çorbanın rengini öne çıkarır. Derin formu, çorbanın yanı sıra kahvaltılık gevrek ve makarna için de uygundur.',
    specs: { dimensions: 'Ø 16 cm × 8 cm', capacity: '600 ml', weight: '520 g', care: dishwasherSafe },
    stock: 'in-stock',
    images: illustrations(
      'derin-corba-kasesi',
      'Dışı koyu antrasit, içi açık krem renkli, kil ayaklı derin kase',
      'Antrasit dış yüzeyin krem iç kenarla buluştuğu ağzın yakın görünümü',
    ),
    featured: false,
    addedAt: '2026-04-15',
  },
  {
    id: 'p-006',
    slug: 'tatli-tabagi-seti',
    name: 'Tatlı Tabağı Seti (4’lü)',
    categoryId: 'cat-tabak-kase',
    priceKurus: 128000,
    shortDescription: 'İkisi kiremit, ikisi kil rengi dört tatlı tabağı.',
    description:
      'Birbirine yakışan iki tonda dört tabak: ikisi kiremit sırlı, ikisi doğal kil renginde. Hafif kalkık kenarları, şerbetli tatlıların ve kekin sosunu tabakta tutar. Üst üste kolayca istiflenir.',
    specs: { dimensions: 'Ø 18 cm × 2,5 cm', weight: '4 × 340 g', care: dishwasherSafe },
    stock: 'out-of-stock',
    images: illustrations(
      'tatli-tabagi-seti',
      'Kiremit ve açık kil renkleri sırayla dizilmiş, üst üste istiflenmiş dört tatlı tabağı',
      'İstiflenmiş tabakların kenarlarındaki iki renk katmanının yakın görünümü',
    ),
    featured: false,
    addedAt: '2026-06-02',
  },
  {
    id: 'p-007',
    slug: 'govdeli-amfora-vazo',
    name: 'Gövdeli Amfora Vazo',
    categoryId: 'cat-vazo',
    priceKurus: 165000,
    shortDescription: 'Antik amforalardan esinlenen, krem şeritli büyük kiremit vazo.',
    description:
      'Dar boyun ve geniş gövdesiyle Ege’nin eski amforalarına selam verir. Gövdeyi saran iki krem şerit, çark dönerken fırçayla tek hamlede çekilir. Kuru dallar ya da tek başına bir obje olarak kullanılabilir.',
    specs: { dimensions: 'Ø 20 cm × 32 cm', capacity: '3,5 l', weight: '1,9 kg', care: handWash },
    stock: 'in-stock',
    images: illustrations(
      'govdeli-amfora-vazo',
      'Dar boyunlu, geniş gövdeli, ortasında iki ince krem şerit bulunan kiremit renkli vazo',
      'Kiremit gövdeyi saran krem şeritlerin yakın görünümü',
    ),
    featured: true,
    addedAt: '2026-03-28',
  },
  {
    id: 'p-008',
    slug: 'tek-dal-vazo',
    name: 'Tek Dal Vazo',
    categoryId: 'cat-vazo',
    priceKurus: 38000,
    shortDescription: 'Tek bir dal ya da çiçek için küçük, benekli krem vazo.',
    description:
      'Pencere önüne, kitaplığa ya da yemek masasına tek bir dal için yapılmış küçük bir vazo. Dar ağzı dalı dik tutar; ağırlığı tabanda toplandığından kolay devrilmez.',
    specs: { dimensions: 'Ø 9 cm × 14 cm', capacity: '150 ml', weight: '260 g', care: handWash },
    stock: 'low-stock',
    images: illustrations(
      'tek-dal-vazo',
      'İçinde tek bir yeşil dal bulunan, yuvarlak gövdeli küçük, benekli krem vazo',
      'Benekli krem vazonun gövdesinin ve dar ağzının yakın görünümü',
    ),
    featured: false,
    addedAt: '2026-07-19',
  },
  {
    id: 'p-009',
    slug: 'antrasit-mat-vazo',
    name: 'Antrasit Mat Vazo',
    categoryId: 'cat-vazo',
    priceKurus: 112000,
    shortDescription: 'İnce kiremit çizgili, mat antrasit silindir vazo.',
    description:
      'Sade bir silindir form, kadife dokulu mat antrasit sır ve gövdeyi çevreleyen tek bir kiremit çizgi. Uzun saplı çiçekler ve okaliptüs dalları için yeterince yüksek.',
    specs: { dimensions: 'Ø 13 cm × 24 cm', capacity: '1,8 l', weight: '1,2 kg', care: handWash },
    stock: 'in-stock',
    images: illustrations(
      'antrasit-mat-vazo',
      'Tabana doğru hafifçe genişleyen, ince bir kiremit çizgiyle çevrili mat antrasit vazo',
      'Mat antrasit yüzeydeki ince kiremit çizginin yakın görünümü',
    ),
    featured: false,
    addedAt: '2026-08-05',
  },
  {
    id: 'p-010',
    slug: 'mumluk-uclu-set',
    name: 'Mumluk Üçlü Set',
    categoryId: 'cat-dekor',
    priceKurus: 46000,
    shortDescription: 'Üç farklı boy ve renkte, birlikte ya da ayrı kullanılan mumluklar.',
    description:
      'Krem, kiremit ve kil renklerinde üç mumluk. Farklı yükseklikleri sayesinde bir arada dizildiklerinde sıcak bir kompozisyon oluştururlar. Standart tealight ve ince sütun mumlarla kullanılabilir.',
    specs: { dimensions: 'Yükseklikler 7, 10 ve 14 cm; Ø 7 cm', weight: 'Toplam 750 g', care: decorOnly },
    stock: 'in-stock',
    images: illustrations(
      'mumluk-uclu-set',
      'Krem, kiremit ve açık kil renklerinde, farklı boylarda yanan mumlu üç mumluk',
      'Kiremit renkli uzun mumluğun ve alevin yakın görünümü',
    ),
    featured: false,
    addedAt: '2026-09-10',
  },
  {
    id: 'p-011',
    slug: 'nar-desenli-duvar-tabagi',
    name: 'Nar Desenli Duvar Tabağı',
    categoryId: 'cat-dekor',
    priceKurus: 145000,
    shortDescription: 'Elle boyanmış nar motifli, asma aparatlı dekoratif tabak.',
    description:
      'Anadolu’nun bereket simgesi nar, krem zemine sır altı boyayla elle çizilir. Kiremit kenar ve mavi iç halka motifi çerçeveler. Arkasındaki gizli asma aparatıyla doğrudan duvara asılabilir.',
    specs: { dimensions: 'Ø 30 cm × 3 cm', weight: '1,3 kg', care: decorOnly },
    stock: 'in-stock',
    images: illustrations(
      'nar-desenli-duvar-tabagi',
      'Krem zemin üzerinde ortasında kırmızı bir nar, yanlarında yeşil yapraklar olan, kiremit kenarlı yuvarlak duvar tabağı',
      'Elle boyanmış nar motifinin ve tanelerinin yakın görünümü',
    ),
    featured: true,
    addedAt: '2026-05-22',
  },
  {
    id: 'p-012',
    slug: 'yaprak-taki-tabagi',
    name: 'Yaprak Takı Tabağı',
    categoryId: 'cat-dekor',
    priceKurus: 28000,
    shortDescription: 'Gerçek bir yaprağın damarlarıyla şekillenmiş küçük takı tabağı.',
    description:
      'Islak kile bastırılan gerçek bir incir yaprağı, damarlarını yüzeyde bırakır. Adaçayı yeşili sır bu izlerde koyulaşarak dokuyu belirginleştirir. Yüzük, küpe ya da anahtar için başucunda küçük bir durak.',
    specs: { dimensions: '16 cm × 9 cm × 2 cm', weight: '160 g', care: handWash },
    stock: 'in-stock',
    images: illustrations(
      'yaprak-taki-tabagi',
      'Damarları belirgin, adaçayı yeşili yaprak biçiminde, üzerinde küçük altın bir yüzük duran tabak',
      'Yaprak tabağın damar dokusunun ve yüzüğün yakın görünümü',
    ),
    featured: false,
    addedAt: '2026-02-26',
  },
]
