export const minGeneratorIsOne = true
// if false, then minimum generator (production) is 0
// see #39

export const maxCardsInHand = 15
// see also defaultSettings.cardsInHand

export const minVolume = 0
export const maxVolume = 10
export const stepVolume = 0.1
// see also defaultVolume

export const minPixelation = 0
export const maxPixelation = 12
export const stepPixelation = 1
// see also defaultPixelation

export const rangeVisualvalues = {
  brightness: {
    min: 0.3,
    max: 3,
    step: 0.1,
  },
  contrast: {
    min: 0.2,
    max: 3,
    step: 0.1,
  },
  grayscale: {
    min: 0,
    max: 1,
    step: 0.01,
  },
  sepia: {
    min: 0,
    max: 1,
    step: 0.01,
  },
  saturate: {
    min: 0,
    max: 3,
    step: 0.1,
  },
  hue: {
    min: 0,
    max: 360,
    step: 1,
  },
  invert: {
    min: 0,
    max: 1,
    step: 0.01,
  },
  opacity: {
    min: 0.2,
    max: 1,
    step: 0.01,
  },
}

// see also defaultVisualvalues
