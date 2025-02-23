import { origDesc, origTitle } from '../../src/constants/htmlVars'
import { defaultLang } from '../../src/i18n/langs'

// prettier-ignore
export default {
  name: origTitle,
  short_name: origTitle,
  description: origDesc,
  lang: defaultLang,
  display: 'fullscreen',
  orientation: 'landscape',
  start_url: './',
  scope: '.',
  background_color: '#000',
  theme_color: '#000',
  faviconSvgToPngSizes: [36, 72, 96, 120, 128, 144, 152, 180, 192, 384],
  logoSvgToPngSizes: [512],
  faviconMaskableSvgSizes: [36, 48, 57, 60, 72, 76, 96, 114, 120, 128, 144, 152, 180, 192, 256, 384],
  logoMaskableSvgSizes: [512],
  iconNames: {
    faviconSvg: 'favicon.svg',
    faviconPng: 'favicon-%s.png',
    faviconMaskableSvg: 'favicon_maskable.svg',
    logoSvg: 'favicon_logo.svg',
    logoPng: 'favicon_logo-%s.png',
    logoMaskableSvg: 'favicon_logo_maskable.svg',
  }
} as const
