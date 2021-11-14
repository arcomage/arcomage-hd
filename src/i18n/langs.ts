import { keys } from '../utils/typeHelpers'

export const langInfo = {
  en: { local: 'English', en: 'English', isLatinScript: true },
  fr: { local: 'Français', en: 'French', isLatinScript: true },
  de: { local: 'Deutsch', en: 'German', isLatinScript: true },
  'zh-Hans': { local: '简体中文', en: 'Simplified Chinese', isLatinScript: false },
  'zh-Hant': { local: '繁體中文', en: 'Traditional Chinese', isLatinScript: false },
  ru: { local: 'Русский', en: 'Russian', isLatinScript: false },
  pl: { local: 'Polski', en: 'Polish', isLatinScript: true },
  es: { local: 'Español', en: 'Spanish', isLatinScript: true },
  it: { local: 'Italiano', en: 'Italian', isLatinScript: true },
  cs: { local: 'Čeština', en: 'Czech', isLatinScript: true },
  'pt-BR': { local: 'Português (Brasil)', en: 'Brazilian Portuguese', isLatinScript: true },
  ja: { local: '日本語', en: 'Japanese', isLatinScript: false },
  uk: { local: 'Українська', en: 'Ukrainian', isLatinScript: false },
}

export const langs = keys(langInfo)

export const defaultLang = 'en' as const
