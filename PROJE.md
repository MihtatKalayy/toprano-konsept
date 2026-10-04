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

## Görsel Kaynakları ve Lisanslar

Ürün görselleri henüz eklenmedi; eklendikçe bu tabloya işlenecek.

| Görsel | Kullanıldığı yer | Kaynak | Lisans |
| ------ | ---------------- | ------ | ------ |
| Logo işareti ve favicon (sade kâse çizimi) | Header, `public/favicon.svg` | Özgün SVG, bu projede çizildi | Proje ile birlikte |

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
| `/urunler` | Ürünler (ileride filtre, sıralama ve arama sorgu parametreleriyle, örn. `/urunler?kategori=vazo`) |
| `/urunler/:slug` | Ürün detayı (örn. `/urunler/el-yapimi-kupa`) |
| `/sepet` | Sepet |
| `/siparis` | Sipariş |
| Diğer tüm adresler | 404 — Sayfa bulunamadı |

- Sayfa değişince görünüm en üste kayar (geri/ileri gezinmede önceki konum korunur) ve sekme başlığı `Sayfa adı | Toprana` biçiminde güncellenir.
- Netlify'da tüm adresler `index.html`'e yönlendirilir (`netlify.toml`); 404 sayfasını uygulama gösterir. Bu nedenle bilinmeyen adresler HTTP 200 ile döner.

## Klasör Düzeni

```
.
├── index.html               # Uygulama kabuğu: dil, başlık, meta etiketleri, font preload
├── netlify.toml             # Build, Node sürümü, SPA yönlendirmesi, önbellek başlıkları
├── public/
│   ├── favicon.svg
│   └── fonts/               # Kendi sunucumuzdan sunulan woff2 dosyaları ve OFL lisansları
└── src/
    ├── main.tsx             # Giriş noktası
    ├── router.tsx           # Sayfa yönlendirme tanımı
    ├── routes/paths.ts      # Adres sabitleri
    ├── content/             # Tek içerik kaynağı: site metinleri (site.ts) ve tipleri (types.ts)
    ├── components/
    │   ├── layout/          # RootLayout, Header, Footer
    │   └── PagePlaceholder.tsx
    ├── hooks/               # usePageTitle
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
