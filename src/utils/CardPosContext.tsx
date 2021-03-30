import React, { useState, useLayoutEffect, createContext } from 'react'

const heightPercToTable = 0.8
const whRatio = 188 / 252
const marginSpacingXRatio = 1.5
const minSpacingXPx = 5
const topCardSpacingPx = 10
const topCardMarginTop = 16 // '1rem' in px
const middleCardMarginBottom = 16 // '1rem' in px

const useWidth = (
  tableHeight: number,
  tableWidth: number,
  total: number,
): boolean =>
  tableHeight * heightPercToTable * whRatio * total +
    (minSpacingXPx * (total - 1) + minSpacingXPx * marginSpacingXRatio) <=
  tableWidth

const getHeight = (
  tableHeight: number,
  tableWidth: number,
  total: number,
): number => {
  if (useWidth(tableHeight, tableWidth, total)) {
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
  if (useWidth(tableHeight, tableWidth, total)) {
    return getHeight(tableHeight, tableWidth, total) * whRatio
  } else {
    return (
      (tableWidth -
        (minSpacingXPx * (total - 1) + minSpacingXPx * marginSpacingXRatio)) /
      total
    )
  }
}

const getSpacingX = (
  winWidth: number,
  total: number,
  tableHeight: number,
): number => {
  if (useWidth(tableHeight, winWidth, total)) {
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

const positionTopMapFunc = (
  total: number,
  winHeight: number,
  winWidth: number,
) => (position: number) => {
  const realPosition = position - 5
  if (realPosition >= 0) {
    return (
      (winHeight / 3) * 2 +
      (winHeight / 3 - getHeight(winHeight / 3, winWidth, total)) / 2
    )
  } else if (realPosition === -5) {
    return (
      (winHeight / 3) * 2 -
      getHeight(winHeight / 3, winWidth, total) -
      middleCardMarginBottom
    )
  } else {
    return topCardMarginTop
  }
}

const positionLeftMapFunc = (
  total: number,
  winHeight: number,
  winWidth: number,
) => (position: number) => {
  const realPosition = position - 5
  if (realPosition >= 0) {
    return (
      getMarginX(winWidth, total, winHeight / 3) +
      (getWidth(winHeight / 3, winWidth, total) +
        getSpacingX(winWidth, total, winHeight / 3)) *
        realPosition
    )
  } else if (realPosition === -5) {
    return winWidth / 2 - getWidth(winHeight / 3, winWidth, total) / 2
  } else {
    return (
      winWidth / 2 -
      (getWidth(winHeight / 3, winWidth, total) * (realPosition + 3) -
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

  useLayoutEffect(() => {
    const total = cardsInHand + 1
    const rangeArr = [...Array(total + 5).keys()]

    const width = getWidth(winHeight / 3, winWidth, total)

    const height = getHeight(winHeight / 3, winWidth, total)

    // index in the top, topM1, left, leftM1 arrays is not the real position, it needs to add 5
    const top = rangeArr.map(positionTopMapFunc(total, winHeight, winWidth))
    const topM1 = rangeArr.map(
      positionTopMapFunc(total - 1, winHeight, winWidth),
    )

    const left = rangeArr.map(positionLeftMapFunc(total, winHeight, winWidth))
    const leftM1 = rangeArr.map(
      positionLeftMapFunc(total - 1, winHeight, winWidth),
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
  }, [cardsInHand, winHeight, winWidth])

  return (
    <CardPosContext.Provider value={cardPos}>
      {children}
    </CardPosContext.Provider>
  )
}
