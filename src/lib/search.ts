/**
 * Arama için metni sadeleştirir: Türkçe kurallarıyla küçük harfe çevirir,
 * aksanları (ş, ğ, ü, ö, ç) kaldırır ve noktasız ı'yı i'ye eşler.
 * Böylece "FİNCAN", "FINCAN" ve "fincan" aynı sonuca varır.
 */
export function normalizeForSearch(text: string): string {
  return text
    .toLocaleLowerCase('tr')
    .normalize('NFD')
    .replace(/\p{M}/gu, '')
    .replace(/ı/g, 'i')
    .replace(/\s+/g, ' ')
    .trim()
}

const toWords = (text: string) => normalizeForSearch(text).split(/[^\p{L}\p{N}]+/u).filter(Boolean)

/**
 * Aramadaki her kelime, metindeki bir kelimenin başıyla eşleşiyorsa sonuç döner.
 * "kase" → "Kasesi" eşleşir; "nar" → "kenarlı" eşleşmez.
 */
export function matchesSearch(haystack: string, query: string): boolean {
  const terms = toWords(query)
  if (terms.length === 0) return true
  const words = toWords(haystack)
  return terms.every((term) => words.some((word) => word.startsWith(term)))
}
