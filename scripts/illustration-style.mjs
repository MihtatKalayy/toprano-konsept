// Toprana illüstrasyonlarının ortak tarzı: renk paleti, benek dokusu, gölge ve kaide.
// Ürün ve ana sayfa görselleri bu modülü kullanır; böylece tüm görseller aynı tarzda kalır.
export const C = {
  bg1: '#EFE6D6', bg2: '#F4DCCF', plinth: '#E2D5BF', shadow: '#24282C',
  kiremit: '#A84E2C', kiremitLight: '#C2603A', kiremitDark: '#8E3F23',
  krem: '#F7F1E6', clay: '#D9B99B', clayDark: '#B98E6A',
  antrasit: '#3A4046', antrasitDark: '#24282C', sage: '#8FA58A', sageDark: '#6F8669',
  ege: '#4F7A8C', egeDark: '#3B5F6E', nar: '#9E2F2A', leaf: '#6F8669',
}
let seed = 1
/** Benek dokusu her çalıştırmada aynı çıksın diye rastgele sayı üreteci sabit bir tohumla başlatılır. */
export const setSeed = (value) => {
  seed = value
}
const rnd = () => ((seed = (seed * 16807) % 2147483647) / 2147483647)
export const speckle = (cx, cy, rx, ry, n, color, op = 0.35) => {
  let s = ''
  for (let i = 0; i < n; i++) {
    const a = rnd() * Math.PI * 2, r = Math.sqrt(rnd())
    s += `<circle cx="${(cx + Math.cos(a) * rx * r).toFixed(1)}" cy="${(cy + Math.sin(a) * ry * r).toFixed(1)}" r="${(1.5 + rnd() * 2).toFixed(1)}"/>`
  }
  return `<g fill="${color}" opacity="${op}">${s}</g>`
}
export const shadow = (cx, cy, rx) => `<ellipse cx="${cx}" cy="${cy}" rx="${rx}" ry="${rx * 0.16}" fill="${C.shadow}" opacity=".14"/>`
export const plinth = `<ellipse cx="400" cy="640" rx="300" ry="54" fill="${C.plinth}"/>`
