# Toprana — Proje Dokümanı

## Özet

**Toprana**, el yapımı seramik ürünler satan **kurgusal** bir atölyenin online mağazasıdır.

> **Bu site bir konsept çalışmadır.** Gerçek bir müşteri, gerçek bir mağaza veya gerçek satış yoktur. Sitede sipariş verilemez, ödeme alınmaz.

Projenin asıl amacı, portföyü inceleyen potansiyel müşterilere etkileşimli bir e-ticaret ön yüzü (ürün listesi, filtre, ürün detayı, sepet) geliştirebildiğimi göstermektir.

## Stack

- **React** + **TypeScript**
- **Vite** (geliştirme sunucusu ve derleme)
- **Tailwind CSS** (stil)
- **React Router** (sayfa yönlendirme)
- **Deploy:** Netlify
- **Backend yok.** Tüm veri ön yüzde, statik içerik kaynağından okunur.

## MVP Kapsamı

### Sayfalar

- Ana sayfa
- Ürünler
- Ürün detayı
- Sepet
- Sipariş
- 404 (bulunamadı)

### Ürünler ve kategoriler

4 kategoride toplam 12 ürün:

- Kupa & Fincan
- Tabak & Kase
- Vazo
- Dekor

### Ürünler sayfası

- Kategori filtresi
- Fiyat aralığı filtresi
- Sıralama
- Arama

### Ürün detayı

- Görseller
- Açıklama
- Özellikler
- Stok durumu
- Adet seçimi
- Sepete ekleme

### Sepet

- Adet değiştirme
- Ürün çıkarma
- Ara toplam, kargo ve genel toplam
- Header'da sepetteki ürün adedi

### Sipariş

- Teslimat bilgisi formu
- Sipariş özeti
- Ödeme adımı yoktur; akış bir konsept notuyla biter.

## Kapsam Dışı

- Gerçek ödeme
- Kart bilgisi alanı
- Üyelik / giriş
- Backend / veritabanı
- Yönetim paneli
- Kupon
- Yorum yazma
- Çoklu dil

## Mimari Kararlar

### Veri

- Ürün ve kategori verisi **tek bir içerik kaynağında** tutulur.
- Her ürünün ve kategorinin **sabit bir id'si** ve adres için **ayrı bir slug'ı** vardır. Eşleştirme her zaman **id ile** yapılır; slug yalnızca adres içindir.
- Site metinleri bileşenlere gömülmez, içerik kaynağından okunur.

### Para

- Fiyatlar **kuruş cinsinden tam sayı** olarak tutulur.
- Gösterimde Türk lirası biçimine çevrilir.
- Ondalıklı sayı ile para hesabı yapılmaz.

### Sepet

- Sepet **yalnızca ürün id'si ve adedi** tutar. Ad, fiyat ve görsel her zaman ürün kaynağından okunur.
- Sepet tarayıcı depolamasında **sürüm numaralı bir yapıyla** saklanır (anahtar `toprana.sepet`, içinde `version` alanı). Yapı değişirse sürüm artar; eski veri güvenli şekilde dönüştürülür veya temizlenir. Ayrıntılar: **Sepet** bölümü.
- Bozuk veya tanınmayan veri uygulamayı çökertmez.
- Sepeti **okuyan** ve **değiştiren** işlemler ayrı tutulur; her değişiklik **tek adımda** uygulanır.

### Adres çubuğu durumu

- Filtre, sıralama ve arama durumu **adres çubuğunda** tutulur. Bağlantı paylaşıldığında aynı görünüm açılır.

### Sipariş formu ve kişisel veri

- Sipariş formu **yalnızca ön yüzde doğrulama** yapar.
- Hiçbir yere veri göndermez, kişisel veriyi saklamaz.

### İçerik ve dürüstlük

- Marka, ürün adları, fiyatlar ve iletişim bilgileri **kurgusaldır**.
- Gerçek marka adı kullanılmaz.
- Uydurma yorum, puan veya satış istatistiği gösterilmez.
- Footer'da ve sipariş adımında şu ibare yer alır: **"Bu site bir konsept çalışmadır; gerçek satış yapılmaz."**

### Görseller

- Görseller yalnızca **ticari kullanıma uygun ücretsiz lisanslı** kaynaklardan veya **özgün illüstrasyonlardan** seçilir.
- Kullanılan her görselin kaynağı ve lisansı aşağıdaki **Görsel Kaynakları ve Lisanslar** bölümünde listelenir.

### Tasarım

- Renk yönü: **kiremit**, **krem** ve **antrasit** tonları.
- Sıcak, sade, el işi hissi veren bir görünüm.
- **Mobil öncelikli.**

### Yayın

- Yayın ayarları `netlify.toml` ile repoda tutulur; tek sayfa uygulaması (SPA) yönlendirmesi dahil.

### Kalite hedefi

- Lighthouse **mobil** profilde Performance, Accessibility, Best Practices ve SEO için **90 ve üzeri**.

## Ürün Kataloğu

Veri `src/content/catalog.ts` dosyasındadır; ürünler, fiyatlar ve stok durumu kurgusaldır. Her ürünün sabit bir id'si (`p-001` …) ve adres için ayrı bir slug'ı vardır.

| Id | Ürün | Kategori | Fiyat | Stok | Öne çıkan |
| -- | ---- | -------- | ----- | ---- | --------- |
| p-001 | Kiremit Sırlı Kupa | Kupa & Fincan | ₺420 | Stokta | Evet |
| p-002 | Kum Tanesi Espresso Fincanı (2’li) | Kupa & Fincan | ₺480 | Az kaldı | |
| p-003 | Kulpsuz Çay Kasesi | Kupa & Fincan | ₺360 | Stokta | |
| p-004 | Ege Servis Tabağı | Tabak & Kase | ₺890 | Stokta | Evet |
| p-005 | Derin Çorba Kasesi | Tabak & Kase | ₺540 | Stokta | |
| p-006 | Tatlı Tabağı Seti (4’lü) | Tabak & Kase | ₺1.280 | Tükendi | |
| p-007 | Gövdeli Amfora Vazo | Vazo | ₺1.650 | Stokta | Evet |
| p-008 | Tek Dal Vazo | Vazo | ₺380 | Az kaldı | |
| p-009 | Antrasit Mat Vazo | Vazo | ₺1.120 | Stokta | |
| p-010 | Mumluk Üçlü Set | Dekor | ₺460 | Stokta | |
| p-011 | Nar Desenli Duvar Tabağı | Dekor | ₺1.450 | Stokta | Evet |
| p-012 | Yaprak Takı Tabağı | Dekor | ₺280 | Stokta | |

