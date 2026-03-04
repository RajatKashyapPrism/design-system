// Button component — styled with CSS custom properties from src/tokens/.
// Token CSS is global (:root); the active brand's theme.css is loaded by the app/Storybook.
// Responsive sizing uses --scale-* overrides from src/tokens/mobile/responsive.css (@media 768px).
// Accessibility and interaction behavior via React Aria.

import { useRef } from 'react'
import { useButton, useHover, useFocusRing, mergeProps } from 'react-aria'
import type { AriaButtonProps } from 'react-aria'
import './Button.css'

export type ButtonVariant = 'primary' | 'secondary' | 'tertiary' | 'hyperlink' | 'underlined' | 'neutral'
export type ButtonSize = 'xs' | 'sm' | 'md' | 'lg'

interface ButtonProps extends AriaButtonProps {
  children?: React.ReactNode
  label?: string
  label1?: boolean
  leadingIcon?: boolean
  leadingIcon1?: React.ReactNode | null
  onBackground?: boolean
  size?: ButtonSize
  split?: boolean
trailingIcon?: boolean
  trailingIcon1?: React.ReactNode | null
  variant?: ButtonVariant
}

export function Button({
  children,
  label = 'Button',
  label1 = true,
  leadingIcon = false,
  leadingIcon1 = null,
  onBackground = false,
  size = 'xs',
  split = false,
  trailingIcon = false,
  trailingIcon1 = null,
  variant = 'primary',
  ...ariaProps
}: ButtonProps) {
  const ref = useRef<HTMLButtonElement>(null)

  // React Aria hooks — keyboard, screen reader, and cross-platform press behavior
  const { buttonProps, isPressed } = useButton({ ...ariaProps, elementType: 'button' }, ref)
  const { hoverProps, isHovered } = useHover({ isDisabled: ariaProps.isDisabled })
  const { focusProps, isFocusVisible } = useFocusRing()

  const displayLabel = children !== undefined ? children : label

  // ── Resolve background CSS variable reference based on variant + state ──────

  const getBg = (): string => {
    switch (variant) {
      case 'primary':
        if (onBackground) {
          if (isPressed) return 'var(--colour-interaction-background-intense-invert-brand-primary-pressed)'
          if (isHovered) return 'var(--colour-interaction-background-intense-invert-brand-primary-hover)'
          return 'var(--colour-background-intense-brand-invert-primary)'
        }
        if (isPressed) return 'var(--colour-interaction-background-intense-brand-primary-pressed)'
        if (isHovered) return 'var(--colour-interaction-background-intense-brand-primary-hover)'
        return 'var(--colour-background-intense-brand-primary)'

      case 'secondary':
        if (onBackground) {
          if (isPressed) return 'var(--colour-interaction-background-intense-invert-brand-secondary-pressed)'
          if (isHovered) return 'var(--colour-interaction-background-intense-invert-brand-secondary-hover)'
          return 'var(--colour-background-intense-brand-invert-secondary)'
        }
        if (isPressed) return 'var(--colour-interaction-background-intense-brand-secondary-pressed)'
        if (isHovered) return 'var(--colour-interaction-background-intense-brand-secondary-hover)'
        return 'var(--colour-background-intense-brand-secondary)'

      case 'neutral':
        if (onBackground) {
          if (isPressed) return 'var(--colour-interaction-background-subtle-neutral-1-pressed)'
          if (isHovered) return 'var(--colour-interaction-background-subtle-neutral-1-hover)'
          return 'var(--colour-background-subtle-neutral-1)'
        }
        if (isHovered) return 'var(--colour-interaction-background-intense-neutral-3-hover)'
        return 'var(--colour-background-intense-neutral-3)'

      case 'tertiary':
        return 'transparent'

      case 'hyperlink':
        if (isHovered || isPressed) return 'var(--colour-background-subtle-info)'
        return 'transparent'

      case 'underlined':
        if (isHovered || isPressed) return 'var(--colour-interaction-background-subtle-neutral-1-hover)'
        return 'transparent'

      default:
        return 'var(--colour-background-intense-brand-primary)'
    }
  }

  // ── Resolve text color CSS variable reference ────────────────────────────────

  const getColor = (): string => {
    switch (variant) {
      case 'primary':
        return onBackground
          ? 'var(--colour-text-intense-on-intense-brand-invert-primary)'
          : 'var(--colour-text-intense-on-intense-brand-primary)'

      case 'secondary':
        return onBackground
          ? 'var(--colour-text-intense-on-intense-brand-invert-secondary)'
          : 'var(--colour-text-intense-on-intense-brand-secondary)'

      case 'neutral':
        return onBackground
          ? 'var(--colour-text-intense-neutral)'
          : 'var(--colour-text-intense-on-intense-brand-primary)'

      case 'tertiary':
        return 'var(--colour-text-intense-brand-secondary)'

      case 'hyperlink':
        return isHovered || isPressed
          ? 'var(--hyperlink-colour-interaction-hover)'
          : 'var(--hyperlink-colour-active)'

      case 'underlined':
        return 'var(--colour-text-intense-neutral)'

      default:
        return 'var(--colour-text-intense-on-intense-brand-primary)'
    }
  }

  // ── Resolve border box-shadow for tertiary variant ───────────────────────────

  const getBorderShadow = (): string => {
    if (variant !== 'tertiary') return 'none'
    const width = isPressed
      ? 'var(--button-size-interaction-border-width-pressed, 1px)'
      : isHovered
        ? 'var(--button-size-interaction-border-width-hover, 2px)'
        : 'var(--button-size-border-width-active, 1px)'
    const color = isHovered
      ? 'var(--colour-interaction-border-intense-brand-secondary-hover)'
      : 'var(--colour-border-intense-brand-secondary)'
    return `inset 0 0 0 ${width} ${color}`
  }

  const isMinimalVariant = variant === 'hyperlink' || variant === 'underlined'
  const iconSize = size === 'lg' ? 'var(--fixed-300, 24px)' : 'var(--fixed-200, 16px)'

  return (
    <button
      {...mergeProps(buttonProps, hoverProps, focusProps)}
      ref={ref}
data-hovered={isHovered || undefined}
      data-pressed={isPressed || undefined}
      data-focus-visible={isFocusVisible || undefined}
      className={`btn btn--${variant} btn--${size}`}
      style={{
        '--btn-bg': getBg(),
        '--btn-color': getColor(),
        '--btn-border-shadow': getBorderShadow(),
      } as React.CSSProperties}
    >
      {/* Leading icon */}
      {leadingIcon && (leadingIcon1 ?? (
        <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
          <span style={{ width: iconSize, height: iconSize, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <svg width="100%" height="100%" viewBox="0 0 16 16" fill="none">
              <path d="M8 3V13M3 8H13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            </svg>
          </span>
        </span>
      ))}

      {/* Label */}
      {label1 && (
        <span
          style={{
            display: 'flex',
            alignItems: 'center',
            padding: isMinimalVariant ? '0' : '0 var(--btn-label-padding-x, 4px)',
            flexShrink: 0,
          }}
        >
          {displayLabel}
        </span>
      )}

      {/* Split separator */}
      {split && (
        <span style={{ display: 'flex', alignItems: 'center', fontSize: '8px', opacity: 0.3 }}>
          |
        </span>
      )}

      {/* Trailing icon */}
      {trailingIcon && (trailingIcon1 ?? (
        <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
          <span style={{ width: iconSize, height: iconSize, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <svg width="100%" height="100%" viewBox="0 0 16 16" fill="none">
              <path d="M8 3V13M3 8H13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            </svg>
          </span>
        </span>
      ))}
    </button>
  )
}
