# Toprana — konsept e-ticaret ön yüzü

> **Bu site bir konsept çalışmadır; gerçek satış yapılmaz.**
> Toprana, el yapımı seramik ürünler satan kurgusal bir atölyedir. Marka, ürünler, fiyatlar ve iletişim bilgileri gerçek değildir.

Portföy amaçlı bir e-ticaret ön yüzü: ürün listesi, filtreler, ürün detayı, sepet ve sipariş adımı. Backend yoktur.

Kapsam, mimari kararlar ve tasarım sistemi için [PROJE.md](PROJE.md), değişiklikler için [CHANGELOG.md](CHANGELOG.md) dosyasına bakın.

## Teknolojiler

React, TypeScript, Vite, Tailwind CSS, React Router. Yayın: Netlify.

## Gereksinimler

- Node.js 22.22 veya üzeri
- npm

## Kurulum ve çalıştırma

```bash
npm install        # bağımlılıkları kur
npm run dev        # geliştirme sunucusu (http://localhost:5173)
npm run build      # tip kontrolü + üretim build'i (dist/)
npm run preview    # üretim build'ini yerelde önizle (http://localhost:4173)
npm run lint       # ESLint
npm run typecheck  # yalnızca TypeScript tip kontrolü
npm test           # birim testleri (Vitest)
```