Kategori id'leri: `cat-kupa-fincan`, `cat-tabak-kase`, `cat-vazo`, `cat-dekor`. Slug'ları: `kupa-fincan`, `tabak-kase`, `vazo`, `dekor`.

## Görsel Kaynakları ve Lisanslar

### Seçilen yol: özgün SVG illüstrasyonlar

Ürün görselleri için fotoğraf yerine bu projede çizilen özgün SVG illüstrasyonlar kullanılır. Gerekçe:

- Ticari kullanıma uygun ücretsiz fotoğraf kaynaklarına (Unsplash, Pexels, Wikimedia Commons, Openverse) geliştirme ortamından erişilemedi. Bu yüzden lisansı ve kaynağı tek tek doğrulanmış 12 fotoğraflık bir set oluşturulamadı.
- Erişilebilseydi bile 12 ürünün (4 kategori, belirli formlar ve sırlar) aynı ışık, zemin ve açıyla çekilmiş, birbirine uyumlu fotoğraflarını bulmak gerçekçi değildi. Tutarsız fotoğraflar konsepti zayıflatırdı.
- SVG illüstrasyonlar tasarım sistemiyle aynı paleti (kiremit, krem, antrasit, ek olarak adaçayı yeşili ve Ege mavisi sır tonları) kullanır, lisans belirsizliği taşımaz ve çok küçüktür (dosya başına 1–3,5 KB, 24 dosya toplam ~100 KB).

Üretim ve kullanım:

- Görseller betiklerle üretilir. Ortak tarz (renk paleti, benek dokusu, gölge, kaide) `scripts/illustration-style.mjs`, ürün çizimleri `scripts/product-drawings.mjs` içindedir.
  - Ürün görselleri: `node scripts/generate-product-images.mjs`. Her ürün için iki görsel vardır: `-1.svg` genel görünüm, `-2.svg` yakın görünüm.
  - Ana sayfa görselleri: `node scripts/generate-home-images.mjs`. Hero kompozisyonu ürün çizimlerinden kurulur; üretim sürecinin üç adımı ayrıca çizilir.
- Görsel değişirse dosya adı da değiştirilmeli; `/images` altı uzun süre önbelleğe alınabilir.
- Her görselin `width`/`height` değeri (800 × 800) veride tutulur ve `<img>` etiketine yazılır; kart görsel alanı `aspect-square` olduğu için yüklenirken düzen kaymaz.
- Ürün listesinde ilk 2 kartın görseli hemen, diğerleri tembel (`loading="lazy"`) ve `decoding="async"` ile yüklenir.
- Her görselin veride açıklayıcı bir alt metni vardır. Ürün kartında ad zaten yazılı olduğundan görsel orada süs niteliğindedir (`alt=""`); alt metinler ürün detay sayfasının galerisinde kullanılır.

| Görsel | Kullanıldığı yer | Kaynak | Lisans |
| ------ | ---------------- | ------ | ------ |
| Logo işareti ve favicon (sade kâse çizimi) | Header, `public/favicon.svg` | Özgün SVG, bu projede çizildi | Proje ile birlikte |
| Atölye sahnesi: kupa, kase, büyük vazo ve tek dal vazo | Ana sayfa hero, `public/images/ana-sayfa/atolye-hero.svg` (1200 × 900) | Özgün SVG, `scripts/generate-home-images.mjs` | Proje ile birlikte |
| Şekillendirme: çarkta kil | Ana sayfa atölye bölümü, `public/images/ana-sayfa/surec-sekillendirme.svg` (600 × 450) | Özgün SVG, `scripts/generate-home-images.mjs` | Proje ile birlikte |
| Sırlama: sır kabına daldırılan kupa | Ana sayfa atölye bölümü, `public/images/ana-sayfa/surec-sirlama.svg` (600 × 450) | Özgün SVG, `scripts/generate-home-images.mjs` | Proje ile birlikte |
| Fırınlama: fırın içinde pişen parçalar | Ana sayfa atölye bölümü, `public/images/ana-sayfa/surec-firinlama.svg` (600 × 450) | Özgün SVG, `scripts/generate-home-images.mjs` | Proje ile birlikte |
| Kiremit Sırlı Kupa: genel ve yakın görünüm | Ürün kartı, ürün detayı | Özgün SVG, `public/images/urunler/kiremit-sirli-kupa-1.svg`, `-2.svg` | Proje ile birlikte |
| Kum Tanesi Espresso Fincanı (2’li): genel ve yakın görünüm | Ürün kartı, ürün detayı | Özgün SVG, `public/images/urunler/kum-tanesi-espresso-fincani-1.svg`, `-2.svg` | Proje ile birlikte |
| Kulpsuz Çay Kasesi: genel ve yakın görünüm | Ürün kartı, ürün detayı | Özgün SVG, `public/images/urunler/kulpsuz-cay-kasesi-1.svg`, `-2.svg` | Proje ile birlikte |
| Ege Servis Tabağı: genel ve yakın görünüm | Ürün kartı, ürün detayı | Özgün SVG, `public/images/urunler/ege-servis-tabagi-1.svg`, `-2.svg` | Proje ile birlikte |
| Derin Çorba Kasesi: genel ve yakın görünüm | Ürün kartı, ürün detayı | Özgün SVG, `public/images/urunler/derin-corba-kasesi-1.svg`, `-2.svg` | Proje ile birlikte |
| Tatlı Tabağı Seti (4’lü): genel ve yakın görünüm | Ürün kartı, ürün detayı | Özgün SVG, `public/images/urunler/tatli-tabagi-seti-1.svg`, `-2.svg` | Proje ile birlikte |
| Gövdeli Amfora Vazo: genel ve yakın görünüm | Ürün kartı, ürün detayı | Özgün SVG, `public/images/urunler/govdeli-amfora-vazo-1.svg`, `-2.svg` | Proje ile birlikte |
| Tek Dal Vazo: genel ve yakın görünüm | Ürün kartı, ürün detayı | Özgün SVG, `public/images/urunler/tek-dal-vazo-1.svg`, `-2.svg` | Proje ile birlikte |
| Antrasit Mat Vazo: genel ve yakın görünüm | Ürün kartı, ürün detayı | Özgün SVG, `public/images/urunler/antrasit-mat-vazo-1.svg`, `-2.svg` | Proje ile birlikte |
| Mumluk Üçlü Set: genel ve yakın görünüm | Ürün kartı, ürün detayı | Özgün SVG, `public/images/urunler/mumluk-uclu-set-1.svg`, `-2.svg` | Proje ile birlikte |
| Nar Desenli Duvar Tabağı: genel ve yakın görünüm | Ürün kartı, ürün detayı | Özgün SVG, `public/images/urunler/nar-desenli-duvar-tabagi-1.svg`, `-2.svg` | Proje ile birlikte |
| Yaprak Takı Tabağı: genel ve yakın görünüm | Ürün kartı, ürün detayı | Özgün SVG, `public/images/urunler/yaprak-taki-tabagi-1.svg`, `-2.svg` | Proje ile birlikte |

