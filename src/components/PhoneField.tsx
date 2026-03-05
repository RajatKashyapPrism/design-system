// PhoneField — country code selector + formatted phone input.
// Formatting and validation via libphonenumber-js (AsYouType, isValidPhoneNumber).
// The label floats to the border on focus or when a value is present (MUI outlined style).

import { useRef, useState, useEffect, useMemo, useId } from 'react'
import { useFocusRing } from 'react-aria'
import { AsYouType, isValidPhoneNumber, parsePhoneNumberFromString } from 'libphonenumber-js'
import type { CountryCode } from 'libphonenumber-js'
import { COUNTRIES, getCountry, type Country } from './countries'
import './PhoneField.css'

export type PhoneFieldSize = 'sm' | 'md' | 'lg'

export interface PhoneChangeData {
  formattedValue: string   // formatted national number, e.g. '98765 43210'
  countryCode: CountryCode // ISO code, e.g. 'IN'
  dialCode: string         // e.g. '+91'
  e164: string             // full E.164, e.g. '+919876543210'
  isValid: boolean
}

export interface PhoneFieldProps {
  label?: string
  description?: string
  defaultCountry?: CountryCode
  size?: PhoneFieldSize
  isDisabled?: boolean
  isRequired?: boolean
  onChange?: (data: PhoneChangeData) => void
}

