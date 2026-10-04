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

Henüz görsel eklenmedi. Görseller eklendikçe bu tabloya işlenecek.

| Görsel | Kullanıldığı yer | Kaynak | Lisans |
| ------ | ---------------- | ------ | ------ |
| —      | —                | —      | —      |

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
