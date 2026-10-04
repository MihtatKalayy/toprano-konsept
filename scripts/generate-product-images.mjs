// Toprana ürün illüstrasyonlarını üretir: tek tarz, düz renk, hafif benek dokusu.
// Çalıştırma: node scripts/generate-product-images.mjs (public/images/urunler altına yazar).
import { writeFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { C, setSeed } from './illustration-style.mjs'
import { crops, drawings } from './product-drawings.mjs'

const OUT = fileURLToPath(new URL('../public/images/urunler', import.meta.url))

for (const [slug, draw] of Object.entries(drawings)) {
  setSeed(slug.length * 7919)
  const body = draw().replace(/\n\s*/g, '')
  const full = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 800" width="800" height="800"><rect width="800" height="800" fill="${C.bg1}"/><g transform="translate(400 410) scale(1.28) translate(-400 -420)">${body}</g></svg>\n`
  const [x, y, w] = crops[slug]
  const close = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="${x} ${y} ${w} ${w}" width="800" height="800"><rect x="${x}" y="${y}" width="${w}" height="${w}" fill="${C.bg2}"/>${body}</svg>\n`
  writeFileSync(`${OUT}/${slug}-1.svg`, full)
  writeFileSync(`${OUT}/${slug}-2.svg`, close)
}