## Tasarım Sistemi

Tüm tasarım belirteçleri tek yerde, `src/styles/index.css` içindeki Tailwind `@theme` bloğunda tanımlıdır. Bileşenler yalnızca bu belirteçlerden türeyen sınıfları kullanır (`bg-krem`, `text-antrasit-900`, `bg-vurgu` vb.).

### Fontlar

| Kullanım | Font | Lisans | Dosyalar |
| -------- | ---- | ------ | -------- |
| Başlıklar (`font-display`) | Fraunces (değişken, ağırlık ekseni) | SIL Open Font License 1.1 | `public/fonts/fraunces-*.woff2` |
| Gövde (`font-sans`) | Source Sans 3 (değişken, ağırlık ekseni) | SIL Open Font License 1.1 | `public/fonts/source-sans-3-*.woff2` |

- Dosyalar Fontsource paketlerinden (`@fontsource-variable/fraunces`, `@fontsource-variable/source-sans-3`, v5.3.0) alınıp repoya kopyalandı; proje bağımlılığı olarak eklenmedi. Lisans metinleri `public/fonts/OFL-*.txt`.
- Fontlar kendi sunucumuzdan, `font-display: swap` ile yüklenir. Latin temel dosyalar (`*-latin-wght.woff2`) `index.html`'de önceden yüklenir (preload).
- Türkçe desteği: ç, ö, ü ve ı Latin temel dosyada bulunur. Ğ, ğ, İ, Ş, ş ve ₺ için yalnızca bu harfleri içeren küçük bir ek dosya (`*-tr-wght.woff2`, 3–4 KB) `unicode-range` ile gerektiğinde yüklenir. Toplam font yükü yaklaşık 72 KB.

### Renkler

| Belirteç | Kod | Kullanım |
| -------- | --- | -------- |
| `kiremit-50` | `#FBF0EA` | Bilgi kutusu zemini |
| `kiremit-100` | `#F4DCCF` | Açık kiremit yüzey |
| `kiremit-300` | `#DE9F80` | Koyu zemin üstünde vurgulu metin |
| `kiremit-500` | `#C2603A` | Yalnızca dekoratif (metin için kullanılmaz) |
| `kiremit-600` | `#A84E2C` | **Vurgu** (`vurgu`): butonlar, önemli çağrılar, rozet, odak çizgisi |
| `kiremit-700` | `#8E3F23` | Vurgu üzerine gelme (`vurgu-hover`), bağlantı ve etkin menü metni |
| `kiremit-800` | `#6E301B` | Konsept ibaresi şeridi, bilgi kutusu metni |
| `krem` | `#F7F1E6` | Ana zemin |
| `krem-200` | `#EDE3D1` | Ayraç çizgileri, ikincil yüzey |
| `notr` | `#FBFAF8` | Çok açık nötr zemin (kartlar için) |
| `antrasit-600` | `#50565D` | İkincil metin |
| `antrasit-700` | `#3A4046` | Açıklama metni, menü |
| `antrasit-900` | `#24282C` | Ana metin, footer zemini |
| `vurgu-metin` | `#FFFFFF` | Vurgu zemini üstündeki metin |

Vurgu tek bir renktir (`kiremit-600`); butonlar ve önemli çağrılar dışında zemin rengi olarak kullanılmaz.

### Kontrast oranları (WCAG 2.x)

Tüm metin/zemin çiftleri AA (normal metin için 4.5:1) eşiğini geçer.

| Metin | Zemin | Oran | Sonuç |
| ----- | ----- | ---- | ----- |
| `antrasit-900` | `krem` | 13.20 | AAA |
| `antrasit-900` | `notr` | 14.23 | AAA |
| `antrasit-900` | `krem-200` | 11.67 | AAA |
| `antrasit-700` | `krem` | 9.33 | AAA |
| `antrasit-600` | `krem` | 6.60 | AA |
| `kiremit-700` | `krem` | 6.47 | AA |
| `vurgu-metin` (beyaz) | `kiremit-600` (vurgu) | 5.54 | AA |
| `vurgu-metin` (beyaz) | `kiremit-700` (vurgu-hover) | 7.28 | AAA |
| `kiremit-800` | `kiremit-50` | 8.92 | AAA |
| `krem` | `kiremit-800` | 8.89 | AAA |
| `krem` | `antrasit-900` | 13.20 | AAA |
| `krem-200` | `antrasit-900` | 11.67 | AAA |
| `kiremit-300` | `antrasit-900` | 6.63 | AA |
| Odak çizgisi `kiremit-600` | `krem` | 4.93 | Arayüz öğesi için gereken 3:1'in üstünde |
| Odak çizgisi `krem` (yalnızca footer) | `antrasit-900` | 13.20 | Koyu zeminde vurgu rengi 2,68:1 kaldığı için footer'da odak çizgisi krem |

## Sepet

### Kurallar

Kurallar ve tutarlar tek yerde, `src/config/shop.ts` içinde, kuruş cinsinden tam sayı olarak tutulur.

