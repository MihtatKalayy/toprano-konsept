import { describe, expect, it } from 'vitest'
import { provinces } from '../content/provinces'
import {
  deliveryFieldOrder,
  emptyDeliveryForm,
  firstInvalidField,
  isValidEmail,
  isValidPostalCode,
  normalizeTurkishPhone,
  validateDeliveryForm,
  type DeliveryForm,
} from './checkoutValidation'

const codes = new Set(provinces.map((province) => province.code))
const valid: DeliveryForm = {
  fullName: 'Deniz Örnek',
  phone: '0532 123 45 67',
  email: 'deniz@ornek.example',
  provinceCode: '35',
  district: 'Kurgu',
  address: 'Kil Sokağı No: 0 Daire 1',
  postalCode: '',
  note: '',
  consent: true,
}
const validate = (overrides: Partial<DeliveryForm>) => validateDeliveryForm({ ...valid, ...overrides }, codes)

describe('il listesi', () => {
  it('81 il, 01–81 arası benzersiz kodlar', () => {
    expect(provinces).toHaveLength(81)
    expect(provinces.map((province) => province.code)).toEqual(Array.from({ length: 81 }, (_, i) => String(i + 1).padStart(2, '0')))
    expect(new Set(provinces.map((province) => province.name)).size).toBe(81)
    expect(provinces.find((province) => province.code === '06')?.name).toBe('Ankara')
    expect(provinces.find((province) => province.code === '34')?.name).toBe('İstanbul')
  })
})

describe('normalizeTurkishPhone', () => {
  it.each([
    ['0532 123 45 67', '5321234567'],
    ['05321234567', '5321234567'],
    ['5321234567', '5321234567'],
    ['+90 532 123 45 67', '5321234567'],
    ['+905321234567', '5321234567'],
    ['905321234567', '5321234567'],
    ['0090 532 123 45 67', '5321234567'],
    ['0532-123-45-67', '5321234567'],
    ['(0212) 123 45 67', '2121234567'],
    ['0 850 123 45 67', '8501234567'],
    ['  0532 123 4567  ', '5321234567'],
  ])('%s → %s', (input, expected) => {
    expect(normalizeTurkishPhone(input)).toBe(expected)
  })

  it.each(['', '123', '0532 123 45 6', '0532 123 45 678', '+1 555 123 4567', '0132 123 45 67', '0632 123 45 67', '05321234567a', 'telefon', '+90+5321234567'])(
    'geçersiz: "%s"',
    (input) => {
      expect(normalizeTurkishPhone(input)).toBeNull()
    },
  )
})

describe('isValidEmail', () => {
  it.each(['deniz@ornek.example', 'ad.soyad+etiket@alt.alan.com.tr', 'a@b.co'])('geçerli: %s', (email) => {
    expect(isValidEmail(email)).toBe(true)
  })
  it.each(['', 'deniz', 'deniz@', '@ornek.com', 'deniz@ornek', 'deniz@ornek.c', 'de niz@ornek.com', 'deniz@@ornek.com', 'deniz@ornek..com', `${'a'.repeat(250)}@b.com`])(
    'geçersiz: "%s"',
    (email) => {
      expect(isValidEmail(email)).toBe(false)
    },
  )
})

describe('isValidPostalCode', () => {
  it('5 hane ve 01–81 ile başlar', () => {
    expect(isValidPostalCode('35000')).toBe(true)
    expect(isValidPostalCode('01000')).toBe(true)
    expect(isValidPostalCode('81000')).toBe(true)
    for (const code of ['3500', '350000', '00123', '82000', '99999', 'abcde', '35 00']) {
      expect(isValidPostalCode(code)).toBe(false)
    }
  })
})

describe('validateDeliveryForm', () => {
  it('geçerli formda hata yok', () => {
    expect(validate({})).toEqual({})
    expect(validate({ postalCode: '35000', note: 'Kapıya bırakılabilir.' })).toEqual({})
  })

  it('boş formda tüm zorunlu alanlar "required", isteğe bağlılar hatasız', () => {
    expect(validateDeliveryForm(emptyDeliveryForm, codes)).toEqual({
      fullName: 'required',
      phone: 'required',
      email: 'required',
      provinceCode: 'required',
      district: 'required',
      address: 'required',
      consent: 'required',
    })
  })

  it('yalnızca boşluktan oluşan değer boş sayılır', () => {
    expect(validate({ fullName: '   ', address: '  ' })).toEqual({ fullName: 'required', address: 'required' })
  })

  it('biçim hataları "invalid"', () => {
    expect(validate({ fullName: 'Deniz' })).toEqual({ fullName: 'invalid' })
    expect(validate({ phone: '123' })).toEqual({ phone: 'invalid' })
    expect(validate({ email: 'deniz@' })).toEqual({ email: 'invalid' })
    expect(validate({ provinceCode: '99' })).toEqual({ provinceCode: 'invalid' })
    expect(validate({ district: 'K' })).toEqual({ district: 'invalid' })
    expect(validate({ address: 'Kısa adr' })).toEqual({ address: 'invalid' })
    expect(validate({ postalCode: '3500' })).toEqual({ postalCode: 'invalid' })
    expect(validate({ note: 'a'.repeat(501) })).toEqual({ note: 'invalid' })
  })

  it('sınır değerleri', () => {
    expect(validate({ address: '1234567890' })).toEqual({})
    expect(validate({ address: '123456789' })).toEqual({ address: 'invalid' })
    expect(validate({ note: 'a'.repeat(500) })).toEqual({})
    expect(validate({ fullName: 'A B' })).toEqual({})
  })

  it('girdiyi değiştirmez', () => {
    const values = { ...valid }
    validateDeliveryForm(values, codes)
    expect(values).toEqual(valid)
  })
})

describe('firstInvalidField', () => {
  it('form sırasına göre ilk hatalı alanı verir', () => {
    expect(firstInvalidField({ consent: 'required', email: 'invalid', address: 'required' })).toBe('email')
    expect(firstInvalidField(validateDeliveryForm(emptyDeliveryForm, codes))).toBe(deliveryFieldOrder[0])
    expect(firstInvalidField({})).toBeUndefined()
  })
})
