import { describe, expect, it } from 'vitest'
import { formatPrice, kurusToWholeLira, liraToKurus } from './money'

describe('formatPrice', () => {
  it('tam lirayı küsuratsız gösterir', () => {
    expect(formatPrice(42000)).toBe('₺420')
    expect(formatPrice(165000)).toBe('₺1.650')
    expect(formatPrice(0)).toBe('₺0')
  })

  it('kuruşu iki basamakla gösterir', () => {
    expect(formatPrice(42050)).toBe('₺420,50')
    expect(formatPrice(42005)).toBe('₺420,05')
    expect(formatPrice(1)).toBe('₺0,01')
  })

  it('büyük tutarlarda kayan nokta hatası yapmaz', () => {
    expect(formatPrice(123456789)).toBe('₺1.234.567,89')
    expect(formatPrice(10 + 20)).toBe('₺0,30')
  })

  it('geçersiz değerlerde hata fırlatır', () => {
    expect(() => formatPrice(12.5)).toThrow(RangeError)
    expect(() => formatPrice(-100)).toThrow(RangeError)
    expect(() => formatPrice(Number.NaN)).toThrow(RangeError)
  })
})

describe('lira ↔ kuruş', () => {
  it('liraToKurus tam sayı üretir', () => {
    expect(liraToKurus(250)).toBe(25000)
    expect(() => liraToKurus(2.5)).toThrow(RangeError)
  })

  it('kurusToWholeLira küsuratı atar', () => {
    expect(kurusToWholeLira(25099)).toBe(250)
    expect(kurusToWholeLira(25000)).toBe(250)
  })
})
