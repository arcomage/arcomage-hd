import React, { useState, useEffect, createContext, useContext } from 'react'
import { GameSizeContext } from './GameSizeContext'

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
    // eslint-disable-next-line @typescript-eslint/no-use-before-define
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
export type CardPosType = {
  width: number
  height: number
  total: number
  top: number[]
  left: number[]
  topM1: number[]
  leftM1: number[]
}

// const defaultCardPos: CardPosType = {
//   width: 0,
//   height: 0,
//   total: 0,
//   top: [],
//   left: [],
//   topM1: [],
//   leftM1: [],
// }

export const CardPosContext = createContext<CardPosType | null>(null)

type PropType = {
  cardsInHand: number
  winHeight: number
  winWidth: number
  children: React.ReactNode
}
export const CardPosProvider = ({
  cardsInHand,
  winHeight,
  winWidth,
  children,
}: PropType) => {
  const [cardPos, setCardPos] = useState<CardPosType | null>(null)

  const size = useContext(GameSizeContext)
  const { narrowMobile } = size

  useEffect(() => {
    const total = cardsInHand + 1
    const rangeArr = [...Array(total + 5).keys()]

    const tablePHeight = winHeight * (narrowMobile ? 1 / 2 : 1 / 3)

    const width = getWidth(tablePHeight, winWidth, total)

    const height = getHeight(tablePHeight, winWidth, total)

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

    setCardPos({
      width,
      height,
      total,
      top,
      left,
      topM1,
      leftM1,
    })
  }, [cardsInHand, winHeight, winWidth, narrowMobile])

  return (
    <CardPosContext.Provider value={cardPos}>
      {children}
    </CardPosContext.Provider>
  )
}
