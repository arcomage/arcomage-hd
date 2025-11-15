import { keys } from '../utils/typeHelpers'

// prettier-ignore
export const langInfo = {
  en:        { local: 'English', en: 'English', isLatinScript: true, isRtl: false },
  fr:        { local: 'Français', en: 'French', isLatinScript: true, isRtl: false },
  de:        { local: 'Deutsch', en: 'German', isLatinScript: true, isRtl: false },
  'zh-Hans': { local: '简体中文', en: 'Simplified Chinese', isLatinScript: false, isRtl: false },
  'zh-Hant': { local: '繁體中文', en: 'Traditional Chinese', isLatinScript: false, isRtl: false },
  ru:        { local: 'Русский', en: 'Russian', isLatinScript: false, isRtl: false },
  pl:        { local: 'Polski', en: 'Polish', isLatinScript: true, isRtl: false },
  es:        { local: 'Español', en: 'Spanish', isLatinScript: true, isRtl: false },
  it:        { local: 'Italiano', en: 'Italian', isLatinScript: true, isRtl: false },
  cs:        { local: 'Čeština', en: 'Czech', isLatinScript: true, isRtl: false },
  'pt-BR':   { local: 'Português (Brasil)', en: 'Brazilian Portuguese', isLatinScript: true, isRtl: false },
  ja:        { local: '日本語', en: 'Japanese', isLatinScript: false, isRtl: false },
  uk:        { local: 'Українська', en: 'Ukrainian', isLatinScript: false, isRtl: false },
  ar:        { local: 'العربية', en: 'Arabic', isLatinScript: false, isRtl: true },
  hu:        { local: 'Magyar', en: 'Hungarian', isLatinScript: true, isRtl: false },
}

export const langs = keys(langInfo)

export const defaultLang = 'en' as const // see alse imports in I18nContext.tsx
