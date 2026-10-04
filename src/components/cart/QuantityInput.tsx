import { useId, useState, type KeyboardEvent } from 'react'
import { site } from '../../content/site'

interface QuantityInputProps {
  value: number
  min: number
  max: number
  /** Kutunun erişilebilir adı, örn. "Adet" ya da "Kiremit Sırlı Kupa adedi" */
  label: string
  /** Etiket görünür mü; sepet satırlarında yalnızca ekran okuyucu içindir. */
  showLabel?: boolean
  onChange: (value: number) => void
}

const copy = site.quantity
const buttonClass =
  'grid size-11 place-items-center rounded-md text-antrasit-900 transition-colors hover:bg-krem-200 disabled:cursor-not-allowed disabled:text-antrasit-600 disabled:opacity-50 disabled:hover:bg-transparent'

/** Azalt / artır butonları ve doğrudan yazılabilen kutu. Değer her zaman min–max arasına çekilir. */
export function QuantityInput({ value, min, max, label, showLabel = true, onChange }: QuantityInputProps) {
  const inputId = useId()
  const hintId = useId()
  const [text, setText] = useState(String(value))
  const [syncedValue, setSyncedValue] = useState(value)

  // Değer dışarıdan değişirse (butonlar, başka sekme) kutuyu eşitle.
  if (syncedValue !== value) {
    setSyncedValue(value)
    setText(String(value))
  }

  const change = (next: number) => {
    const clamped = Math.min(max, Math.max(min, next))
    setText(String(clamped))
    if (clamped !== value) onChange(clamped)
  }

  const commitText = () => {
    const parsed = Number.parseInt(text, 10)
    if (Number.isNaN(parsed)) setText(String(value))
    else change(parsed)
  }

  const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      event.preventDefault()
      commitText()
    } else if (event.key === 'ArrowUp' || event.key === 'ArrowDown') {
      event.preventDefault()
      change(value + (event.key === 'ArrowUp' ? 1 : -1))
    }
  }

  return (
    <div>
      <label htmlFor={inputId} className={showLabel ? 'mb-1 block text-sm font-semibold text-antrasit-700' : 'sr-only'}>
        {label}
      </label>
      <div className="inline-flex items-center rounded-md border border-antrasit-600 bg-notr">
        <button type="button" aria-label={copy.decrease} disabled={value <= min} onClick={() => change(value - 1)} className={buttonClass}>
          <svg aria-hidden="true" viewBox="0 0 16 16" className="size-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
            <path d="M3 8h10" />
          </svg>
        </button>
        <input
          id={inputId}
          type="text"
          inputMode="numeric"
          autoComplete="off"
          maxLength={2}
          value={text}
          aria-describedby={hintId}
          onChange={(event) => setText(event.target.value.replace(/\D/g, ''))}
          onBlur={commitText}
          onKeyDown={handleKeyDown}
          className="h-11 w-12 border-x border-antrasit-600 bg-notr text-center font-semibold text-antrasit-900"
        />
        <button type="button" aria-label={copy.increase} disabled={value >= max} onClick={() => change(value + 1)} className={buttonClass}>
          <svg aria-hidden="true" viewBox="0 0 16 16" className="size-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
            <path d="M3 8h10M8 3v10" />
          </svg>
        </button>
      </div>
      <span id={hintId} className="sr-only">
        {copy.range(min, max)}
      </span>
    </div>
  )
}