// ── Chevron icon ─────────────────────────────────────────────────────────────
function ChevronDown({ open }: { open: boolean }) {
  return (
    <svg
      width="12" height="12" viewBox="0 0 12 12" fill="none"
      style={{ transform: open ? 'rotate(180deg)' : 'none', transition: 'transform 0.15s ease', flexShrink: 0 }}
      aria-hidden="true"
    >
      <path d="M2 4L6 8L10 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

// ── Search icon ──────────────────────────────────────────────────────────────
function SearchIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
      <circle cx="6" cy="6" r="4" stroke="currentColor" strokeWidth="1.5" />
      <path d="M9 9L12 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  )
}

// ── Component ────────────────────────────────────────────────────────────────
export function PhoneField({
  label = 'Phone number',
  description,
  defaultCountry = 'IN',
  size = 'md',
  isDisabled = false,
  isRequired = false,
  onChange,
}: PhoneFieldProps) {
  const inputId = useId()
  const descriptionId = useId()
  const listboxId = useId()

  const wrapperRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)
  const searchRef = useRef<HTMLInputElement>(null)
  const listRef = useRef<HTMLUListElement>(null)

  const [selectedCountry, setSelectedCountry] = useState<Country>(getCountry(defaultCountry))
  const [rawDigits, setRawDigits] = useState('')
  const [inputValue, setInputValue] = useState('')
  const [isFocused, setIsFocused] = useState(false)
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [isInvalid, setIsInvalid] = useState(false)
  const [focusedOptionIndex, setFocusedOptionIndex] = useState(-1)

  const { focusProps, isFocusVisible } = useFocusRing()

  // Label floats when focused, dropdown open, or a value is present
  const isFloating = isFocused || isDropdownOpen || rawDigits.length > 0

  // ── Filtered country list ─────────────────────────────────────────────────
  const filteredCountries = useMemo(() => {
    if (!searchQuery.trim()) return COUNTRIES
    const q = searchQuery.toLowerCase()
    return COUNTRIES.filter(
      c =>
        c.name.toLowerCase().includes(q) ||
        c.dialCode.includes(q) ||
        c.code.toLowerCase().includes(q),
    )
  }, [searchQuery])

  // ── Notify parent ─────────────────────────────────────────────────────────
  function notifyChange(digits: string, country: Country) {
    if (!onChange || !digits) return
    try {
      const parsed = parsePhoneNumberFromString(digits, country.code)
      onChange({
        formattedValue: inputValue,
        countryCode: country.code,
        dialCode: country.dialCode,
        e164: parsed?.format('E.164') ?? '',
        isValid: parsed?.isValid() ?? false,
      })
    } catch {
      onChange({ formattedValue: inputValue, countryCode: country.code, dialCode: country.dialCode, e164: '', isValid: false })
    }
  }

  // ── Format digits using AsYouType ─────────────────────────────────────────
  function formatDigits(digits: string, country: Country): string {
    if (!digits) return ''
    return new AsYouType(country.code).input(digits)
  }

  // ── Input change handler ──────────────────────────────────────────────────
  function handleInputChange(e: React.ChangeEvent<HTMLInputElement>) {
    const nativeInputType = (e.nativeEvent as InputEvent).inputType
    const valueDigits = e.target.value.replace(/\D/g, '')

    // If user deletes a formatting char (space, dash, paren), the digit count
    // won't change — in that case remove the last real digit instead.
    let nextDigits: string
    if (
      (nativeInputType === 'deleteContentBackward' || nativeInputType === 'deleteContentForward') &&
      valueDigits === rawDigits
    ) {
      nextDigits = rawDigits.slice(0, -1)
    } else {
      nextDigits = valueDigits
    }

    const formatted = formatDigits(nextDigits, selectedCountry)
    setRawDigits(nextDigits)
    setInputValue(formatted)
    setIsInvalid(false)
    notifyChange(nextDigits, selectedCountry)
  }

  // ── Paste handler — detects pasted E.164 and auto-selects country ─────────
  function handlePaste(e: React.ClipboardEvent<HTMLInputElement>) {
    const pasted = e.clipboardData.getData('text').trim()
    e.preventDefault()

    if (pasted.startsWith('+')) {
      try {
        const parsed = parsePhoneNumberFromString(pasted)
        if (parsed?.country) {
          const country = getCountry(parsed.country as CountryCode)
          const national = String(parsed.nationalNumber)
          const formatted = formatDigits(national, country)
          setSelectedCountry(country)
          setRawDigits(national)
          setInputValue(formatted)
          setIsInvalid(false)
          notifyChange(national, country)
          return
        }
      } catch { /* fall through */ }
    }

    // No country info — just use digits with current country
    const digits = pasted.replace(/\D/g, '')
    const formatted = formatDigits(digits, selectedCountry)
    setRawDigits(digits)
    setInputValue(formatted)
    setIsInvalid(false)
    notifyChange(digits, selectedCountry)
  }

  // ── Blur validation ───────────────────────────────────────────────────────
  function handleInputBlur() {
    setIsFocused(false)
    if (rawDigits.length > 0) {
      setIsInvalid(!isValidPhoneNumber(rawDigits, selectedCountry.code))
    }
  }

  // ── Country selection ─────────────────────────────────────────────────────
  function handleCountrySelect(country: Country) {
    // Reformat existing digits for the newly selected country
    const formatted = formatDigits(rawDigits, country)
    setSelectedCountry(country)
    setInputValue(formatted)
    setIsDropdownOpen(false)
    setSearchQuery('')
    setFocusedOptionIndex(-1)
    setIsInvalid(false)
    setTimeout(() => inputRef.current?.focus(), 0)
  }

  // ── Dropdown toggle ───────────────────────────────────────────────────────
  function toggleDropdown() {
    if (isDisabled) return
    setIsDropdownOpen(prev => {
      if (!prev) {
        setFocusedOptionIndex(COUNTRIES.findIndex(c => c.code === selectedCountry.code))
        setTimeout(() => searchRef.current?.focus(), 0)
      }
      return !prev
    })
    setSearchQuery('')
  }

  // ── Keyboard navigation in dropdown ──────────────────────────────────────
  function handleDropdownKeyDown(e: React.KeyboardEvent) {
    if (e.key === 'Escape') {
      setIsDropdownOpen(false)
      setSearchQuery('')
      inputRef.current?.focus()
      return
    }
    if (e.key === 'ArrowDown') {
      e.preventDefault()
      setFocusedOptionIndex(i => Math.min(i + 1, filteredCountries.length - 1))
      scrollOptionIntoView()
    }
    if (e.key === 'ArrowUp') {
      e.preventDefault()
      setFocusedOptionIndex(i => Math.max(i - 1, 0))
      scrollOptionIntoView()
    }
    if (e.key === 'Enter' && focusedOptionIndex >= 0) {
      e.preventDefault()
      handleCountrySelect(filteredCountries[focusedOptionIndex])
    }
  }

  function scrollOptionIntoView() {
    setTimeout(() => {
      const focused = listRef.current?.querySelector('[data-focused="true"]') as HTMLElement | null
      focused?.scrollIntoView({ block: 'nearest' })
    }, 0)
  }

  // ── Click outside to close dropdown ──────────────────────────────────────
  useEffect(() => {
    if (!isDropdownOpen) return
    function handleClickOutside(e: MouseEvent) {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target as Node)) {
        setIsDropdownOpen(false)
        setSearchQuery('')
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [isDropdownOpen])

  // ── Trigger button keyboard handling ─────────────────────────────────────
  function handleTriggerKeyDown(e: React.KeyboardEvent) {
    if (e.key === 'Enter' || e.key === ' ' || e.key === 'ArrowDown') {
      e.preventDefault()
      if (!isDropdownOpen) toggleDropdown()
    }
    if (e.key === 'Escape' && isDropdownOpen) {
      setIsDropdownOpen(false)
      setSearchQuery('')
    }
  }

  return (
    <div
      ref={wrapperRef}
      className={`phone-field phone-field--${size}${isInvalid ? ' phone-field--error' : ''}`}
    >
      {/* ── Main outlined container ────────────────────────────────────────── */}
      <div
        className="phone-field__container"
        data-floating={isFloating || undefined}
        data-focused={(isFocused || isDropdownOpen) || undefined}
        data-focus-visible={isFocusVisible || undefined}
        data-disabled={isDisabled || undefined}
        data-invalid={isInvalid || undefined}
      >
        {/* Floating label */}
        <label htmlFor={inputId} className="phone-field__label">
          {label}
          {isRequired && <span aria-hidden="true">&thinsp;{'*'}</span>}
        </label>

        {/* Country selector trigger */}
        <button
          type="button"
          className="phone-field__country-trigger"
          aria-haspopup="listbox"
          aria-expanded={isDropdownOpen}
          aria-controls={listboxId}
          aria-label={`Country: ${selectedCountry.name} (${selectedCountry.dialCode})`}
          onClick={toggleDropdown}
          onKeyDown={handleTriggerKeyDown}
          disabled={isDisabled}
          tabIndex={isDisabled ? -1 : 0}
        >
          <span className="phone-field__flag" aria-hidden="true">{selectedCountry.flag}</span>
          <span className="phone-field__dialcode">{selectedCountry.dialCode}</span>
          <ChevronDown open={isDropdownOpen} />
        </button>

        {/* Vertical divider */}
        <span className="phone-field__divider" aria-hidden="true" />

        {/* Phone number input */}
        <input
          {...focusProps}
          ref={inputRef}
          id={inputId}
          type="tel"
          inputMode="tel"
          className="phone-field__input"
          value={inputValue}
          onChange={handleInputChange}
          onPaste={handlePaste}
          onFocus={() => setIsFocused(true)}
          onBlur={handleInputBlur}
          placeholder=""
          disabled={isDisabled}
          required={isRequired}
          aria-invalid={isInvalid || undefined}
          aria-describedby={description ? descriptionId : undefined}
          autoComplete="tel-national"
        />
      </div>

      {/* ── Country dropdown ───────────────────────────────────────────────── */}
      {isDropdownOpen && (
        <div className="phone-field__dropdown" onKeyDown={handleDropdownKeyDown}>
          {/* Search */}
          <div className="phone-field__search-wrapper">
            <SearchIcon />
            <input
              ref={searchRef}
              type="text"
              className="phone-field__search"
              placeholder="Search country or code…"
              value={searchQuery}
              onChange={e => {
                setSearchQuery(e.target.value)
                setFocusedOptionIndex(0)
              }}
              aria-label="Search countries"
            />
          </div>

          {/* Country list */}
          <ul
            ref={listRef}
            id={listboxId}
            role="listbox"
            aria-label="Select country"
            className="phone-field__country-list"
          >
            {filteredCountries.length === 0 ? (
              <li className="phone-field__no-results">No countries found</li>
            ) : (
              filteredCountries.map((country, index) => (
                <li
                  key={country.code}
                  role="option"
                  aria-selected={country.code === selectedCountry.code}
                  data-focused={index === focusedOptionIndex || undefined}
                  className={[
                    'phone-field__country-option',
                    country.code === selectedCountry.code ? 'phone-field__country-option--active' : '',
                    index === focusedOptionIndex ? 'phone-field__country-option--focused' : '',
                  ]
                    .filter(Boolean)
                    .join(' ')}
                  onMouseEnter={() => setFocusedOptionIndex(index)}
                  onClick={() => handleCountrySelect(country)}
                >
                  <span className="phone-field__option-flag" aria-hidden="true">{country.flag}</span>
                  <span className="phone-field__option-name">{country.name}</span>
                  <span className="phone-field__option-dialcode">{country.dialCode}</span>
                </li>
              ))
            )}
          </ul>
        </div>
      )}

      {/* ── Helper / error text ────────────────────────────────────────────── */}
      {description && !isInvalid && (
        <span id={descriptionId} className="phone-field__description">
          {description}
        </span>
      )}
      {isInvalid && (
        <span className="phone-field__error" role="alert">
          Invalid phone number for {selectedCountry.name}
        </span>
      )}
    </div>
  )
}
