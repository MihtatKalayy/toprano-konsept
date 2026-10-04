import { useId, useRef, useState, type FormEvent, type ReactNode } from 'react'
import { provinces } from '../../content/provinces'
import { site } from '../../content/site'
import {
  deliveryLimits,
  emptyDeliveryForm,
  firstInvalidField,
  validateDeliveryForm,
  type DeliveryErrors,
  type DeliveryField,
  type DeliveryForm as DeliveryValues,
} from '../../lib/checkoutValidation'

const copy = site.pages.checkout
const provinceCodes = new Set(provinces.map((province) => province.code))
const sortedProvinces = [...provinces].sort((a, b) => a.name.localeCompare(b.name, 'tr'))

const inputClass =
  'mt-1 block w-full rounded-md border bg-notr px-3 text-antrasit-900 aria-invalid:border-2 aria-invalid:border-kiremit-700'
const textInputClass = `${inputClass} min-h-11 border-antrasit-600`

interface DeliveryFormProps {
  /** Form geçerli olduğunda bir kez çağrılır. Form değerleri dışarı aktarılmaz; yalnızca bu bileşenin belleğinde durur. */
  onValidSubmit: () => void
}

export function DeliveryForm({ onValidSubmit }: DeliveryFormProps) {
  const baseId = useId()
  const [values, setValues] = useState<DeliveryValues>(emptyDeliveryForm)
  const [attempted, setAttempted] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const submittedRef = useRef(false)

  // İlk gönderim denemesinden sonra hatalar yazdıkça güncellenir.
  const errors: DeliveryErrors = attempted ? validateDeliveryForm(values, provinceCodes) : {}
  const errorCount = Object.keys(errors).length

  const idOf = (field: DeliveryField) => `${baseId}-${field}`
  const errorIdOf = (field: DeliveryField) => `${idOf(field)}-hata`
  const hintIdOf = (field: DeliveryField) => `${idOf(field)}-ipucu`

  const set = <K extends DeliveryField>(field: K, value: DeliveryValues[K]) => setValues((previous) => ({ ...previous, [field]: value }))

  const register = (field: DeliveryField) => ({
    id: idOf(field),
    name: field,
    'aria-invalid': errors[field] ? true : undefined,
    'aria-describedby': [copy.fields[field].hint && hintIdOf(field), errors[field] && errorIdOf(field)].filter(Boolean).join(' ') || undefined,
  })

  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    // Çift tıklama ya da art arda Enter siparişi iki kez işlemesin.
    if (submittedRef.current) return
    setAttempted(true)
    const first = firstInvalidField(validateDeliveryForm(values, provinceCodes))
    if (first) {
      document.getElementById(idOf(first))?.focus()
      return
    }
    submittedRef.current = true
    setSubmitted(true)
    onValidSubmit()
  }

  const field = (name: DeliveryField, control: ReactNode, required = true) => {
    const fieldCopy = copy.fields[name]
    const error = errors[name]
    return (
      <div>
        <label htmlFor={idOf(name)} className="block font-semibold text-antrasit-900">
          {fieldCopy.label} {!required && <span className="font-normal text-antrasit-700">{copy.optional}</span>}
        </label>
        {fieldCopy.hint && (
          <p id={hintIdOf(name)} className="text-sm text-antrasit-700">
            {fieldCopy.hint}
          </p>
        )}
        {control}
        {error && (
          <p id={errorIdOf(name)} className="mt-1 text-sm font-semibold text-kiremit-800">
            {fieldCopy.errors[error]}
          </p>
        )}
      </div>
    )
  }

  return (
    <form noValidate onSubmit={submit} aria-labelledby={`${baseId}-baslik`} className="space-y-8">
      <section className="space-y-5">
        <h2 id={`${baseId}-baslik`} className="text-2xl font-semibold">
          {copy.deliveryHeading}
        </h2>

        {field(
          'fullName',
          <input
            {...register('fullName')}
            type="text"
            required
            autoComplete="name"
            autoCapitalize="words"
            value={values.fullName}
            onChange={(event) => set('fullName', event.target.value)}
            className={textInputClass}
          />,
        )}

        <div className="grid gap-5 sm:grid-cols-2">
          {field(
            'phone',
            <input
              {...register('phone')}
              type="tel"
              required
              inputMode="tel"
              autoComplete="tel"
              value={values.phone}
              onChange={(event) => set('phone', event.target.value)}
              className={textInputClass}
            />,
          )}
          {field(
            'email',
            <input
              {...register('email')}
              type="email"
              required
              inputMode="email"
              autoComplete="email"
              autoCapitalize="none"
              spellCheck={false}
              value={values.email}
              onChange={(event) => set('email', event.target.value)}
              className={textInputClass}
            />,
          )}
        </div>

        <div className="grid gap-5 sm:grid-cols-2">
          {field(
            'provinceCode',
            <select
              {...register('provinceCode')}
              required
              autoComplete="shipping address-level1"
              value={values.provinceCode}
              onChange={(event) => set('provinceCode', event.target.value)}
              className={textInputClass}
            >
              <option value="">{copy.provincePlaceholder}</option>
              {sortedProvinces.map((province) => (
                <option key={province.code} value={province.code}>
                  {province.name}
                </option>
              ))}
            </select>,
          )}
          {field(
            'district',
            <input
              {...register('district')}
              type="text"
              required
              autoComplete="shipping address-level2"
              value={values.district}
              onChange={(event) => set('district', event.target.value)}
              className={textInputClass}
            />,
          )}
        </div>

        {field(
          'address',
          <textarea
            {...register('address')}
            required
            rows={3}
            autoComplete="shipping street-address"
            value={values.address}
            onChange={(event) => set('address', event.target.value)}
            className={`${inputClass} border-antrasit-600 py-2`}
          />,
        )}

        <div className="grid gap-5 sm:grid-cols-[12rem_1fr]">
          {field(
            'postalCode',
            <input
              {...register('postalCode')}
              type="text"
              inputMode="numeric"
              autoComplete="shipping postal-code"
              maxLength={5}
              value={values.postalCode}
              onChange={(event) => set('postalCode', event.target.value)}
              className={textInputClass}
            />,
            false,
          )}
        </div>

        {field(
          'note',
          <textarea
            {...register('note')}
            rows={3}
            maxLength={deliveryLimits.noteMax}
            value={values.note}
            onChange={(event) => set('note', event.target.value)}
            className={`${inputClass} border-antrasit-600 py-2`}
          />,
          false,
        )}
      </section>

      <section aria-labelledby={`${baseId}-onay-baslik`} className="rounded-lg bg-krem-200 p-4">
        <h2 id={`${baseId}-onay-baslik`} className="text-lg font-semibold">
          {copy.consentHeading}
        </h2>
        <p className="mt-1 text-antrasit-900">{copy.consentText}</p>
        {/* Etiket kutuyu sarar; dokunma alanı satırın tamamıdır (en az 44 px). */}
        <label htmlFor={idOf('consent')} className="mt-3 flex min-h-11 cursor-pointer items-center gap-3 font-semibold">
          <input
            {...register('consent')}
            type="checkbox"
            required
            checked={values.consent}
            onChange={(event) => set('consent', event.target.checked)}
            className="size-6 shrink-0 accent-vurgu"
          />
          {copy.fields.consent.label}
        </label>
        {errors.consent && (
          <p id={errorIdOf('consent')} className="mt-1 ml-9 text-sm font-semibold text-kiremit-800">
            {copy.fields.consent.errors.required}
          </p>
        )}
      </section>

      <section aria-labelledby={`${baseId}-odeme-baslik`} className="rounded-lg border border-dashed border-antrasit-600 p-4">
        <h2 id={`${baseId}-odeme-baslik`} className="text-lg font-semibold">
          {copy.paymentHeading}
        </h2>
        <p className="mt-1 text-antrasit-700">{copy.paymentText}</p>
      </section>

      <div>
        {errorCount > 0 && <p className="mb-3 font-semibold text-kiremit-800">{copy.errorSummary(errorCount)}</p>}
        <button
          type="submit"
          disabled={submitted}
          className="inline-flex min-h-12 w-full items-center justify-center rounded-md bg-vurgu px-6 text-lg font-semibold text-vurgu-metin transition-colors hover:bg-vurgu-hover disabled:cursor-wait disabled:opacity-70 sm:w-auto"
        >
          {copy.submit}
        </button>
      </div>
    </form>
  )
}
