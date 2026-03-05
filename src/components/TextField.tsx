// TextField component — MUI outlined style with floating label.
// Label acts as placeholder; floats to the top border on focus or when a value is present.
// Accessibility via React Aria (useTextField, useFocusRing).

import { useRef, useState } from 'react'
import { useTextField, useFocusRing, mergeProps } from 'react-aria'
import type { AriaTextFieldProps } from 'react-aria'
import './TextField.css'

export type TextFieldVariant = 'default' | 'error' | 'success'
export type TextFieldSize = 'sm' | 'md' | 'lg'

interface TextFieldProps extends AriaTextFieldProps {
  variant?: TextFieldVariant
  size?: TextFieldSize
  leadingIcon?: React.ReactNode
  trailingIcon?: React.ReactNode
}

export function TextField({
  variant = 'default',
  size = 'md',
  leadingIcon,
  trailingIcon,
  ...ariaProps
}: TextFieldProps) {
  const inputRef = useRef<HTMLInputElement>(null)

  // Track focus for floating label
  const [isFocused, setIsFocused] = useState(false)

  // Track value for floating label in uncontrolled mode
  const [internalValue, setInternalValue] = useState(String(ariaProps.defaultValue ?? ''))
  const effectiveValue = ariaProps.value !== undefined ? String(ariaProps.value) : internalValue

  const { labelProps, inputProps, descriptionProps, errorMessageProps, isInvalid } = useTextField(
    {
      ...ariaProps,
      onChange: (val) => {
        setInternalValue(val)
        ariaProps.onChange?.(val)
      },
      validationBehavior: 'aria',
    },
    inputRef,
  )

  const { focusProps, isFocusVisible } = useFocusRing()

  const resolvedVariant = isInvalid ? 'error' : variant

  // Float the label when focused or when the field has a value
  const isFloating = isFocused || effectiveValue.length > 0

  return (
    <div className={`text-field text-field--${resolvedVariant} text-field--${size}`}>
      <div
        className="text-field__container"
        data-floating={isFloating || undefined}
        data-focused={isFocused || undefined}
        data-focus-visible={isFocusVisible || undefined}
        data-disabled={ariaProps.isDisabled || undefined}
        data-invalid={isInvalid || undefined}
        data-has-leading-icon={leadingIcon ? '' : undefined}
      >
        {/* Floating label — sits on the border when floating */}
        {ariaProps.label && (
          <label {...labelProps} className="text-field__label">
            {ariaProps.label}
          </label>
        )}

        {leadingIcon && (
          <span className="text-field__icon text-field__icon--leading" aria-hidden="true">
            {leadingIcon}
          </span>
        )}

        <input
          {...mergeProps(inputProps, focusProps)}
          ref={inputRef}
          className="text-field__input"
          placeholder=""
          onFocus={(e) => {
            setIsFocused(true)
            inputProps.onFocus?.(e)
          }}
          onBlur={(e) => {
            setIsFocused(false)
            inputProps.onBlur?.(e)
          }}
        />

        {trailingIcon && (
          <span className="text-field__icon text-field__icon--trailing" aria-hidden="true">
            {trailingIcon}
          </span>
        )}
      </div>

      {/* Description */}
      {ariaProps.description && !isInvalid && (
        <span {...descriptionProps} className="text-field__description">
          {ariaProps.description}
        </span>
      )}

      {/* Error message */}
      {isInvalid && ariaProps.errorMessage && (
        <span {...errorMessageProps} className="text-field__error">
          {String(ariaProps.errorMessage)}
        </span>
      )}
    </div>
  )
}
