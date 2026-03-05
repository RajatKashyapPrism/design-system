export interface PhoneFormat {
  maxDigits: number
  format: (digits: string) => string
  validate: (digits: string) => boolean
  validationMessage: string
}

// Helpers
const chunk = (s: string, ...sizes: number[]): string => {
  const parts: string[] = []
  let i = 0
  for (const size of sizes) {
    if (i >= s.length) break
    parts.push(s.slice(i, i + size))
    i += size
  }
  return parts.join(' ')
}

const FORMATS: Record<string, PhoneFormat> = {
  // ── North America ──────────────────────────────────────────────────────────
  '+1': {
    maxDigits: 10,
    format: (d) => {
      if (d.length <= 3) return d
      if (d.length <= 6) return `(${d.slice(0, 3)}) ${d.slice(3)}`
      return `(${d.slice(0, 3)}) ${d.slice(3, 6)}-${d.slice(6, 10)}`
    },
    validate: (d) => d.length === 10,
    validationMessage: 'Enter a 10-digit US/Canada number.',
  },

  // ── India ──────────────────────────────────────────────────────────────────
  '+91': {
    maxDigits: 10,
    format: (d) => {
      if (d.length <= 5) return d
      return `${d.slice(0, 5)} ${d.slice(5, 10)}`
    },
    validate: (d) => d.length === 10 && /^[6-9]/.test(d),
    validationMessage: 'Enter a valid 10-digit Indian mobile number starting with 6–9.',
  },

  // ── United Kingdom ─────────────────────────────────────────────────────────
  '+44': {
    maxDigits: 10,
    format: (d) => {
      if (d.length <= 4) return d
      return `${d.slice(0, 4)} ${d.slice(4, 10)}`
    },
    validate: (d) => d.length === 10,
    validationMessage: 'Enter a valid 10-digit UK number.',
  },

  // ── Germany ────────────────────────────────────────────────────────────────
  '+49': {
    maxDigits: 11,
    format: (d) => {
      if (d.length <= 3) return d
      return `${d.slice(0, 3)} ${d.slice(3, 11)}`
    },
    validate: (d) => d.length >= 10 && d.length <= 11,
    validationMessage: 'Enter a valid German number (10–11 digits).',
  },

  // ── France ─────────────────────────────────────────────────────────────────
  '+33': {
    maxDigits: 9,
    format: (d) => chunk(d, 2, 2, 2, 2, 2).trimEnd(),
    validate: (d) => d.length === 9,
    validationMessage: 'Enter a valid 9-digit French number.',
  },

  // ── Netherlands ────────────────────────────────────────────────────────────
  '+31': {
    maxDigits: 9,
    format: (d) => {
      if (d.length <= 2) return d
      return `${d.slice(0, 2)} ${d.slice(2, 9)}`
    },
    validate: (d) => d.length === 9,
    validationMessage: 'Enter a valid 9-digit Dutch number.',
  },

  // ── Spain ──────────────────────────────────────────────────────────────────
  '+34': {
    maxDigits: 9,
    format: (d) => chunk(d, 3, 3, 3).trimEnd(),
    validate: (d) => d.length === 9,
    validationMessage: 'Enter a valid 9-digit Spanish number.',
  },

  // ── Italy ──────────────────────────────────────────────────────────────────
  '+39': {
    maxDigits: 10,
    format: (d) => chunk(d, 3, 3, 4).trimEnd(),
    validate: (d) => d.length >= 9 && d.length <= 10,
    validationMessage: 'Enter a valid Italian number (9–10 digits).',
  },

  // ── Ireland ────────────────────────────────────────────────────────────────
  '+353': {
    maxDigits: 9,
    format: (d) => chunk(d, 3, 3, 4).trimEnd(),
    validate: (d) => d.length === 9,
    validationMessage: 'Enter a valid 9-digit Irish number.',
  },

  // ── Portugal ───────────────────────────────────────────────────────────────
  '+351': {
    maxDigits: 9,
    format: (d) => chunk(d, 3, 3, 3).trimEnd(),
    validate: (d) => d.length === 9,
    validationMessage: 'Enter a valid 9-digit Portuguese number.',
  },
}

export function getPhoneFormat(dialCode: string): PhoneFormat | null {
  return FORMATS[dialCode] ?? null
}