| Kural | Değer |
| ----- | ----- |
| Kargo ücreti | ₺75 (`shippingFeeKurus: 7500`) |
| Ücretsiz kargo eşiği | Ara toplam ₺1.500 **veya üzeri** (`freeShippingThresholdKurus: 150000`); ₺1.499,99 ve altı ücretli |
| Boş sepette kargo | ₺0 |
| Ürün başına adet | En az 1, en fazla 10 |

- Tükenen ürün ve ürün kaynağında olmayan id sepete eklenemez. Eşleştirme her zaman ürün id'si ile yapılır.
- Aynı ürün tekrar eklenince yeni satır açılmaz, adet artar. Sepetteki adetle birlikte 10 aşılacaksa yalnızca sığan kadarı eklenir.
- Satır toplamı, ara toplam, kargo, genel toplam ve toplam adet `src/lib/cart.ts` içindeki saf işlevlerle hesaplanır. Her işlem yeni bir sepet döndürür; mevcut veri yerinde değiştirilmez.

### Saklama yapısı (sürüm 1)

`localStorage` içinde `toprana.sepet` anahtarı altında:

```json
{ "version": 1, "lines": [{ "productId": "p-001", "quantity": 2 }] }
```

- Yalnızca ürün id'si ve adet yazılır. Ad, fiyat, görsel ve stok her zaman ürün kaynağından okunur; kişisel veri yazılmaz.
- Okurken doğrulama (`src/lib/cartStorage.ts`, `parseStoredCart`):
  - bozuk JSON, beklenmeyen biçim ve tanınmayan sürüm → boş sepet;
  - bilinmeyen ürün id'si, artık tükenmiş ürün, geçersiz satır ve geçersiz adet → o satır ayıklanır;
  - sınır dışı ya da küsuratlı adet → 1–10 aralığına çekilir; aynı ürünün yinelenen satırları birleştirilir.
- Bir şey ayıklandıysa düzeltilmiş sepet depolamaya geri yazılır, durum `console.warn` ile loga yazılır ve sayfanın üstünde kapatılabilir kısa bir bilgi gösterilir.
- Depolamaya erişilemiyorsa (gizli sekme kısıtı, kota dolu vb.) sepet o oturum boyunca bellekte çalışmaya devam eder; sebep loga yazılır.
- Başka bir sekmede sepet değişirse `storage` olayıyla bu sekme de güncellenir.
- Yapı değişirse `cartStorageVersion` artırılır ve `parseStoredCart` eski sürümü yeni yapıya dönüştürür. Dönüştürülemeyen sürüm temizlenir.

### Durum paylaşımı

- `src/cart/cartStore.ts`: sepeti tutan küçük depo. Her değişiklik tek adımda hesaplanır, kaydedilir ve dinleyicilere bildirilir.
- `CartProvider` depoyu React bağlamıyla (context) paylaşır. Ek bir kütüphane kullanılmaz; React'in `useSyncExternalStore` aracı kullanılır.
- Okuma ve değiştirme ayrıdır:
  - `useCart()` satırları ürün kaynağıyla birleştirilmiş, toplamları hesaplanmış olarak okur;
  - `useCartActions()` yalnızca değiştirme işlevlerini verir.

### Sepet sayfası

- Her satırda görsel, detay sayfasına bağlantılı ürün adı, birim fiyat, adet seçimi, satır toplamı ve "Çıkar" var.
- Özette ara toplam, kargo ve genel toplam ile ücretsiz kargoya kalan tutar ya da kazanıldı bilgisi yer alır. "Siparişi tamamla" `/siparis`'e, "Alışverişe devam et" `/urunler`'e gider.
- "Sepeti boşalt" tarayıcının yerleşik `<dialog>` penceresiyle onay ister.
- Toplamlar değişince ekran okuyucuya duyurulur.
- Bir ürün çıkarılınca odak sonraki ürünün adına gider; son satırsa bir öncekine, sepet boşalırsa sayfa başlığına.
- Mobilde satırlar kart düzenindedir. Geniş ekranda (1024 px ve üstü) liste solda, özet sağda sabit durur.

## Ana Sayfa

Bölümler, yukarıdan aşağıya:

1. **Hero:** ana başlık (sayfadaki tek `h1`), kısa metin, "Ürünleri keşfet" butonu ve atölye sahnesi illüstrasyonu. Görsel öncelikli yüklenir (`fetchpriority="high"`, 1200 × 900, 4:3 alan). Mobilde metin üstte, 768 px ve üstünde yan yana.
2. **Kategoriler:** 4 kart. Kategoriler ürün kaynağındaki listeden id ile gelir; yalnızca kısa açıklamalar içerik kaynağında, kategori id'siyle eşleşir. Kart görseli kategorinin ilk önerilen ürününün yakın görünümüdür; ürün sayısı veriden hesaplanır (`getCategoryShowcase`). Her kart Ürünler sayfasını o kategoriyle filtreli açar.
3. **Öne çıkan ürünler:** veride öne çıkan işaretli ürünlerden en fazla 4 tanesi (`getFeaturedProducts`). Ürün kartı bileşeni Ürünler sayfasıyla ortaktır. Altında "Tüm ürünleri gör" bağlantısı vardır.
4. **Atölye:** kurgusal atölyenin kısa hikâyesi ve üretimin üç adımı (şekillendirme, sırlama, fırınlama). Her adımda illüstrasyon, başlık ve kısa metin var.
5. **Değerler şeridi:** el yapımı üretim, özenli paketleme ve kargo. Kargo metnindeki tutarlar sepetle aynı yapılandırmadan (`src/config/shop.ts`) okunur.
6. **Kapanış çağrısı:** kısa bir cümle ve Ürünler'e giden buton.

- Sekme başlığı "El yapımı seramik atölyesi | Toprana"; açıklama meta etiketinde "konsept çalışma" ifadesi geçer.
- Uydurma yorum, puan, satış iddiası, indirim, geri sayım, otomatik dönen slider veya veri toplayan form yoktur.

## Sipariş

### Akış

