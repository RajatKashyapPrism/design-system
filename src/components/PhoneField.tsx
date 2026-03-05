// PhoneField — outlined composite input: country code selector + phone number.
// Country select is always visible, so the label is always pinned at the top.
// Formatting and validation are applied per dial code via phoneFormats.ts.
// Wrapper focus state handled via CSS :focus-within.

import { useId, useRef, useState } from 'react'
import { useFocusRing, mergeProps } from 'react-aria'
import { COUNTRIES } from './countries'
import type { Country } from './countries'
import { getPhoneFormat } from './phoneFormats'
import './PhoneField.css'

interface PhoneFieldProps {
  label?: string
  placeholder?: string
  description?: string
  errorMessage?: string
  isDisabled?: boolean
  isRequired?: boolean
  isReadOnly?: boolean
  isInvalid?: boolean
}

export function PhoneField({
  label = 'Phone number',
  placeholder,
  description,
  errorMessage,
  isDisabled,
  isRequired,
  isReadOnly,
  isInvalid,
}: PhoneFieldProps) {
  const [country, setCountry] = useState<Country>(COUNTRIES[0])
  const [selectOpen, setSelectOpen] = useState(false)
  const [rawDigits, setRawDigits] = useState('')
  const [validationError, setValidationError] = useState<string | null>(null)

  const inputRef = useRef<HTMLInputElement>(null)
  const inputId = useId()
  const descriptionId = useId()
  const errorId = useId()

  const { focusProps, isFocusVisible } = useFocusRing()

  const fmt = getPhoneFormat(country.dialCode)
  const displayValue = fmt ? fmt.format(rawDigits) : rawDigits
  const inputPlaceholder = placeholder

  const handleCountryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setCountry(COUNTRIES.find(c => c.code === e.target.value) ?? COUNTRIES[0])
    setRawDigits('')
    setValidationError(null)
    setSelectOpen(false)
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const digits = e.target.value.replace(/\D/g, '').slice(0, fmt?.maxDigits ?? 15)
    setRawDigits(digits)
    if (validationError) setValidationError(null)
  }

  const handleInputBlur = () => {
    if (!rawDigits || !fmt) return
    if (!fmt.validate(rawDigits)) {
      setValidationError(fmt.validationMessage)
    } else {
      setValidationError(null)
    }
  }

  const hasError = isInvalid || !!validationError
  const activeError = errorMessage || validationError

  return (
    <div className="phone-field" data-invalid={hasError || undefined} aria-disabled={isDisabled || undefined}>
      <div className="phone-field__wrapper">

        {/* Country code selector */}
        <div className="phone-field__country-wrapper" data-open={selectOpen || undefined}>
          <select
            className="phone-field__country"
            value={country.code}
            disabled={isDisabled || isReadOnly}
            aria-label="Country dialling code"
            onMouseDown={() => setSelectOpen(o => !o)}
            onBlur={() => setSelectOpen(false)}
            onChange={handleCountryChange}
          >
            {COUNTRIES.map(c => (
              <option key={c.code} value={c.code}>
                {c.flag} {c.dialCode}
              </option>
            ))}
          </select>
          <svg
            className="phone-field__country-chevron"
            width="12"
            height="12"
            viewBox="0 0 12 12"
            fill="none"
            aria-hidden="true"
          >
            <path d="M2 4L6 8L10 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>

        <div className="phone-field__divider" aria-hidden="true" />

        {/* Phone number input */}
        <input
          {...mergeProps(focusProps)}
          ref={inputRef}
          id={inputId}
          type="tel"
          className="phone-field__input"
          value={displayValue}
          placeholder={inputPlaceholder}
          disabled={isDisabled}
          readOnly={isReadOnly}
          aria-required={isRequired || undefined}
          aria-invalid={hasError || undefined}
          aria-describedby={
            hasError && activeError ? errorId : description ? descriptionId : undefined
          }
          data-focus-visible={isFocusVisible || undefined}
          onChange={handleInputChange}
          onBlur={handleInputBlur}
        />

        {/* Label — always pinned at top since select always shows content */}
        <label htmlFor={inputId} className="phone-field__label">
          {label}
          {isRequired && <span aria-hidden="true"> *</span>}
        </label>

      </div>

      {description && !hasError && (
        <span id={descriptionId} className="phone-field__description">
          {description}
        </span>
      )}

      {hasError && activeError && (
        <span id={errorId} className="phone-field__error" role="alert">
          {activeError}
        </span>
      )}
    </div>
  )
}
