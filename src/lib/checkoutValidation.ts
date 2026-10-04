// Sipariş formunun doğrulama kuralları. Yalnızca ön yüzde çalışır; hiçbir değer kaydedilmez ya da gönderilmez.

export interface DeliveryForm {
  fullName: string
  phone: string
  email: string
  provinceCode: string
  district: string
  address: string
  postalCode: string
  note: string
  consent: boolean
}

export type DeliveryField = keyof DeliveryForm

/** Hata türü: alan boş (zorunlu) ya da biçimi geçersiz. Mesajlar içerik kaynağındadır. */
export type FieldError = 'required' | 'invalid'

export type DeliveryErrors = Partial<Record<DeliveryField, FieldError>>

/** Alanların formdaki sırası; gönderimde odak ilk hatalı alana bu sıraya göre gider. */
export const deliveryFieldOrder: DeliveryField[] = [
  'fullName',
  'phone',
  'email',
  'provinceCode',
  'district',
  'address',
  'postalCode',
  'note',
  'consent',
]

export const emptyDeliveryForm: DeliveryForm = {
  fullName: '',
  phone: '',
  email: '',
  provinceCode: '',
  district: '',
  address: '',
  postalCode: '',
  note: '',
  consent: false,
}

export const deliveryLimits = {
  fullNameMin: 3,
  districtMin: 2,
  addressMin: 10,
  noteMax: 500,
  emailMax: 254,
} as const

/**
 * Türkiye telefon numarasını 10 haneli ulusal biçime çevirir (örn. "5321234567").
 * Kabul edilenler: +90 532 123 45 67, 0090..., 90..., 0532-123-45-67, (0212) 123 45 67, 532 123 4567.
 * Boşluk, tire, nokta ve parantez yok sayılır. Geçersizse null döner.
 */
export function normalizeTurkishPhone(input: string): string | null {
  const compact = input.trim().replace(/[\s\-.()]/g, '')
  if (!/^\+?\d+$/.test(compact)) return null
  const digits = compact.replace(/^(\+90|0090|90(?=\d{10}$)|0(?=\d{10}$))/, '')
  // Ulusal numara 10 hanedir; sabit hatlar 2–4, cep telefonları 5, 850 gibi hatlar 8 ile başlar.
  return /^[2-58]\d{9}$/.test(digits) ? digits : null
}

export function isValidEmail(input: string): boolean {
  const value = input.trim()
  return value.length <= deliveryLimits.emailMax && /^[^\s@]+@[^\s@.]+(\.[^\s@.]+)*\.[^\s@.]{2,}$/.test(value)
}

/** Posta kodu 5 hanedir ve ilk iki hane il plaka kodudur (01–81). */
export function isValidPostalCode(input: string): boolean {
  const value = input.trim()
  if (!/^\d{5}$/.test(value)) return false
  const province = Number(value.slice(0, 2))
  return province >= 1 && province <= 81
}

export function validateDeliveryForm(values: DeliveryForm, provinceCodes: ReadonlySet<string>): DeliveryErrors {
  const errors: DeliveryErrors = {}
  const text = (field: Exclude<DeliveryField, 'consent'>) => values[field].trim()

  const fullName = text('fullName')
  if (!fullName) errors.fullName = 'required'
  else if (fullName.length < deliveryLimits.fullNameMin || !/\S\s+\S/.test(fullName)) errors.fullName = 'invalid'

  if (!text('phone')) errors.phone = 'required'
  else if (!normalizeTurkishPhone(values.phone)) errors.phone = 'invalid'

  if (!text('email')) errors.email = 'required'
  else if (!isValidEmail(values.email)) errors.email = 'invalid'

  if (!values.provinceCode) errors.provinceCode = 'required'
  else if (!provinceCodes.has(values.provinceCode)) errors.provinceCode = 'invalid'

  const district = text('district')
  if (!district) errors.district = 'required'
  else if (district.length < deliveryLimits.districtMin) errors.district = 'invalid'

  const address = text('address')
  if (!address) errors.address = 'required'
  else if (address.length < deliveryLimits.addressMin) errors.address = 'invalid'

  if (text('postalCode') && !isValidPostalCode(values.postalCode)) errors.postalCode = 'invalid'

  if (values.note.trim().length > deliveryLimits.noteMax) errors.note = 'invalid'

  if (!values.consent) errors.consent = 'required'

  return errors
}

export function firstInvalidField(errors: DeliveryErrors): DeliveryField | undefined {
  return deliveryFieldOrder.find((field) => errors[field] !== undefined)
}
