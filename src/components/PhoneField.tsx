// PhoneField — outlined composite input: country code selector + phone number.
// Country select is always visible, so the label is always pinned at the top.
// Accessibility: useFocusRing for keyboard focus ring on the number input.
// Wrapper focus state handled via CSS :focus-within.

import { useId, useRef, useState } from 'react'
import { useFocusRing, mergeProps } from 'react-aria'
import { COUNTRIES } from './countries'
import type { Country } from './countries'
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
  const inputRef = useRef<HTMLInputElement>(null)
  const inputId = useId()
  const descriptionId = useId()
  const errorId = useId()

  const { focusProps, isFocusVisible } = useFocusRing()

  return (
    <div className="phone-field" data-invalid={isInvalid || undefined} aria-disabled={isDisabled || undefined}>
      <div className="phone-field__wrapper">

        {/* Country code selector */}
        <select
          className="phone-field__country"
          value={country.code}
          disabled={isDisabled || isReadOnly}
          aria-label="Country dialling code"
          onChange={e =>
            setCountry(COUNTRIES.find(c => c.code === e.target.value) ?? COUNTRIES[0])
          }
        >
          {COUNTRIES.map(c => (
            <option key={c.code} value={c.code}>
              {c.flag} {c.dialCode}
            </option>
          ))}
        </select>

        <div className="phone-field__divider" aria-hidden="true" />

        {/* Phone number input */}
        <input
          {...mergeProps(focusProps)}
          ref={inputRef}
          id={inputId}
          type="tel"
          className="phone-field__input"
          placeholder={placeholder}
          disabled={isDisabled}
          readOnly={isReadOnly}
          aria-required={isRequired || undefined}
          aria-invalid={isInvalid || undefined}
          aria-describedby={
            isInvalid && errorMessage ? errorId : description ? descriptionId : undefined
          }
          data-focus-visible={isFocusVisible || undefined}
        />

        {/* Label — always pinned at top since select always shows content */}
        <label htmlFor={inputId} className="phone-field__label">
          {label}
          {isRequired && <span aria-hidden="true"> *</span>}
        </label>

      </div>

      {description && !isInvalid && (
        <span id={descriptionId} className="phone-field__description">
          {description}
        </span>
      )}

      {isInvalid && errorMessage && (
        <span id={errorId} className="phone-field__error" role="alert">
          {errorMessage}
        </span>
      )}
    </div>
  )
}