1. **Sepet:** "Siparişi tamamla" → `/siparis`.
2. **Sipariş sayfası:**
   - Üstte konsept bilgi kutusu.
   - Geniş ekranda (1024 px ve üstü) solda teslimat formu, sağda sipariş özeti. Mobilde önce kısa özet (toplamlar ve açılır ürün listesi), sonra form.
   - Sepet boşsa form gösterilmez; boş durum ve Ürünler bağlantısı gösterilir.
3. **Geçerli gönderim:**
   - Hiçbir ağ isteği yapılmaz.
   - Yalnızca ürün satırları ve toplamlar, bellekte tek kullanımlık bir kayda (`src/checkout/confirmation.ts`) konur ve `/siparis/onay` açılır.
4. **Onay ekranı:**
   - Teşekkür başlığı, konsept notu, sipariş özeti ve "Alışverişe devam et". Sipariş numarası üretilmez.
   - Ekran açılınca kayıt silinir, sepet boşaltılır (header rozeti kaybolur) ve odak başlığa taşınır.
   - Kayıt yalnızca bellekte olduğu için sayfa yenilendiğinde, onay adresi doğrudan açıldığında ya da geri/ileri ile dönüldüğünde onay gösterilmez; ana sayfaya yönlenilir.

### Teslimat formu

| Alan | Zorunlu | Kural | Klavye / otomatik doldurma |
| ---- | ------- | ----- | -------------------------- |
| Ad soyad | Evet | En az 3 karakter, en az iki kelime | `autocomplete="name"` |
| Telefon | Evet | Türkiye numarası: `0532 123 45 67`, `+90 532 123 45 67`, `0090…`, `532…`, `(0212) …`; boşluk, tire, nokta ve parantez yok sayılır. Ulusal 10 hane; 2–5 veya 8 ile başlar | `type="tel"`, `autocomplete="tel"` |
| E-posta | Evet | `ad@alan.uzantı`, uzantı en az 2 karakter, en fazla 254 karakter | `type="email"`, `autocomplete="email"` |
| İl | Evet | 81 ilden biri (`src/content/provinces.ts`, plaka kodlarıyla; değer koddur) | `autocomplete="shipping address-level1"` |
| İlçe | Evet | En az 2 karakter | `autocomplete="shipping address-level2"` |
| Açık adres | Evet | En az 10 karakter | `autocomplete="shipping street-address"` |
| Posta kodu | Hayır | 5 hane, ilk iki hane 01–81 | `inputmode="numeric"`, `autocomplete="shipping postal-code"` |
| Sipariş notu | Hayır | En fazla 500 karakter | — |
| Bilgilendirme onayı | Evet | İşaretli olmalı (metin "örnek metin" olarak belirtilir) | — |

- Kurallar `src/lib/checkoutValidation.ts` içinde saf işlevlerdir ve birim testleri vardır. Hata türleri (`required` / `invalid`) koddur; mesajlar içerik kaynağındadır.
- Hatalar ilk gönderim denemesinden sonra gösterilir ve yazdıkça güncellenir. Her hata mesajı alanın altında durur ve `aria-describedby` ile alana bağlıdır; hatalı alan `aria-invalid` taşır.
- Gönderimde hata varsa odak ilk hatalı alana gider ve formun altında hatalı alan sayısı yazılır.
- Çift tıklama ya da art arda Enter siparişi iki kez işlemez; gönder butonu ilk geçerli gönderimde devre dışı kalır.
- Ödeme bölümünde yalnızca "Ödeme adımı konsept sitede yer almaz." bilgisi vardır. Kart, son kullanma tarihi, güvenlik kodu, IBAN, kupon, üyelik veya fatura alanı yoktur.

### Kişisel veri

- Form değerleri yalnızca form bileşeninin belleğinde tutulur. Depolamaya, adres çubuğuna, tarayıcı geçmişi durumuna (`history.state`) veya loga yazılmaz; hiçbir yere gönderilmez. Onay ekranına yalnızca ürünler ve toplamlar aktarılır.
- Tarayıcının kendi otomatik doldurma özelliği, kullanıcının izniyle değerleri tarayıcıda saklayabilir; bu sitenin denetiminde değildir.

### Bilinen sınırlar

- Chromium tabanlı tarayıcılarda yerleşik il listesinde harf yazarak arama "İ" ile başlayan illeri (İstanbul, İzmir) küçük "i" ile bulmuyor; ok tuşlarıyla ya da büyük "I" yazarak seçilebiliyor. Mobilde sistem seçicisi kullanıldığından etkilenmez.

## Adres Yapısı

Adresler `src/routes/paths.ts` içinde sabit olarak tutulur.

| Adres | Sayfa |
| ----- | ----- |
| `/` | Ana sayfa |
| `/urunler` | Ürünler; filtre, arama ve sıralama sorgu parametrelerinde (aşağıda) |
| `/urunler/:slug` | Ürün detayı (örn. `/urunler/tek-dal-vazo`); veride olmayan slug 404 gösterir |
| `/sepet` | Sepet |
| `/siparis` | Sipariş: teslimat formu ve sipariş özeti |
| `/siparis/onay` | Sipariş onayı; yalnızca geçerli gönderimden hemen sonra gösterilir, aksi halde ana sayfaya yönlenir |
| Diğer tüm adresler | 404 — Sayfa bulunamadı |

- Sayfa değişince görünüm en üste kayar (geri/ileri gezinmede önceki konum korunur), sekme başlığı `Sayfa adı | Toprana` biçiminde ve açıklama meta etiketi sayfaya göre güncellenir (`usePageMeta`). Ürün detayında başlık ürün adı, açıklama ürünün kısa açıklamasıdır; diğer sayfalarda `index.html` ile aynı varsayılan açıklama kullanılır.
### Ürün detayı sayfası

