import type { CountryCode } from 'libphonenumber-js'

export interface Country {
  code: CountryCode
  name: string
  dialCode: string
  flag: string
}

// Derives the flag emoji from a 2-letter ISO country code
function flag(code: string): string {
  return [...code.toUpperCase()]
    .map(c => String.fromCodePoint(0x1f1e6 + c.charCodeAt(0) - 65))
    .join('')
}

export const COUNTRIES: Country[] = [
  { code: 'IN', name: 'India',                dialCode: '+91',  flag: flag('IN') },
  { code: 'US', name: 'United States',        dialCode: '+1',   flag: flag('US') },
  { code: 'GB', name: 'United Kingdom',       dialCode: '+44',  flag: flag('GB') },
  { code: 'CA', name: 'Canada',               dialCode: '+1',   flag: flag('CA') },
  { code: 'AU', name: 'Australia',            dialCode: '+61',  flag: flag('AU') },
  { code: 'AE', name: 'UAE',                  dialCode: '+971', flag: flag('AE') },
  { code: 'SA', name: 'Saudi Arabia',         dialCode: '+966', flag: flag('SA') },
  { code: 'SG', name: 'Singapore',            dialCode: '+65',  flag: flag('SG') },
  { code: 'JP', name: 'Japan',                dialCode: '+81',  flag: flag('JP') },
  { code: 'CN', name: 'China',                dialCode: '+86',  flag: flag('CN') },
  { code: 'KR', name: 'South Korea',          dialCode: '+82',  flag: flag('KR') },
  { code: 'HK', name: 'Hong Kong',            dialCode: '+852', flag: flag('HK') },
  { code: 'TW', name: 'Taiwan',               dialCode: '+886', flag: flag('TW') },
  { code: 'MY', name: 'Malaysia',             dialCode: '+60',  flag: flag('MY') },
  { code: 'TH', name: 'Thailand',             dialCode: '+66',  flag: flag('TH') },
  { code: 'PH', name: 'Philippines',          dialCode: '+63',  flag: flag('PH') },
  { code: 'ID', name: 'Indonesia',            dialCode: '+62',  flag: flag('ID') },
  { code: 'VN', name: 'Vietnam',              dialCode: '+84',  flag: flag('VN') },
  { code: 'PK', name: 'Pakistan',             dialCode: '+92',  flag: flag('PK') },
  { code: 'BD', name: 'Bangladesh',           dialCode: '+880', flag: flag('BD') },
  { code: 'NP', name: 'Nepal',                dialCode: '+977', flag: flag('NP') },
  { code: 'LK', name: 'Sri Lanka',            dialCode: '+94',  flag: flag('LK') },
  { code: 'DE', name: 'Germany',              dialCode: '+49',  flag: flag('DE') },
  { code: 'FR', name: 'France',               dialCode: '+33',  flag: flag('FR') },
  { code: 'IT', name: 'Italy',                dialCode: '+39',  flag: flag('IT') },
  { code: 'ES', name: 'Spain',                dialCode: '+34',  flag: flag('ES') },
  { code: 'NL', name: 'Netherlands',          dialCode: '+31',  flag: flag('NL') },
  { code: 'CH', name: 'Switzerland',          dialCode: '+41',  flag: flag('CH') },
  { code: 'SE', name: 'Sweden',               dialCode: '+46',  flag: flag('SE') },
  { code: 'NO', name: 'Norway',               dialCode: '+47',  flag: flag('NO') },
  { code: 'DK', name: 'Denmark',              dialCode: '+45',  flag: flag('DK') },
  { code: 'FI', name: 'Finland',              dialCode: '+358', flag: flag('FI') },
  { code: 'PL', name: 'Poland',               dialCode: '+48',  flag: flag('PL') },
  { code: 'PT', name: 'Portugal',             dialCode: '+351', flag: flag('PT') },
  { code: 'AT', name: 'Austria',              dialCode: '+43',  flag: flag('AT') },
  { code: 'BE', name: 'Belgium',              dialCode: '+32',  flag: flag('BE') },
  { code: 'IE', name: 'Ireland',              dialCode: '+353', flag: flag('IE') },
  { code: 'TR', name: 'Turkey',               dialCode: '+90',  flag: flag('TR') },
  { code: 'RU', name: 'Russia',               dialCode: '+7',   flag: flag('RU') },
  { code: 'UA', name: 'Ukraine',              dialCode: '+380', flag: flag('UA') },
  { code: 'IL', name: 'Israel',               dialCode: '+972', flag: flag('IL') },
  { code: 'BR', name: 'Brazil',               dialCode: '+55',  flag: flag('BR') },
  { code: 'MX', name: 'Mexico',               dialCode: '+52',  flag: flag('MX') },
  { code: 'AR', name: 'Argentina',            dialCode: '+54',  flag: flag('AR') },
  { code: 'ZA', name: 'South Africa',         dialCode: '+27',  flag: flag('ZA') },
  { code: 'NG', name: 'Nigeria',              dialCode: '+234', flag: flag('NG') },
  { code: 'KE', name: 'Kenya',                dialCode: '+254', flag: flag('KE') },
  { code: 'EG', name: 'Egypt',                dialCode: '+20',  flag: flag('EG') },
  { code: 'GH', name: 'Ghana',                dialCode: '+233', flag: flag('GH') },
  { code: 'NZ', name: 'New Zealand',          dialCode: '+64',  flag: flag('NZ') },
]

export function getCountry(code: CountryCode): Country {
  return COUNTRIES.find(c => c.code === code) ?? COUNTRIES[0]
}
