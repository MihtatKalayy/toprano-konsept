# Değişiklik Günlüğü

Bu projedeki önemli değişiklikler bu dosyada tutulur.

## [Yayınlanmamış]

### Eklendi

- Sipariş adımı (Yol haritası adım 7):
  - Konsept bilgi kutusu; teslimat formu (ad soyad, telefon, e-posta, 81 ilden seçim, ilçe, açık adres, posta kodu, not, örnek bilgilendirme onayı); ödeme yerine kısa bilgi.
  - Yalnızca ön yüzde doğrulama: alan altında Türkçe hata mesajları, `aria-describedby` ilişkisi ve gönderimde ilk hatalı alana odak.
  - Sepet hesaplarından gelen sipariş özeti ve "Sepeti düzenle"; boş sepette boş durum.
  - Ağ isteği yapmayan gönderim ve çift tıklama koruması.
  - Onay ekranı (`/siparis/onay`): teşekkür, konsept notu, özet; sepet boşalır, odak başlığa taşınır. Yenileme ya da doğrudan erişimde ana sayfaya yönlenir.
- 81 il listesi (`src/content/provinces.ts`, plaka kodlarıyla).
- Sipariş formu doğrulama işlevleri (`src/lib/checkoutValidation.ts`) ve birim testleri.
- Ana sayfa (Yol haritası adım 6):
  - hero (başlık, metin, "Ürünleri keşfet", öncelikli yüklenen illüstrasyon);
  - ürün kaynağından gelen 4 kategori kartı (filtreli Ürünler sayfasına gider);
  - öne çıkan ürünler ve "Tüm ürünleri gör";
  - atölye hikâyesi ve üretimin üç adımı;
  - kargo bilgisi sepet yapılandırmasından okunan değerler şeridi;
  - kapanış çağrısı;
  - ana sayfaya özel sekme başlığı ve açıklama meta etiketi.
- `getFeaturedProducts` ve `getCategoryShowcase` saf işlevleri ve birim testleri.
- 4 özgün SVG ana sayfa illüstrasyonu (`public/images/ana-sayfa`) ve bunları üreten betik (`scripts/generate-home-images.mjs`).
- Sepet (Yol haritası adım 5):
  - Saf sepet işlevleri: ekleme, adet belirleme, çıkarma, boşaltma. Ürün başına 1–10 adet; tükenen ve bilinmeyen ürün eklenemez.
  - Kuruş cinsinden hesaplar: satır toplamı, ara toplam, kargo, genel toplam, toplam adet.
  - Kargo kuralı ve adet sınırları tek yapılandırma dosyasında (`src/config/shop.ts`): ₺75 kargo, ₺1.500 ve üzeri ücretsiz.
- Sepetin kalıcı saklanması: `toprana.sepet` anahtarı, sürüm 1. Okurken doğrulama, geçersiz kayıtları ayıklama ve sınıra çekme; kullanıcıya bilgi ve loga uyarı. Depolama yoksa bellekte çalışma; sekmeler arası eşitleme.
- Sepet durumunu paylaşan `CartProvider`; ayrı okuma (`useCart`) ve değiştirme (`useCartActions`) kancaları.
- Ürün detayında adet seçimi ve "Sepete ekle": duyurulan onay, "Sepete git" bağlantısı, 10 adet sınırı bildirimi.
- Header'da toplam adet rozeti; bağlantının erişilebilir adı adedi de söyler.
- Sepet sayfası:
  - satırlar, adet seçimi, "Çıkar" ve özet (ara toplam, kargo, genel toplam, ücretsiz kargo bilgisi);
  - "Siparişi tamamla", "Alışverişe devam et" ve onaylı "Sepeti boşalt";
  - boş durum, ekran okuyucu duyuruları ve çıkarma sonrası odak yönetimi.
- Sepet işlemleri, saklama/doğrulama ve sepet deposu için birim testleri.
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

- İllüstrasyon betiği ortak tarz (`scripts/illustration-style.mjs`) ve ürün çizimleri (`scripts/product-drawings.mjs`) olarak ayrıldı; ürün görsellerinin çıktısı bayt bayt aynı kaldı.
- Ana sayfa yer tutucusu ve ona ait içerik metni kaldırıldı.
- `Header`: sabit 0 yerine sepetteki toplam adet kullanılır.
- `RootLayout`: içerik alanının başına kayıtlı sepet düzeltildiğinde gösterilen bilgi alanı (`CartNotice`) eklendi.
- `main.tsx`: uygulama `CartProvider` ile sarıldı.
- Ürün detayındaki satın alma yer tutucusu kaldırıldı; yerine adet seçimi ve "Sepete ekle" geldi.
- `PROJE.md` mimari kararında "sürüm numaralı anahtar" ifadesi, uygulanan yapıya göre "sabit anahtar ve içinde sürüm alanı" olarak netleştirildi.
- `usePageTitle` kancası, açıklama meta etiketini de yönettiği için `usePageMeta` olarak yeniden adlandırıldı.
- `ProductCard` bileşenine başlık düzeyi seçeneği eklendi; benzer ürünlerde başlık sırası bozulmasın diye `h3` kullanılır. Ürünler sayfasındaki görünüm değişmedi.