- Ürün adresteki slug ile bulunur; sayfa içindeki tüm eşleştirmeler (kategori, benzer ürünler) id ile yapılır. Slug veride yoksa 404 görünümü ve başlığı gösterilir.
- Yerleşim: `md` (768 px) ve üstünde solda galeri, sağda ürün bilgileri; daha dar ekranlarda önce galeri, altında bilgiler.
- Yol göstergesi: Ana sayfa › Ürünler › Kategori › Ürün adı. Kategori bağlantısı Ürünler sayfasını o kategoriyle filtreli açar (örn. `/urunler?kategori=vazo`).
- Galeri: ana görsel öncelikli yüklenir (`fetchpriority="high"`, boyutlu, kare alan). Küçük görseller fare, dokunma ve klavyeyle seçilir. Klavyede şerit tek sekme durağıdır; oklar, Home ve End ile gezinilir. Seçili görsel çerçeveyle ve `aria-current` ile belirtilir, değişim ekran okuyucuya duyurulur. Üründe tek görsel varsa şerit gösterilmez.
- Stok durumu her zaman metin ve simgeyle gösterilir; renk tek başına bilgi taşımaz.
- Satın alma alanı: adet seçimi (azalt / artır / doğrudan yazma, 1–10) ve "Sepete ekle" butonu. Ekleme sonrası görünür ve ekran okuyucuya duyurulan bir onay ile "Sepete git" bağlantısı gösterilir. Sepetteki adetle birlikte 10 aşılacaksa yalnızca sığan kadarı eklenir ve bu açıkça yazılır. Tükenen üründe buton yerine "Tükendi" kutusu görünür.
- Ayrıntılar: uzun açıklama, el yapımı ürünlerdeki küçük farklılıklara dair not ve özellikler listesi (ölçü, hacim, ağırlık, bakım).
- Benzer ürünler: aynı kategoriden, ürünün kendisi hariç, önerilen sırayla en fazla 4 ürün (`getRelatedProducts`). Kart bileşeni Ürünler sayfasıyla ortaktır. Her kategoride 3 ürün olduğundan şu an her detayda 2 benzer ürün görünür.

### Ürünler sayfası sorgu parametreleri

| Parametre | Değer | Örnek |
| --------- | ----- | ----- |
| `kategori` | Kategori slug'ı; birden çok kez yazılabilir | `kategori=vazo&kategori=dekor` |
| `min`, `max` | Tam lira (kuruşa çevrilerek uygulanır) | `min=300&max=1200` |
| `q` | Arama metni (en çok 100 karakter) | `q=kase` |
| `sirala` | `onerilen` (varsayılan), `fiyat-artan`, `fiyat-azalan`, `en-yeni` | `sirala=fiyat-artan` |

- Varsayılan değerler adrese yazılmaz; filtresiz sayfa yalnızca `/urunler` olur.
- Her filtre değişikliği yeni bir geçmiş kaydı ekler; geri tuşu bir önceki filtre durumuna döner. Arama, yazmaya 400 ms ara verilince ya da Enter'a basılınca adrese yazılır. Görünümü değiştirmeyen güncellemeler geçmişe eklenmez.
- Geçersiz değerler güvenli varsayılana döner: tanınmayan kategori, sayı olmayan ya da negatif fiyat, bilinmeyen sıralama yok sayılır. `min` değeri `max` değerinden büyükse ikisi yer değiştirir.
- Arama ürün adı, kategori adı ve kısa açıklamada yapılır. Büyük/küçük harf ve Türkçe karakter farklarına duyarsızdır (`FİNCAN` = `fincan` = `FINCAN`, `corba` = `çorba`). Aranan her kelime metindeki bir kelimenin başıyla eşleşmelidir: `kase`, "Kasesi"yi bulur; `nar`, "kenarlı"yı bulmaz.
- Önerilen sıralama: öne çıkan ürünler önce, sonra veri kaynağındaki sıra.

- Netlify'da tüm adresler `index.html`'e yönlendirilir (`netlify.toml`); 404 sayfasını uygulama gösterir. Bu nedenle bilinmeyen adresler HTTP 200 ile döner. 404 sayfası `noindex` taşır.
- Sepet, Sipariş, sipariş onayı, 404 ve hata sayfası `<meta name="robots" content="noindex">` ile arama motorlarına kapalıdır. `robots.txt` bu sayfaları engellemez; engellerse arama motoru `noindex` etiketini okuyamaz.

### Dosya adresleri ve 404

SPA kuralı (`/*` → `index.html`, 200) diskte karşılığı olmayan her adrese HTML döndürdüğü için, dosya bekleyen istemciler (tarayıcı, arama motoru, Lighthouse gibi ajan denetimleri) HTML'i dosya sanıyordu. `netlify.toml`'da SPA kuralından **önce** gelen kurallar, aşağıdaki adreslerde dosya yoksa düz metin gövdeyle (`/404.txt`) **404** döndürür. Kurallar `force` olmadan yazıldığı için dosya eklendiğinde dosyanın kendisi sunulur.

| Adres | Durum |
| ----- | ----- |
| `/robots.txt` | 200, `text/plain; charset=utf-8` |
| `/favicon.svg` | 200, `image/svg+xml` |
| `/og/toprana-paylasim.png` | 200, `image/png` |
| `/llms.txt`, `/llms-full.txt` | 404 (llms.txt yayın adresi belli olunca eklenecek) |
| `/ai-catalog.json`, `/.well-known/*` (ör. `ai-catalog.json`, `ard.json`, `security.txt`) | 404 (sitenin ajanlara sunduğu bir araç, API veya katalog yok; uydurma dosya eklenmez) |
| `/sitemap.xml` | 404 (yayın adresi belli olunca eklenecek) |
| `/favicon.ico`, `/apple-touch-icon.png`, `/apple-touch-icon-precomposed.png` | 404 |
| `/assets/*`, `/fonts/*`, `/images/*`, `/og/*` altında olmayan dosya | 404 (eski JS parçası istenirse uygulama "Sayfa yüklenemedi" ekranını gösterir) |
| Uygulama adresleri (`/`, `/urunler`, `/urunler/:slug`, `/sepet`, `/siparis`, bilinmeyen sayfalar) | 200, `index.html`; 404 sayfasını uygulama gösterir |

Kurallar Netlify CLI'nin yerel sunucusuyla (`netlify serve --offline`) doğrulandı; Lighthouse Agentic Browsing kategorisi bu sunucuda 50'den 100'e çıktı (`llms-txt` ve `ard-schema` artık "uygulanamaz").
- Her sayfanın kendine özgü başlığı ve açıklama meta etiketi vardır (`usePageMeta`). `index.html` başlık ve açıklaması ana sayfanınkiyle aynıdır ve Open Graph / Twitter kart etiketlerini (paylaşım görseli: `public/og/toprana-paylasim.png`, 1200 × 630) taşır.
- Canonical bağlantı ve site haritası, yayın adresi belli olmadığı için henüz eklenmedi (bkz. Kalite Denetimi > Açık konular).
- Kurgusal ürünler ve marka için yapılandırılmış veri (Product, Offer, Organization, LocalBusiness) bilerek eklenmez.

