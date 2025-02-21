import { minRootFontSize } from '../constants/visuals'

const whRatio = 156 / 216

export const getFontSize = (height: number, percentage: number): number => {
  const fontSizeTemp = height * percentage
  return Math.max(fontSizeTemp, minRootFontSize)
}

export const getLineHeight = (height: number, percentage: number): number =>
  getFontSize(height, percentage) * 1.2

export const calcProdHeight = (height: number): string =>
  `(${height}px - 1.25rem * 2 - (1.75rem + 0.25rem * 2 + 1rem) - (0.25rem * 2 + ${getLineHeight(
    height,
    0.036,
  )}px + 0.25rem + 0.75rem) * 3) / 3`

export const calcStatusWidth = (height: number): string =>
  `${calcProdHeight(height)} / ${whRatio} + 0.25rem * 2 + 1.25rem * 2`
