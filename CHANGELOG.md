# Değişiklik Günlüğü

Bu projedeki önemli değişiklikler bu dosyada tutulur.

## [Yayınlanmamış]

### Eklendi

- Ürün detay sayfası (Yol haritası adım 4): yol göstergesi (kategori bağlantısı filtreli Ürünler sayfasını açar), fare, dokunma ve klavyeyle kullanılan görsel galerisi, ad, kategori, fiyat, metin ve simgeli stok durumu, kısa açıklama, ileride sepet için ayrılmış alan ("Tükendi" bilgisi dahil), uzun açıklama, el yapımı notu, özellikler listesi ve aynı kategoriden benzer ürünler.
- Sayfaya göre güncellenen açıklama meta etiketi (`usePageMeta`); ürün detayında ürünün kısa açıklaması kullanılır.
- `getRelatedProducts` ve `productsPathForCategory` saf işlevleri ile galeri bileşeni için birim testleri.

- Ürün ve kategori verisi (`src/content/catalog.ts`): 4 kategoride 12 kurgusal ürün; sabit id, slug, kuruş cinsinden fiyat, açıklamalar, özellikler, stok durumu, alt metinli görseller, öne çıkan işareti ve eklenme tarihi (Yol haritası adım 3).
- 24 özgün SVG ürün illüstrasyonu (`public/images/urunler`) ve bunları üreten betik (`scripts/generate-product-images.mjs`).
- Saf yardımcı işlevler (`src/lib`): kuruşu ₺ biçiminde gösterme, Türkçe karakter ve büyük/küçük harf duyarsız arama, filtreleme, sıralama, adres parametrelerini okuma/yazma.
- Vitest ile birim testleri (`npm test`): yardımcı işlevler ve veri bütünlüğü.
- Ürünler sayfası: ürün kartları ve stok rozetleri; kategori, fiyat aralığı, arama ve sıralama; durum adres çubuğunda; ekran okuyucuya duyurulan sonuç sayısı, etkin filtre çipleri, "Filtreleri temizle", boş durum; mobilde açılır filtre paneli.
- Ürün detayı yer tutucusu adresteki slug'a karşılık gelen ürünün adını gösterir; ürün yoksa 404 görünümü açılır.
- Proje iskeleti: Vite, React, TypeScript, Tailwind CSS, React Router ve ESLint (Yol haritası adım 2).
- Tasarım sistemi: kiremit, krem ve antrasit renk belirteçleri, tek vurgu rengi; Fraunces (başlık) ve Source Sans 3 (gövde) fontları kendi sunucumuzdan, Türkçe karakter desteğiyle.
- Tek içerik kaynağı (`src/content`): marka, menü, footer, iletişim yer tutucuları, konsept ibaresi ve arayüz metinleri; TypeScript tipleriyle.
- Sayfa yönlendirme: Ana sayfa, Ürünler, Ürün detayı (`/urunler/:slug`), Sepet, Sipariş ve 404 için yer tutucu sayfalar; sayfa değişiminde en üste kaydırma ve sekme başlığı güncelleme.
- Ortak yerleşim: sabit header (logo, menü, sepet bağlantısı ve adet rozeti için yer, klavye ve ekran okuyucu uyumlu mobil menü), footer (konsept ibaresi dahil) ve "İçeriğe geç" bağlantısı.
- `netlify.toml`: build komutu, yayın dizini, Node sürümü, tek sayfa uygulaması yönlendirmesi ve önbellek başlıkları.
- `index.html`: Türkçe dil etiketi, başlık, açıklama, tema rengi ve SVG favicon.
- `README.md`: kurulum ve çalıştırma komutları.
- `PROJE.md`: tasarım sistemi (fontlar, renk kodları, kontrast oranları), adres yapısı ve klasör düzeni.
- `PROJE.md`: konsept özeti, stack, MVP kapsamı, kapsam dışı maddeler, mimari kararlar ve yol haritası (Yol haritası adım 1: dokümanlar).
- `CHANGELOG.md`: değişiklik günlüğü.

### Değişti

- `usePageTitle` kancası, açıklama meta etiketini de yönettiği için `usePageMeta` olarak yeniden adlandırıldı.
- `ProductCard` bileşenine başlık düzeyi seçeneği eklendi; benzer ürünlerde başlık sırası bozulmasın diye `h3` kullanılır. Ürünler sayfasındaki görünüm değişmedi.
