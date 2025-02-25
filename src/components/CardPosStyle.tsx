import React, { useState, useEffect, useContext } from 'react'
import { GameSizeContext } from '@/utils/contexts/GameSizeContext'

const heightPercToTable = 0.8
const whRatio = 188 / 252
const marginSpacingXRatio = 1.5
const minSpacingXPx = 5
const topCardSpacingPx = 10
const topCardMarginTop = 16 // '1rem' in px
const middleCardMarginBottom = 16 // '1rem' in px

const shouldUseWidth = (
  tableHeight: number,
  tableWidth: number,
  total: number,
): boolean =>
  tableHeight * heightPercToTable * whRatio * total +
    (minSpacingXPx * (total - 1) + minSpacingXPx * marginSpacingXRatio * 2) <=
  tableWidth

const getHeight = (
  tableHeight: number,
  tableWidth: number,
  total: number,
): number => {
  if (shouldUseWidth(tableHeight, tableWidth, total)) {
    return tableHeight * heightPercToTable
  } else {
    return getWidth(tableHeight, tableWidth, total) / whRatio
  }
}

const getWidth = (
  tableHeight: number,
  tableWidth: number,
  total: number,
): number => {
  if (shouldUseWidth(tableHeight, tableWidth, total)) {
    return getHeight(tableHeight, tableWidth, total) * whRatio
  } else {
    return (
      (tableWidth -
        (minSpacingXPx * (total - 1) +
          minSpacingXPx * marginSpacingXRatio * 2)) /
      total
    )
  }
}

const getSpacingX = (
  winWidth: number,
  total: number,
  tableHeight: number,
): number => {
  if (shouldUseWidth(tableHeight, winWidth, total)) {
    return (
      (winWidth - getWidth(tableHeight, winWidth, total) * total) /
      (total - 1 + 2 * marginSpacingXRatio)
    )
  } else {
    return minSpacingXPx
  }
}

const getMarginX = (
  winWidth: number,
  total: number,
  tableHeight: number,
): number => getSpacingX(winWidth, total, tableHeight) * marginSpacingXRatio

const positionTopMapFunc =
  (total: number, winHeight: number, winWidth: number, narrowMobile: boolean) =>
  (position: number) => {
    const realPosition = position - 5
    if (realPosition >= 0) {
      return (
        winHeight * (narrowMobile ? 1 / 2 : 2 / 3) +
        (winHeight * (narrowMobile ? 1 / 2 : 1 / 3) -
          getHeight(
            winHeight * (narrowMobile ? 1 / 2 : 1 / 3),
            winWidth,
            total,
          )) /
          2
      )
    } else if (realPosition === -5) {
      return (
        winHeight * (narrowMobile ? 1 / 2 : 2 / 3) -
        getHeight(winHeight * (narrowMobile ? 1 / 2 : 1 / 3), winWidth, total) +
        middleCardMarginBottom * (narrowMobile ? 1 : -1)
      )
    } else {
      return topCardMarginTop
    }
  }

const positionLeftMapFunc =
  (total: number, winHeight: number, winWidth: number, narrowMobile: boolean) =>
  (position: number) => {
    const realPosition = position - 5
    if (realPosition >= 0) {
      return (
        getMarginX(
          winWidth,
          total,
          winHeight * (narrowMobile ? 1 / 2 : 1 / 3),
        ) +
        (getWidth(winHeight * (narrowMobile ? 1 / 2 : 1 / 3), winWidth, total) +
          getSpacingX(
            winWidth,
            total,
            winHeight * (narrowMobile ? 1 / 2 : 1 / 3),
          )) *
          realPosition
      )
    } else if (realPosition === -5) {
      return (
        winWidth / 2 -
        getWidth(winHeight * (narrowMobile ? 1 / 2 : 1 / 3), winWidth, total) /
          2
      )
    } else {
      return (
        winWidth / 2 -
        (getWidth(winHeight * (narrowMobile ? 1 / 2 : 1 / 3), winWidth, total) *
          (realPosition + 3) -
          (1 / 2 - 3 - realPosition) * topCardSpacingPx)
      )
    }
  }

// in px
// export type CardPosType = {
//   width: number
//   height: number
//   total: number
//   top: number[]
//   left: number[]
//   topM1: number[]
//   leftM1: number[]
// }

// const defaultCardPos: CardPosType = {
//   width: 0,
//   height: 0,
//   total: 0,
//   top: [],
//   left: [],
//   topM1: [],
//   leftM1: [],
// }

// export const CardPosContext = createContext<CardPosType | null>(null)

type PropType = {
  cardsInHand: number
  winHeight: number
  winWidth: number
}
const CardPosStyle = ({ cardsInHand, winHeight, winWidth }: PropType) => {
  const [css, setCss] = useState('')

  const size = useContext(GameSizeContext)
  const { narrowMobile } = size

  useEffect(() => {
    const total = cardsInHand + 1
    const rangeArr = [...Array(total + 5).keys()]

    const zoneCardsHeight = winHeight * (narrowMobile ? 1 / 2 : 1 / 3)

    const width = getWidth(zoneCardsHeight, winWidth, total)

    const height = getHeight(zoneCardsHeight, winWidth, total)

    // index in the top, topM1, left, leftM1 arrays is not the real position, it needs to add 5
    const top = rangeArr.map(
      positionTopMapFunc(total, winHeight, winWidth, narrowMobile),
    )
    const topM1 = rangeArr.map(
      positionTopMapFunc(total - 1, winHeight, winWidth, narrowMobile),
    )

    const left = rangeArr.map(
      positionLeftMapFunc(total, winHeight, winWidth, narrowMobile),
    )
    const leftM1 = rangeArr.map(
      positionLeftMapFunc(total - 1, winHeight, winWidth, narrowMobile),
    )

    let _css = `
.endscreen-review-cards-btn {
  width: ${width}px;
  height: 3em;
  line-height: 1.1em;
  top: calc(${top[4]}px + (${height}px - 3em) / 2);
  left: ${left[4]}px;
}
.card {
  --cardwidth: ${width}px;
  width: ${width}px;
  height: ${height}px;
  font-size: ${width * 0.094}px;
}`

    const posCsses = [-5, -4, -3, -2, -1].map(
      (pos) => `
.card-pos-${pos} {
  top: ${top[pos + 5]}px;
  left: ${left[pos + 5]}px;
}`,
    )

    for (let i = 5, len = top.length; i < len; i++) {
      posCsses.push(`
.card-pos-m0.card-pos-${i - 5} {
  top: ${top[i]}px;
  left: ${left[i]}px;
}`)
    }

    for (let i = 5, len = topM1.length; i < len; i++) {
      posCsses.push(`
.card-pos-m1.card-pos-${i - 5} {
  top: ${topM1[i]}px;
  left: ${leftM1[i]}px;
}`)
    }

    _css += posCsses.join('')

    setCss(_css)
  }, [cardsInHand, winHeight, winWidth, narrowMobile])

  return <style>{css}</style>
}

export default CardPosStyle
