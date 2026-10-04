import { describe, expect, it } from 'vitest'
import { matchesSearch, normalizeForSearch } from './search'

describe('normalizeForSearch', () => {
  it('Türkçe büyük/küçük harf ve aksan farklarını kaldırır', () => {
    expect(normalizeForSearch('FİNCAN')).toBe('fincan')
    expect(normalizeForSearch('FINCAN')).toBe('fincan')
    expect(normalizeForSearch('Işık')).toBe('isik')
    expect(normalizeForSearch('ŞEKER Ğ Ü Ö Ç')).toBe('seker g u o c')
    expect(normalizeForSearch('çorba kâsesi')).toBe('corba kasesi')
  })

  it('boşlukları sadeleştirir', () => {
    expect(normalizeForSearch('  çay   kasesi ')).toBe('cay kasesi')
  })
})

describe('matchesSearch', () => {
  it('büyük/küçük harften bağımsız eşleşir', () => {
    expect(matchesSearch('Derin Çorba Kasesi', 'kase')).toBe(true)
    expect(matchesSearch('Derin Çorba Kasesi', 'KASE')).toBe(true)
    expect(matchesSearch('Kum Tanesi Espresso Fincanı', 'FİNCAN')).toBe(true)
    expect(matchesSearch('Kum Tanesi Espresso Fincanı', 'fincan')).toBe(true)
  })

  it('aksansız yazımla eşleşir', () => {
    expect(matchesSearch('Kulpsuz Çay Kasesi', 'cay')).toBe(true)
    expect(matchesSearch('Tatlı Tabağı', 'tatli tabagi')).toBe(true)
  })

  it('kelime başından eşleşir, kelime ortasından eşleşmez', () => {
    expect(matchesSearch('Deniz mavisi kenarlı tabak', 'nar')).toBe(false)
    expect(matchesSearch('Nar Desenli Duvar Tabağı', 'nar')).toBe(true)
    expect(matchesSearch('Kupa & Fincan', 'fincan')).toBe(true)
  })

  it('her kelimenin geçmesini ister', () => {
    expect(matchesSearch('Derin Çorba Kasesi', 'çorba derin')).toBe(true)
    expect(matchesSearch('Derin Çorba Kasesi', 'çorba vazo')).toBe(false)
  })

  it('boş arama her şeyle eşleşir', () => {
    expect(matchesSearch('Vazo', '   ')).toBe(true)
  })
})
