import React from 'react'
import cx from 'classnames'
import { createUseStyles } from 'react-jss'
import useGameSize from '../utils/useGameSize'

import noise from '../../assets/img/noise.png'

const useStyles = createUseStyles({
  main: {
    background: {
      image: `url(${noise})`,
    },
  },
  image: {
    // width: calc(100% - 0.5rem),
    height: 'calc((100% / 63 * 47 - 0.5rem) / 22 * 13)',
  },
  text: {
    // width: calc(100% - 0.5rem),
    height: 'calc(100% - 2.25rem - (100% / 63 * 47 - 0.5rem) / 22 * 13)',
  },
  res: {
    background: {
      image:
        'radial-gradient(circle at 35% 35%, rgba(255, 255, 255, 0.5), rgba(0, 0, 0, 0.5))',
    },
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
  const classes = useStyles()
  const color = ['red', 'blue', 'green'][Math.floor(n / cardCountPerType)]
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
        'transition duration-300 ease-in-out transform hover:scale-105 absolute cursor-pointer',
        `bg-${color}-300`,
      )}
      style={{
        width: '188px',
        height: '252px',
      }}
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
      <div
        className={cx(
          classes.res,
          'absolute bottom-1 right-1 w-7 h-7 leading-7 rounded-full text-center font-bold',
        )}
      >
        9
      </div>
    </div>
  )
}

export default Card
