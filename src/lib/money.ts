const wholeLira = new Intl.NumberFormat('tr-TR', {
  style: 'currency',
  currency: 'TRY',
  maximumFractionDigits: 0,
})

const withKurus = new Intl.NumberFormat('tr-TR', {
  style: 'currency',
  currency: 'TRY',
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
})

function assertKurus(kurus: number): void {
  if (!Number.isSafeInteger(kurus) || kurus < 0) {
    throw new RangeError(`Geçersiz kuruş değeri: ${kurus}`)
  }
}

/**
 * Kuruşu Türk lirası biçiminde gösterir: 42000 → "₺420", 42050 → "₺420,50".
 * Bölme yapılmaz; tutar ondalık metin olarak biçimlendiriciye verilir, böylece kayan nokta hatası oluşmaz.
 */
export function formatPrice(kurus: number): string {
  assertKurus(kurus)
  const rest = kurus % 100
  const lira = (kurus - rest) / 100
  if (rest === 0) return wholeLira.format(`${lira}`)
  return withKurus.format(`${lira}.${String(rest).padStart(2, '0')}` as Intl.StringNumericLiteral)
}

/** Tam lirayı kuruşa çevirir. */
export function liraToKurus(lira: number): number {
  if (!Number.isSafeInteger(lira) || lira < 0) {
    throw new RangeError(`Geçersiz lira değeri: ${lira}`)
  }
  return lira * 100
}

/** Kuruşu tam liraya çevirir; küsurat aşağı yuvarlanır. */
export function kurusToWholeLira(kurus: number): number {
  assertKurus(kurus)
  return (kurus - (kurus % 100)) / 100
}
