// Ana sayfa illüstrasyonlarını üretir: hero kompozisyonu ve üretim sürecinin üç adımı.
// Ürün görselleriyle aynı tarzı kullanır. Çalıştırma: node scripts/generate-home-images.mjs
import { writeFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { C, plinth, setSeed, shadow, speckle } from './illustration-style.mjs'
import { drawings } from './product-drawings.mjs'

const OUT = fileURLToPath(new URL('../public/images/ana-sayfa', import.meta.url))
const flat = (markup) => markup.replace(/\n\s*/g, '')
const svg = (width, height, body) =>
  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${width} ${height}" width="${width}" height="${height}">${flat(body)}</svg>\n`

// Ürün çizimini (800 × 800) kendi kaidesi olmadan verilen merkeze ve ölçeğe yerleştirir; kaide sahnede ortaktır.
const place = (slug, cx, cy, scale) => {
  setSeed(slug.length * 7919)
  return `<g transform="translate(${cx} ${cy}) scale(${scale}) translate(-400 -460)">${drawings[slug]().replace(plinth, '')}</g>`
}

const hero = svg(1200, 900, `
  <rect width="1200" height="900" fill="${C.bg1}"/>
  <circle cx="860" cy="250" r="150" fill="${C.bg2}"/>
  <path d="M0 700h1200v200H0Z" fill="${C.plinth}"/>
  <ellipse cx="600" cy="705" rx="520" ry="70" fill="#d8c8ae"/>
  ${place('govdeli-amfora-vazo', 750, 440, 0.95)}
  ${place('tek-dal-vazo', 1030, 590, 0.62)}
  ${place('derin-corba-kasesi', 460, 610, 0.7)}
  ${place('kiremit-sirli-kupa', 180, 610, 0.56)}
`)

const shaping = svg(600, 450, `
  <rect width="600" height="450" fill="${C.bg1}"/>
  ${shadow(300, 400, 220)}
  <path d="M150 300h300l-30 90H180Z" fill="${C.antrasit}"/>
  <ellipse cx="300" cy="300" rx="190" ry="36" fill="${C.antrasitDark}"/>
  <ellipse cx="300" cy="292" rx="190" ry="36" fill="#50565d"/>
  <path d="M240 290c-6-60 10-110 20-150h80c10 40 26 90 20 150Z" fill="${C.clay}"/>
  <ellipse cx="300" cy="140" rx="40" ry="10" fill="${C.clayDark}"/>
  <path d="M262 170c-4 40-6 80-2 110M338 170c4 40 6 80 2 110" stroke="${C.clayDark}" stroke-width="5" fill="none" stroke-linecap="round" opacity=".6"/>
  <path d="M110 250a200 60 0 0 1 60-50M490 250a200 60 0 0 0-60-50" stroke="${C.kiremit}" stroke-width="8" fill="none" stroke-linecap="round"/>
  <path d="M160 196l14 6-12 10M440 196l-14 6 12 10" stroke="${C.kiremit}" stroke-width="8" fill="none" stroke-linecap="round" stroke-linejoin="round"/>
  ${speckle(300, 230, 45, 70, 22, C.clayDark, 0.6)}
`)

const glazing = svg(600, 450, `
  <rect width="600" height="450" fill="${C.bg1}"/>
  ${shadow(300, 410, 200)}
  <path d="M150 260h300l-24 140a16 16 0 0 1-16 14H190a16 16 0 0 1-16-14Z" fill="${C.antrasit}"/>
  <ellipse cx="300" cy="260" rx="150" ry="32" fill="${C.antrasitDark}"/>
  <ellipse cx="300" cy="264" rx="132" ry="24" fill="${C.sage}"/>
  <path d="M250 70h100v120a14 14 0 0 1-14 14h-72a14 14 0 0 1-14-14Z" fill="${C.clay}"/>
  <path d="M250 140h100v50a14 14 0 0 1-14 14h-72a14 14 0 0 1-14-14Z" fill="${C.sage}"/>
  <path d="M270 204v22M300 204v34M328 204v16" stroke="${C.sage}" stroke-width="9" stroke-linecap="round"/>
  <path d="M350 100c40 0 50 20 50 34s-14 34-50 34" stroke="${C.clay}" stroke-width="16" fill="none" stroke-linecap="round"/>
  <ellipse cx="300" cy="70" rx="50" ry="10" fill="${C.clayDark}"/>
  ${speckle(300, 110, 40, 30, 14, C.clayDark, 0.6)}
`)

const firing = svg(600, 450, `
  <rect width="600" height="450" fill="${C.bg1}"/>
  ${shadow(300, 410, 210)}
  <path d="M160 120a140 80 0 0 1 280 0v280H160Z" fill="${C.kiremitDark}"/>
  <path d="M180 130a120 66 0 0 1 240 0v250H180Z" fill="${C.kiremit}"/>
  <rect x="215" y="170" width="170" height="170" rx="14" fill="${C.antrasitDark}"/>
  <path d="M235 330c0-40 20-50 26-80 10 30 22 38 22 60 6-20 14-30 22-50 8 24 26 40 26 70Z" fill="#E8A33D"/>
  <path d="M260 330c0-20 10-26 14-40 6 16 12 22 12 40Z" fill="#F4C76B"/>
  <path d="M245 230h40v40h-40ZM315 220h40v50h-40Z" fill="${C.clay}" opacity=".9"/>
  <path d="M300 40v40M270 52l10 30M330 52l-10 30" stroke="${C.antrasit}" stroke-width="7" stroke-linecap="round" opacity=".5"/>
  <circle cx="455" cy="200" r="22" fill="${C.krem}" stroke="${C.antrasit}" stroke-width="5"/>
  <path d="M455 200l10-12" stroke="${C.kiremit}" stroke-width="5" stroke-linecap="round"/>
`)

const files = { 'atolye-hero.svg': hero, 'surec-sekillendirme.svg': shaping, 'surec-sirlama.svg': glazing, 'surec-firinlama.svg': firing }
for (const [name, content] of Object.entries(files)) writeFileSync(`${OUT}/${name}`, content)