## Kalite Denetimi ve Lighthouse

### Ölçüm koşulları

- Lighthouse 13.5.0, varsayılan **mobil** profil: Moto G Power emülasyonu, simüle yavaş 4G ve 4× CPU yavaşlatma.
- Hedef: `npm run build` + `vite preview` (yerel, sıkıştırmalı). Netlify'ın CDN'i, HTTP/2 ve önbellek başlıkları ölçüme dahil değil.
- Sepet ve Sipariş, sepette iki ürün (Kiremit Sırlı Kupa ×2, Tek Dal Vazo ×1) varken ölçüldü.
- Her sayfa 3 kez ölçüldü; tabloda ortanca değerler var. Lighthouse bu projeye bağımlılık olarak eklenmedi; tek seferlik çalıştırıldı.

### Puanlar (Performance / Accessibility / Best Practices / SEO)

| Sayfa | Önce | Sonra | LCP (sonra) | CLS |
| ----- | ---- | ----- | ----------- | --- |
| Ana sayfa | 97 / 100 / 100 / 92 | 97 / 100 / 100 / 100 | 2,3 sn | 0 |
| Ürünler | 100 / 100 / 100 / 92 | 100 / 100 / 100 / 100 | 1,2 sn | 0 |
| Ürün detayı (`/urunler/kiremit-sirli-kupa`) | 100 / 100 / 100 / 92 | 100 / 100 / 100 / 100 | 1,2 sn | 0 |
| Sepet | 100 / 100 / 100 / 91 | 100 / 100 / 100 / **63** | 1,2 sn | 0 |
| Sipariş | 100 / 100 / 100 / 91 | 100 / 100 / 100 / **63** | 1,2 sn | 0 |

- Önceki SEO kaybı: `robots.txt` yoktu. SPA yönlendirmesi bu adreste HTML döndürüyordu.
- Sepet ve Sipariş'teki SEO 63 **beklenen** bir sonuç: bu sayfalar bilerek `noindex` taşıyor ve Lighthouse "sayfa dizine eklenebilir" denetimini başarısız sayıyor. Diğer SEO denetimleri bu sayfalarda da geçiyor.
- Ana sayfanın LCP öğesi hero illüstrasyonu. Görsel, sayfa parçası çalıştıktan sonra keşfediliyor; puan 97–98 aralığında.

### Paket boyutları (`npm run build`, sıkıştırılmamış / gzip)

| Dosya | Boyut | Ne zaman yüklenir |
| ----- | ----- | ----------------- |
| `index-*.js` (React, React Router, içerik, sepet) | 354,4 KB / 112,7 KB | Her sayfada |
| `index-*.css` | 31,8 KB / 6,7 KB | Her sayfada |
| `HomePage` | 6,9 KB / 2,0 KB | Ana sayfa |
| `ProductsPage` | 7,9 KB / 2,5 KB | Ürünler |
| `ProductDetailPage` | 8,2 KB / 2,9 KB | Ürün detayı |
| `CartPage` | 7,8 KB / 2,4 KB | Sepet |
| `checkoutRoutes` (Sipariş + onay) | 13,8 KB / 4,4 KB | Sipariş |
| `NotFoundPage` | 0,6 KB / 0,4 KB | 404 |
| Ortak küçük parçalar (`ProductCard`, `QuantityInput`, `money`) | 0,6–4,1 KB | Gerektiğinde |

Kod bölmeden önce tek dosya 391 KB idi; şimdi her sayfa ana dosya + kendi parçasıyla 356–361 KB yükler. Ana dosyanın büyük kısmı React ve React Router'dır.

### Denetim bulguları

**Critical:** yok.

**High (düzeltildi)**
1. Fiyat filtresine çok büyük bir sayı (örn. 20 haneli) yazılınca `liraToKurus` hata fırlatıyor ve hata yakalanmıyordu. Artık adres parametreleriyle aynı `parseLira` işlevi kullanılıyor; geçersiz değer yok sayılıyor ve kutularda `max` sınırı var.
2. Footer'daki bağlantıların odak çizgisi koyu zeminde 2,68:1 kontrasttaydı (gerekli 3:1). Footer'da odak çizgisi artık krem (13,2:1).
3. Sayfa değişiminde odak taşınmıyor, yeni sayfa duyurulmuyordu. Artık odak ana içeriğe gidiyor ve sayfa başlığı canlı bölgeyle duyuruluyor. Sayfa odağı kendisi yönetiyorsa (sipariş onayı) dokunulmuyor; filtre değişiminde odak yerinde kalıyor.

**Medium (düzeltildi)**
1. 44 px'ten küçük dokunma hedefleri: footer'daki "Sepet" bağlantısı, yol göstergesindeki kısa kategori adları, Sepet satırlarındaki ürün adı bağlantısı (23 px yükseklik) ve siparişteki onay kutusu (24 px). Onay kutusunun etiketi artık kutuyu sarıyor.
2. Sayfa bazlı kod bölme yoktu. Her sayfa artık ayrı parça; ilk açılışta yer tutucu, geçişlerde 200 ms gecikmeli ilerleme çubuğu ve ekran okuyucu metni var.
3. Sayfa parçası yüklenemezse (örn. yeni yayından sonra eski dosya) ham hata ekranı çıkacaktı. Artık header ve footer'lı bir hata sayfası gösteriliyor; "Sayfayı yenile" seçeneği var ve hata loga yazılıyor.
4. Ürünler, Sepet, Sipariş ve 404 aynı varsayılan açıklamayı kullanıyordu; her sayfaya özgü açıklama eklendi. Paylaşım etiketleri ve `robots.txt` yoktu.
5. Sipariş onayı ayrı parça olsaydı geçerli gönderimde bir ağ isteği (JS parçası) yapılacaktı. Sipariş ve onay aynı parçada paketlendi.

