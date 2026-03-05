// TextField — outlined floating-label text input.
// Accessibility via React Aria useTextField + useFocusRing.
// Floating label uses CSS :not(:placeholder-shown) + sibling selector — no JS state needed.
// Token CSS is global (:root); active brand theme loaded by app/Storybook.

import { useRef } from 'react'
import { useTextField, useFocusRing, mergeProps } from 'react-aria'
import type { AriaTextFieldProps } from 'react-aria'
import './TextField.css'

interface TextFieldProps extends AriaTextFieldProps {
  label: string
}

export function TextField({ label, ...props }: TextFieldProps) {
  const ref = useRef<HTMLInputElement>(null)

  const { labelProps, inputProps, descriptionProps, errorMessageProps, isInvalid } =
    useTextField(props, ref)

  const { focusProps, isFocusVisible } = useFocusRing()

  return (
    <div className="text-field" data-invalid={isInvalid || undefined}>
      <div className="text-field__wrapper">
        {/* Input comes first so the CSS sibling selector (~) can target the label */}
        <input
          {...mergeProps(inputProps, focusProps)}
          ref={ref}
          className="text-field__input"
          placeholder=" "
          data-focus-visible={isFocusVisible || undefined}
        />
        <label {...labelProps} className="text-field__label">
          {label}
        </label>
      </div>

      {props.description && !isInvalid && (
        <span {...descriptionProps} className="text-field__description">
          {props.description as string}
        </span>
      )}

      {isInvalid && props.errorMessage && (
        <span {...errorMessageProps} className="text-field__error">
          {props.errorMessage as string}
        </span>
      )}
    </div>
  )
}
