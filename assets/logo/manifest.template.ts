// prettier-ignore
export default {
  name: 'ArcoMage HD',
  short_name: 'ArcoMage HD',
  description:
    "Web-based open source HD clone of 3DO and NWC's 2000 card game Arcomage. Desktop or mobile Android iOS. Online or offline PWA. Multiplayer mode available",
  lang: 'en-US',
  display: 'standalone',
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
}