**Low (düzeltildi)**
1. 404 sayfası "yer tutucu" adlı bir bileşen ve `placeholder` alanı kullanıyordu. Bileşen kaldırıldı, alan `description` oldu.
2. `formatPrice` lirayı `Math.trunc(kuruş / 100)` ile buluyordu; tam sayı aritmetiğine çevrildi (sonuç aynı).
3. Kullanılmayan `defaultMetaDescription` içerik alanı kaldırıldı.

**Low (açık, öneri)**
1. `useCart` her çağrıda satırları ve özeti hesaplıyor; sepete bağlı her bileşen (header rozeti, kayıt düzeltme bilgisi, sepete ekle) sepet değişince yeniden çiziliyor. Sayfa içeriği yeniden çizilmiyor (doğrulandı). Gerekirse yalnızca `issues` ya da toplam adedi okuyan seçici kancalar eklenebilir.
2. Ana parçanın ~48 KB'ı açılışta kullanılmıyor; büyük kısmı React Router. Kütüphane değişmeden azaltılamaz.
3. Hero görseli, sayfa parçası çalıştıktan sonra keşfediliyor. Yalnızca ana sayfada geçerli bir ön yükleme, sunucu tarafı çizim olmadan yapılamaz.
4. Chromium'un yerleşik il listesinde harfle arama küçük "i" ile İstanbul/İzmir'i bulmuyor (bkz. Sipariş > Bilinen sınırlar).
5. `kiremit-500` belirteci yalnızca dekoratif amaçla tanımlı; şu an kullanılmıyor.

### Açık konular (karar bekleyen)

- **Yayın adresi:** Canonical bağlantı, site haritası (`/`, `/urunler` ve 12 ürün detayı) ve `og:image` / `og:url` için tam adres gerekiyor; adres belli olunca eklenecek.
- **Content-Security-Policy:** Eklenmedi; onay bekliyor. Uygulama satır içi betik, satır içi stil ve dış kaynak kullanmadığı için `default-src 'self'; img-src 'self' data:; object-src 'none'; base-uri 'self'; frame-ancestors 'none'` gibi sıkı bir politika uygun görünüyor; eklenmeden önce tüm sayfalarda denenmeli.
- **llms.txt:** Yayın adresi gerektiriyor (belirtim bağlantıları tam URL olarak bekler); adres belli olunca kökten sunulacak. O zamana kadar `/llms.txt` 404 döner.
- Netlify'ın yerel sunucusunda güvenlik başlıkları ve yönlendirme kuralları doğrulandı. `Cache-Control` başlıklarını yerel sunucu kendisi yazdığı için önbellek kuralları yalnızca canlı yayında doğrulanabilir.

## Klasör Düzeni

```
.
├── index.html               # Uygulama kabuğu: dil, başlık, meta etiketleri, font preload
├── netlify.toml             # Build, Node sürümü, SPA yönlendirmesi, önbellek başlıkları
├── public/
│   ├── favicon.svg
│   ├── robots.txt
│   ├── 404.txt              # Var olmayan dosya adreslerinin 404 gövdesi (düz metin)
│   ├── og/                  # Paylaşım görseli (1200 × 630 PNG)
│   ├── fonts/               # Kendi sunucumuzdan sunulan woff2 dosyaları ve OFL lisansları
│   └── images/              # Özgün SVG illüstrasyonlar: urunler/ ve ana-sayfa/
├── scripts/
│   ├── illustration-style.mjs       # İllüstrasyonların ortak tarzı
│   ├── product-drawings.mjs         # Ürün çizimleri
│   ├── generate-product-images.mjs  # Ürün illüstrasyonlarını üretir
│   └── generate-home-images.mjs     # Ana sayfa illüstrasyonlarını üretir
└── src/
    ├── main.tsx             # Giriş noktası
    ├── router.tsx           # Sayfa yönlendirme tanımı
    ├── routes/paths.ts      # Adres sabitleri
    ├── config/shop.ts       # Mağaza kuralları: kargo ücreti, ücretsiz kargo eşiği, adet sınırları (kuruş)
    ├── cart/                # Sepet deposu (cartStore), CartProvider, useCart / useCartActions
    ├── checkout/            # Onay ekranı için bellekteki tek kullanımlık kayıt
    ├── content/             # Tek içerik kaynağı: site metinleri (site.ts), ürün ve kategori verisi (catalog.ts), 81 il (provinces.ts), tipler (types.ts)
    ├── lib/                 # Arayüzden bağımsız saf işlevler ve birim testleri (*.test.ts):
    │                        #   money (kuruş → ₺), search (Türkçe duyarsız arama),
    │                        #   catalog (filtre, sıralama), productQuery (adres parametreleri),
    │                        #   cart (sepet işlemleri ve hesaplar), cartStorage (saklama ve doğrulama),
    │                        #   checkoutValidation (sipariş formu kuralları)
    ├── components/
    │   ├── layout/          # RootLayout (odak ve duyuru, yükleniyor çubuğu), AppShell, PageLoadingFallback, Header, Footer
    │   ├── products/        # ProductCard, StockBadge, FilterPanel, ProductToolbar, ActiveFilters
    │   ├── product-detail/  # ProductDetail, ProductGallery, StockStatus, Breadcrumb, AddToCart
    │   ├── cart/            # QuantityInput, CartLineItem, CartSummary, ClearCartDialog, CartNotice
    │   ├── home/            # HomeHero, CategoryGrid, FeaturedProducts, WorkshopSection, ValuesStrip, ClosingCta
    │   ├── checkout/        # DeliveryForm, OrderSummary
    ├── hooks/               # usePageMeta, useProductQuery
    ├── pages/               # Her adres için bir sayfa bileşeni (her biri ayrı parça); RouteErrorPage, checkoutRoutes (sipariş + onay aynı parçada)
    └── styles/index.css     # Tailwind teması: tasarım belirteçleri ve @font-face
```

## Yol Haritası

1. Dokümanlar
2. İskelet, tasarım sistemi, sayfa yönlendirme, Netlify ayarı
3. Ürün verisi ve Ürünler sayfası
4. Ürün detayı
5. Sepet
6. Ana sayfa
7. Sipariş adımı
8. Cila, erişilebilirlik, SEO, performans
9. Yayın
