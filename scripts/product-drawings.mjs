// Ürün çizimleri: 800 × 800 koordinat düzleminde, ürün slug'ı ile anahtarlanmış.
import { C, plinth, shadow, speckle } from './illustration-style.mjs'

export const drawings = {
  'kiremit-sirli-kupa': () => `${plinth}${shadow(390, 622, 150)}
    <path d="M520 360c70 0 92 40 92 82s-30 86-102 86" fill="none" stroke="${C.kiremit}" stroke-width="34" stroke-linecap="round"/>
    <path d="M250 300h280v300a24 24 0 0 1-24 24H274a24 24 0 0 1-24-24Z" fill="${C.clay}"/>
    <path d="M250 300h280v170c-30 18-60 6-90 16s-60 30-100 14-60-4-90-10Z" fill="${C.kiremit}"/>
    <ellipse cx="390" cy="300" rx="140" ry="26" fill="${C.kiremitDark}"/><ellipse cx="390" cy="302" rx="122" ry="18" fill="#5c2817"/>
    <path d="M282 330v120" stroke="${C.kiremitLight}" stroke-width="14" stroke-linecap="round" opacity=".7"/>
    ${speckle(390, 560, 120, 50, 40, C.clayDark, 0.6)}`,
  'kum-tanesi-espresso-fincani': () => `${plinth}
    ${[250, 550].map((x) => `${shadow(x, 620, 120)}<ellipse cx="${x}" cy="600" rx="120" ry="26" fill="${C.krem}" stroke="${C.clayDark}" stroke-width="4"/>
    <path d="M${x + 62} 470c44 0 52 26 52 40s-16 40-60 40" fill="none" stroke="${C.krem}" stroke-width="18" stroke-linecap="round"/>
    <path d="M${x - 75} 440h150l-14 140a20 20 0 0 1-20 18h-82a20 20 0 0 1-20-18Z" fill="${C.krem}"/>
    <ellipse cx="${x}" cy="440" rx="75" ry="16" fill="${C.clay}"/><ellipse cx="${x}" cy="442" rx="62" ry="10" fill="#6b4a33"/>
    ${speckle(x, 520, 60, 60, 26, C.antrasit, 0.45)}`).join('')}`,
  'kulpsuz-cay-kasesi': () => `${plinth}${shadow(400, 626, 130)}
    <path d="M300 250h200l-16 350a24 24 0 0 1-24 22H340a24 24 0 0 1-24-22Z" fill="${C.clay}"/>
    <path d="M300 250h200l-10 230c-20 30-30-10-50 10s-30 40-60 6-40 10-66-20Z" fill="${C.sage}"/>
    <ellipse cx="400" cy="250" rx="100" ry="20" fill="${C.sageDark}"/><ellipse cx="400" cy="252" rx="86" ry="13" fill="#4f6149"/>
    <path d="M330 280v150" stroke="#b5c6b0" stroke-width="12" stroke-linecap="round" opacity=".7"/>
    ${speckle(400, 560, 80, 50, 30, C.clayDark, 0.6)}`,
  'ege-servis-tabagi': () => `${shadow(400, 600, 270)}
    <ellipse cx="400" cy="440" rx="300" ry="150" fill="${C.ege}"/>
    <ellipse cx="400" cy="430" rx="300" ry="150" fill="${C.egeDark}"/>
    <ellipse cx="400" cy="420" rx="290" ry="142" fill="${C.ege}"/>
    <ellipse cx="400" cy="425" rx="210" ry="100" fill="${C.krem}"/>
    <ellipse cx="400" cy="425" rx="210" ry="100" fill="none" stroke="${C.egeDark}" stroke-width="4" opacity=".5"/>
    <path d="M250 360c40-30 120-40 170-34" stroke="#ffffff" stroke-width="10" stroke-linecap="round" opacity=".5"/>
    ${speckle(400, 430, 180, 80, 40, C.clayDark, 0.5)}`,
  'derin-corba-kasesi': () => `${plinth}${shadow(400, 628, 170)}
    <path d="M190 360h420c0 150-90 260-210 260S190 510 190 360Z" fill="${C.antrasit}"/>
    <path d="M220 400c30 120 100 190 180 200" stroke="${C.antrasitDark}" stroke-width="12" fill="none" opacity=".5"/>
    <ellipse cx="400" cy="360" rx="210" ry="48" fill="${C.krem}"/>
    <ellipse cx="400" cy="368" rx="180" ry="34" fill="#e9dfcc"/>
    <path d="M270 600h260" stroke="${C.clay}" stroke-width="22" stroke-linecap="round"/>
    ${speckle(400, 368, 160, 26, 24, C.clayDark, 0.6)}`,
  'tatli-tabagi-seti': () => `${plinth}${shadow(400, 630, 230)}
    ${[600, 560, 520, 480].map((y, i) => `<ellipse cx="400" cy="${y + 10}" rx="240" ry="52" fill="${i % 2 ? C.clayDark : C.kiremitDark}"/><ellipse cx="400" cy="${y}" rx="240" ry="52" fill="${i % 2 ? C.clay : C.kiremit}"/>`).join('')}
    <ellipse cx="400" cy="482" rx="160" ry="30" fill="${C.kiremitLight}"/>
    ${speckle(400, 480, 200, 40, 30, C.krem, 0.5)}`,
  'govdeli-amfora-vazo': () => `${plinth}${shadow(400, 628, 160)}
    <path d="M350 150h100v40c0 30 30 40 60 80 60 80 70 200 10 290-20 30-50 60-120 60s-100-30-120-60c-60-90-50-210 10-290 30-40 60-50 60-80Z" fill="${C.kiremit}"/>
    <path d="M300 300c-30 60-40 140-10 220" stroke="${C.kiremitLight}" stroke-width="18" stroke-linecap="round" fill="none" opacity=".8"/>
    <path d="M262 400h276M258 440h284" stroke="${C.krem}" stroke-width="8" opacity=".85"/>
    <ellipse cx="400" cy="150" rx="58" ry="12" fill="${C.kiremitDark}"/><ellipse cx="400" cy="151" rx="42" ry="7" fill="#5c2817"/>
    ${speckle(400, 520, 110, 70, 30, C.kiremitDark, 0.5)}`,
  'tek-dal-vazo': () => `${plinth}${shadow(400, 626, 100)}
    <path d="M400 380C385 300 420 230 470 150" stroke="${C.leaf}" stroke-width="6" fill="none" stroke-linecap="round"/>
    ${[[452, 190, -30], [430, 240, 30], [412, 290, -35], [470, 165, 40]].map(([x, y, r]) => `<ellipse cx="${x}" cy="${y}" rx="26" ry="11" fill="${C.leaf}" transform="rotate(${r} ${x} ${y})"/>`).join('')}
    <path d="M380 370h40v40c0 20 70 50 70 120 0 60-40 92-90 92s-90-32-90-92c0-70 70-100 70-120Z" fill="${C.krem}"/>
    <path d="M340 480c-12 30-10 70 10 100" stroke="#ffffff" stroke-width="12" stroke-linecap="round" fill="none" opacity=".8"/>
    <ellipse cx="400" cy="370" rx="22" ry="6" fill="${C.clay}"/>
    ${speckle(400, 540, 70, 60, 34, C.antrasit, 0.4)}`,
  'antrasit-mat-vazo': () => `${plinth}${shadow(400, 628, 130)}
    <path d="M300 200h200l30 390a30 30 0 0 1-30 32H300a30 30 0 0 1-30-32Z" fill="${C.antrasit}"/>
    <path d="M320 230l-18 340" stroke="#50565d" stroke-width="22" stroke-linecap="round" opacity=".8"/>
    <ellipse cx="400" cy="200" rx="100" ry="20" fill="${C.antrasitDark}"/><ellipse cx="400" cy="201" rx="80" ry="12" fill="#15181a"/>
    <path d="M296 360h208" stroke="${C.kiremit}" stroke-width="6"/>
    ${speckle(400, 420, 90, 180, 40, C.krem, 0.18)}`,
  'mumluk-uclu-set': () => `${plinth}
    ${[[250, 470, 130, C.krem], [400, 400, 200, C.kiremit], [550, 500, 100, C.clay]].map(([x, top, h, col]) => `${shadow(x, 622, 80)}
    <path d="M${x} ${top - 60}c-14 22-14 40 0 48 14-8 14-26 0-48Z" fill="#E8A33D"/><path d="M${x} ${top - 12}v14" stroke="${C.antrasitDark}" stroke-width="4"/>
    <rect x="${x - 70}" y="${top}" width="140" height="${612 - top}" rx="16" fill="${col}"/>
    <ellipse cx="${x}" cy="${top}" rx="70" ry="14" fill="${col === C.kiremit ? C.kiremitDark : C.clayDark}"/>`).join('')}
    ${speckle(400, 540, 230, 50, 40, C.antrasit, 0.3)}`,
  'nar-desenli-duvar-tabagi': () => `${shadow(400, 690, 250)}
    <circle cx="400" cy="400" r="280" fill="${C.krem}"/>
    <circle cx="400" cy="400" r="280" fill="none" stroke="${C.kiremit}" stroke-width="22"/>
    <circle cx="400" cy="400" r="235" fill="none" stroke="${C.ege}" stroke-width="6"/>
    <circle cx="400" cy="420" r="110" fill="${C.nar}"/>
    <path d="M370 312l-14-34 30 16 14-30 14 30 30-16-14 34Z" fill="${C.nar}"/>
    <path d="M400 330c40 20 70 50 80 90" stroke="#c4483f" stroke-width="12" fill="none" stroke-linecap="round" opacity=".7"/>
    ${[[0, 0], [-40, 20], [40, 25], [-20, 60], [25, 65], [-55, -20], [50, -15]].map(([dx, dy]) => `<ellipse cx="${400 + dx}" cy="${430 + dy}" rx="9" ry="12" fill="${C.krem}" opacity=".85"/>`).join('')}
    <path d="M290 300c-30-40-80-40-110-20 40 10 70 30 110 20ZM510 300c30-40 80-40 110-20-40 10-70 30-110 20Z" fill="${C.leaf}"/>
    ${speckle(400, 400, 260, 260, 50, C.clayDark, 0.45)}`,
  'yaprak-taki-tabagi': () => `${shadow(400, 600, 230)}
    <path d="M150 470C230 280 470 220 650 300 600 470 390 580 150 470Z" fill="${C.sageDark}"/>
    <path d="M170 460C250 300 460 250 625 310 580 450 390 545 170 460Z" fill="${C.sage}"/>
    <path d="M170 460C320 400 470 340 625 310" stroke="${C.sageDark}" stroke-width="6" fill="none"/>
    ${[[280, 420, 250, 360], [380, 385, 360, 320], [480, 350, 470, 300], [330, 405, 370, 450], [440, 365, 480, 410]].map(([a, b, c, d]) => `<path d="M${a} ${b}L${c} ${d}" stroke="${C.sageDark}" stroke-width="4" opacity=".7"/>`).join('')}
    <circle cx="430" cy="380" r="16" fill="none" stroke="#E8A33D" stroke-width="5"/>
    ${speckle(400, 400, 200, 70, 30, C.krem, 0.4)}`,
}

// Yakın görünüm kırpmaları: [x, y, genişlik]
export const crops = {
  'kiremit-sirli-kupa': [200, 230, 440], 'kum-tanesi-espresso-fincani': [130, 380, 300], 'kulpsuz-cay-kasesi': [230, 200, 360],
  'ege-servis-tabagi': [180, 260, 380], 'derin-corba-kasesi': [190, 290, 360], 'tatli-tabagi-seti': [160, 420, 260],
  'govdeli-amfora-vazo': [230, 250, 340], 'tek-dal-vazo': [240, 290, 340], 'antrasit-mat-vazo': [240, 180, 340],
  'mumluk-uclu-set': [300, 280, 280], 'nar-desenli-duvar-tabagi': [240, 260, 320], 'yaprak-taki-tabagi': [230, 260, 320],
}
