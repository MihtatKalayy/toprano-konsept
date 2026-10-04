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
- Sepet tarayıcı depolamasında **sürüm numaralı bir anahtarla** saklanır. Yapı değişirse sürüm artar; eski veri güvenli şekilde dönüştürülür veya temizlenir.
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

- Görseller `scripts/generate-product-images.mjs` ile üretilir (`node scripts/generate-product-images.mjs`). Her ürün için iki görsel vardır: `-1.svg` genel görünüm, `-2.svg` yakın görünüm. Görsel değişirse dosya adı da değiştirilmeli; `/images` altı uzun süre önbelleğe alınabilir.
- Her görselin `width`/`height` değeri (800 × 800) veride tutulur ve `<img>` etiketine yazılır; kart görsel alanı `aspect-square` olduğu için yüklenirken düzen kaymaz.
- Ürün listesinde ilk 2 kartın görseli hemen, diğerleri tembel (`loading="lazy"`) ve `decoding="async"` ile yüklenir.
- Her görselin veride açıklayıcı bir alt metni vardır. Ürün kartında ad zaten yazılı olduğundan görsel orada süs niteliğindedir (`alt=""`); alt metinler ürün detay sayfasının galerisinde kullanılır.

| Görsel | Kullanıldığı yer | Kaynak | Lisans |
| ------ | ---------------- | ------ | ------ |
| Logo işareti ve favicon (sade kâse çizimi) | Header, `public/favicon.svg` | Özgün SVG, bu projede çizildi | Proje ile birlikte |
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

## Adres Yapısı

Adresler `src/routes/paths.ts` içinde sabit olarak tutulur.

| Adres | Sayfa |
| ----- | ----- |
| `/` | Ana sayfa |
| `/urunler` | Ürünler; filtre, arama ve sıralama sorgu parametrelerinde (aşağıda) |
| `/urunler/:slug` | Ürün detayı (örn. `/urunler/tek-dal-vazo`); veride olmayan slug 404 gösterir |
| `/sepet` | Sepet |
| `/siparis` | Sipariş |
| Diğer tüm adresler | 404 — Sayfa bulunamadı |

- Sayfa değişince görünüm en üste kayar (geri/ileri gezinmede önceki konum korunur), sekme başlığı `Sayfa adı | Toprana` biçiminde ve açıklama meta etiketi sayfaya göre güncellenir (`usePageMeta`). Ürün detayında başlık ürün adı, açıklama ürünün kısa açıklamasıdır; diğer sayfalarda `index.html` ile aynı varsayılan açıklama kullanılır.
### Ürün detayı sayfası

- Ürün adresteki slug ile bulunur; sayfa içindeki tüm eşleştirmeler (kategori, benzer ürünler) id ile yapılır. Slug veride yoksa 404 görünümü ve başlığı gösterilir.
- Yerleşim: `md` (768 px) ve üstünde solda galeri, sağda ürün bilgileri; daha dar ekranlarda önce galeri, altında bilgiler.
- Yol göstergesi: Ana sayfa › Ürünler › Kategori › Ürün adı. Kategori bağlantısı Ürünler sayfasını o kategoriyle filtreli açar (örn. `/urunler?kategori=vazo`).
- Galeri: ana görsel öncelikli yüklenir (`fetchpriority="high"`, boyutlu, kare alan). Küçük görseller fare, dokunma ve klavyeyle seçilir. Klavyede şerit tek sekme durağıdır; oklar, Home ve End ile gezinilir. Seçili görsel çerçeveyle ve `aria-current` ile belirtilir, değişim ekran okuyucuya duyurulur. Üründe tek görsel varsa şerit gösterilmez.
- Stok durumu her zaman metin ve simgeyle gösterilir; renk tek başına bilgi taşımaz.
- Satın alma alanı: adet seçimi ve "Sepete ekle" butonu Sepet adımında gelecek. Şimdilik bu alanda yalnızca bilgi notu var, çalışmayan buton yok. Tükenen üründe bu alanda "Tükendi" kutusu görünür.
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

- Netlify'da tüm adresler `index.html`'e yönlendirilir (`netlify.toml`); 404 sayfasını uygulama gösterir. Bu nedenle bilinmeyen adresler HTTP 200 ile döner.

## Klasör Düzeni

```
.
├── index.html               # Uygulama kabuğu: dil, başlık, meta etiketleri, font preload
├── netlify.toml             # Build, Node sürümü, SPA yönlendirmesi, önbellek başlıkları
├── public/
│   ├── favicon.svg
│   ├── fonts/               # Kendi sunucumuzdan sunulan woff2 dosyaları ve OFL lisansları
│   └── images/urunler/      # Özgün SVG ürün illüstrasyonları
├── scripts/
│   └── generate-product-images.mjs  # Ürün illüstrasyonlarını üretir
└── src/
    ├── main.tsx             # Giriş noktası
    ├── router.tsx           # Sayfa yönlendirme tanımı
    ├── routes/paths.ts      # Adres sabitleri
    ├── content/             # Tek içerik kaynağı: site metinleri (site.ts), ürün ve kategori verisi (catalog.ts), tipler (types.ts)
    ├── lib/                 # Arayüzden bağımsız saf işlevler ve birim testleri (*.test.ts):
    │                        #   money (kuruş → ₺), search (Türkçe duyarsız arama),
    │                        #   catalog (filtre, sıralama), productQuery (adres parametreleri)
    ├── components/
    │   ├── layout/          # RootLayout, Header, Footer
    │   ├── products/        # ProductCard, StockBadge, FilterPanel, ProductToolbar, ActiveFilters
    │   ├── product-detail/  # ProductDetail, ProductGallery, StockStatus, Breadcrumb
    │   └── PagePlaceholder.tsx
    ├── hooks/               # usePageMeta, useProductQuery
    ├── pages/               # Her adres için bir sayfa bileşeni
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
