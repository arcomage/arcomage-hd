import React from 'react'
import cx from 'classnames'
import { createUseStyles } from 'react-jss'
import useGameSize from '../utils/useGameSize'

import { useDispatch } from 'react-redux'
import { EXEC_CARD } from '../constants/ActionTypes'

import i18nCardsEn from '../../src/i18n/cards.en'
import dataCards from '../../src/data/cards'

import noise from '../../assets/img/noise.png'
import cardbackbg from '../../assets/img/cardback.png'
import brick from '../../assets/img/brick.svg'
import gem from '../../assets/img/gem.svg'
import recruit from '../../assets/img/recruit.svg'

const heightPercToTable = 0.8
const whRatio = 188 / 252
const marginSpacingXRatio = 1.5
const minSpacingXPx = 5
const topCardSpacingPx = 10
const topCardMarginTop = '1rem'
const middleCardMarginBottom = '1rem'

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

const useStyles = createUseStyles({
  main: {
    'background-image': ({ n }) => `url(${n === -1 ? cardbackbg : noise})`,
    'background-size': ({ n }) => (n === -1 ? 'cover' : 'initial'),
    'background-position': ({ n }) => (n === -1 ? 'center' : 'initial'),
    'background-repeat': ({ n }) => (n === -1 ? 'no-repeat' : 'initial'),
    width: ({ winHeight, winWidth, total }) =>
      `${getWidth(winHeight / 3, winWidth, total)}px`,
    height: ({ winHeight, winWidth, total }) =>
      `${getHeight(winHeight / 3, winWidth, total)}px`,
    top: ({ winHeight, winWidth, total, position }) => {
      if (position >= 0) {
        return `${
          (winHeight / 3) * 2 +
          (winHeight / 3 - getHeight(winHeight / 3, winWidth, total)) / 2
        }px`
      } else if (position === -5) {
        return `calc(${
          (winHeight / 3) * 2 - getHeight(winHeight / 3, winWidth, total)
        }px - ${middleCardMarginBottom})`
      } else {
        return topCardMarginTop
      }
    },
    left: ({ winHeight, winWidth, total, position }) => {
      if (position >= 0) {
        return `${
          getMarginX(winWidth, total, winHeight / 3) +
          (getWidth(winHeight / 3, winWidth, total) +
            getSpacingX(winWidth, total, winHeight / 3)) *
            position
        }px`
      } else if (position === -5) {
        return `${
          winWidth / 2 - getWidth(winHeight / 3, winWidth, total) / 2
        }px`
      } else {
        return `${
          winWidth / 2 -
          (getWidth(winHeight / 3, winWidth, total) * (position + 3) -
            (1 / 2 - 3 - position) * topCardSpacingPx)
        }px`
      }
    },
  },
  image: {
    // width: calc(100% - 0.25rem * 2),
    height: 'calc((100% / 63 * 47 - 0.5rem) / 22 * 13)',
  },
  text: {
    // width: calc(100% - 0.25rem * 2),
    height:
      'calc(100% - (1.25rem + 0.25rem + 0.25rem) - (0.5rem + 0.5rem) - (100% / 63 * 47 - 0.5rem) / 22 * 13)',
  },
  resbg: {
    'background-image': ({ type }) => `url(${[brick, gem, recruit][type]})`,
    background: {
      repeat: 'no-repeat',
      size: 'cover',
      position: 'center center',
    },
    opacity: 0.35,
  },
  condensed: {
    font: {
      family: 'RobotoCondensed',
      weight: 'bold',
    },
  },
})

const cardCountPerType = 34

type PropType = {
  n: number // .. | -1: cardback
  discarded?: boolean
  position: number // 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | -1 | -2 | -3 | -4 | -5
  total: number // 4 | 5 | 6 | 7 | 8
}
const Card = ({ n, discarded = false, position, total }: PropType) => {
  const dispatch = useDispatch()
  const size = useGameSize()
  const winHeight = size.height
  const winWidth = size.width

  if (n === -1) {
    const classes = useStyles({ n, winHeight, winWidth, total, position })
    return (
      <div
        className={cx(
          classes.main,
          'transition duration-300 ease-out transform absolute cursor-pointer rounded shadow-lg',
        )}
      ></div>
    )
  } else {
    const type = dataCards[n].type
    const classes = useStyles({ type, winHeight, winWidth, total, position })
    const color = ['red', 'blue', 'green'][type]
    // Force TailwindCSS to aware of these classes:
    // bg-red-200
    // bg-blue-200
    // bg-green-200
    // bg-red-300
    // bg-blue-300
    // bg-green-300
    return (
      <div
        className={cx(
          classes.main,
          'transition duration-300 ease-out transform hover:scale-105 absolute cursor-pointer rounded shadow-lg',
          `bg-${color}-300`,
        )}
        onClick={() => {
          dispatch({
            type: EXEC_CARD,
            n,
          })
        }}
      >
        <div
          className={cx(
            classes.image,
            classes.condensed,
            'm-1 shadow bg-no-repeat bg-cover bg-center flex justify-center items-center text-red-600 text-xl font-bold uppercase text-shadow-stroke',
          )}
          style={{
            backgroundImage: `url("assets/img/cards/${dataCards[
              n
            ].type.toString()}_${(n % cardCountPerType).toString()}.png")`,
          }}
        >
          {discarded && 'discarded'}
        </div>
        <div
          className={cx(
            classes.text,
            'm-2 flex flex-wrap content-center justify-center',
          )}
        >
          <div className="leading-none break-words text-center">
            {i18nCardsEn[n].desc}
          </div>
        </div>
        <div className="absolute bottom-1 right-1 w-9 h-9 leading-9 text-center font-bold">
          <div
            className={cx(classes.resbg, 'absolute top-0 left-0 w-full h-full')}
          ></div>
          <div className="absolute top-0 left-0 w-full h-full">
            {dataCards[n].cost}
          </div>
        </div>
      </div>
    )
  }
}

export default Card
