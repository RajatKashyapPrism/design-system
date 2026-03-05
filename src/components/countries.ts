export interface Country {
  name: string
  code: string       // ISO 3166-1 alpha-2
  dialCode: string   // e.g. '+1'
  flag: string       // emoji flag
}

export const COUNTRIES: Country[] = [
  { name: 'United States',      code: 'US', dialCode: '+1',   flag: '🇺🇸' },
  { name: 'United Kingdom',     code: 'GB', dialCode: '+44',  flag: '🇬🇧' },
  { name: 'India',              code: 'IN', dialCode: '+91',  flag: '🇮🇳' },
  { name: 'Canada',             code: 'CA', dialCode: '+1',   flag: '🇨🇦' },
  { name: 'Australia',          code: 'AU', dialCode: '+61',  flag: '🇦🇺' },
  { name: 'Germany',            code: 'DE', dialCode: '+49',  flag: '🇩🇪' },
  { name: 'France',             code: 'FR', dialCode: '+33',  flag: '🇫🇷' },
  { name: 'Netherlands',        code: 'NL', dialCode: '+31',  flag: '🇳🇱' },
  { name: 'Spain',              code: 'ES', dialCode: '+34',  flag: '🇪🇸' },
  { name: 'Italy',              code: 'IT', dialCode: '+39',  flag: '🇮🇹' },
  { name: 'Ireland',            code: 'IE', dialCode: '+353', flag: '🇮🇪' },
  { name: 'Portugal',           code: 'PT', dialCode: '+351', flag: '🇵🇹' },
  { name: 'Japan',              code: 'JP', dialCode: '+81',  flag: '🇯🇵' },
  { name: 'China',              code: 'CN', dialCode: '+86',  flag: '🇨🇳' },
  { name: 'Singapore',          code: 'SG', dialCode: '+65',  flag: '🇸🇬' },
  { name: 'New Zealand',        code: 'NZ', dialCode: '+64',  flag: '🇳🇿' },
  { name: 'Brazil',             code: 'BR', dialCode: '+55',  flag: '🇧🇷' },
  { name: 'Mexico',             code: 'MX', dialCode: '+52',  flag: '🇲🇽' },
  { name: 'United Arab Emirates', code: 'AE', dialCode: '+971', flag: '🇦🇪' },
  { name: 'Saudi Arabia',       code: 'SA', dialCode: '+966', flag: '🇸🇦' },
  { name: 'South Africa',       code: 'ZA', dialCode: '+27',  flag: '🇿🇦' },
  { name: 'Nigeria',            code: 'NG', dialCode: '+234', flag: '🇳🇬' },
  { name: 'Kenya',              code: 'KE', dialCode: '+254', flag: '🇰🇪' },
  { name: 'Pakistan',           code: 'PK', dialCode: '+92',  flag: '🇵🇰' },
  { name: 'Bangladesh',         code: 'BD', dialCode: '+880', flag: '🇧🇩' },
]
