import { VisualValuesFilterType, VisualValuesMainType } from '../types/state'

export type DataVisualvaluesMainType = {
  term: keyof VisualValuesMainType
  css: string
  en: string
  type: 'main'
}
export type DataVisualvaluesFilterType = {
  term: keyof VisualValuesFilterType
  css: string
  en: string
  type: 'filter'
}

export const dataVisualvalues: (
  | DataVisualvaluesMainType
  | DataVisualvaluesFilterType
)[] = [
  { term: 'brightness', css: 'brightness', en: 'Brightness', type: 'main' },
  { term: 'contrast', css: 'contrast', en: 'Contrast', type: 'main' },
  { term: 'grayscale', css: 'grayscale', en: 'Grayscale', type: 'main' },
  { term: 'sepia', css: 'sepia', en: 'Sepia', type: 'main' },
  { term: 'saturate', css: 'saturate', en: 'Saturate', type: 'main' },
  { term: 'hue', css: 'hue-rotate', en: 'Hue', type: 'main' },
  { term: 'invert', css: 'invert', en: 'Invert', type: 'main' },
  { term: 'opacity', css: 'opacity', en: 'Opacity', type: 'main' },
  { term: 'twist', css: 'twist', en: 'Twist', type: 'filter' },
  { term: 'grain', css: 'grain', en: 'Grain', type: 'filter' },
]

export const visualPresets = [
  {
    en: 'Normal',
    values: {},
  },
  {
    en: 'Vibrant',
    values: { saturate: 1.6, contrast: 1.1 },
  },
  {
    en: 'Gray',
    values: { grayscale: 1 },
  },
  {
    en: 'Nostalgia',
    values: {
      brightness: 1.1,
      contrast: 1.1,
      sepia: 0.5,
      saturate: 0.9,
    },
  },
  {
    en: 'Bright',
    values: { brightness: 1.4, contrast: 1.1 },
  },
  {
    en: 'Dark',
    values: { brightness: 0.6, contrast: 1.1 },
  },
]
