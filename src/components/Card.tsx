import React from 'react'
import cx from 'classnames'
import { createUseStyles } from 'react-jss'
import useGameSize from '../utils/useGameSize'

import noise from '../../assets/img/noise.png'
import brick from '../../assets/img/brick.svg'
import gem from '../../assets/img/gem.svg'
import recruit from '../../assets/img/recruit.svg'

const heightPercToTable = 0.8
const whRatio = 188 / 252
const marginSpacingXRatio = 1.5
const minSpacingXPx = 5

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
    background: {
      image: `url(${noise})`,
    },
    width: ({ winHeight, winWidth, total }) =>
      `${getWidth(winHeight / 3, winWidth, total)}px`,
    height: ({ winHeight, winWidth, total }) =>
      `${getHeight(winHeight / 3, winWidth, total)}px`,
    top: ({ winHeight, winWidth, total }) =>
      `${
        (winHeight / 3) * 2 +
        (winHeight / 3 - getHeight(winHeight / 3, winWidth, total)) / 2
      }px`,
    left: ({ winHeight, winWidth, total, position }) =>
      `${
        getMarginX(winWidth, total, winHeight / 3) +
        (getWidth(winHeight / 3, winWidth, total) +
          getSpacingX(winWidth, total, winHeight / 3)) *
          (position - 1)
      }px`,
  },
  image: {
    // width: calc(100% - 0.25rem * 2),
    height: 'calc((100% / 63 * 47 - 0.5rem) / 22 * 13)',
  },
  text: {
    // width: calc(100% - 0.25rem * 2),
    height: 'calc(100% - 2.25rem - (100% / 63 * 47 - 0.5rem) / 22 * 13)',
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
})

const cardCountPerType = 34

type CardProps = {
  n: number
  unusable?: boolean
  position: number
  total: number
}
const Card = ({ n, unusable, position, total }: CardProps) => {
  const size = useGameSize()
  const winHeight = size.height
  const winWidth = size.width
  const type = Math.floor(n / cardCountPerType)
  const classes = useStyles({ type, winHeight, winWidth, total, position })
  const color = ['red', 'blue', 'green'][type]
  // Make TailwindCSS aware of these classes:
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
        'transition duration-300 ease-in-out transform hover:scale-105 absolute cursor-pointer rounded shadow-lg select-none',
        `bg-${color}-300`,
      )}
    >
      <div
        className={cx(
          'm-1 shadow text-center font-bold leading-5 h-5',
          `bg-${color}-200`,
        )}
      >
        ABC ABC
      </div>
      <div
        className={cx(
          classes.image,
          'm-1 shadow bg-no-repeat bg-cover bg-center',
        )}
        style={{
          backgroundImage: `url("assets/img/cards/${Math.floor(
            n / cardCountPerType,
          ).toString()}_${(n % cardCountPerType).toString()}.png")`,
        }}
      ></div>
      <div
        className={cx(
          classes.text,
          'm-1 leading-none break-words text-center flex flex-wrap content-center',
        )}
      >
        ABC ABCABC ABCABC ABC Blanditi
      </div>
      <div className="absolute bottom-1 right-1 w-9 h-9 leading-9 text-center font-bold">
        <div
          className={cx(classes.resbg, 'absolute top-0 left-0 w-full h-full')}
        ></div>
        <div className="absolute top-0 left-0 w-full h-full">99</div>
      </div>
    </div>
  )
}

export default Card
