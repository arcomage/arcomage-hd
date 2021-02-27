import React from 'react'
import cx from 'classnames'
import { createUseStyles } from 'react-jss'
import useGameSize from '../utils/useGameSize'

import wall from '../../assets/img/wall.png'

const goal = 100

const calcBaseRatio = (height: number): string =>
  `(${height}px - (1.75rem + 0.25rem * 2)) / (282 + 600)`

const heightByCurrent = (height: number, current: number): string =>
  `calc(${calcBaseRatio(height)} * 597 * ${current / goal})`

const useStyles = createUseStyles({
  main: {
    width: (height) => `calc(${calcBaseRatio(height)} * 72 + 1rem * 2)`,
  },
  wallwrapper: {
    height: (height) => heightByCurrent(height, goal),
    bottom: 'calc(1.75rem + 0.25rem * 2)',
  },
  wallbody: {
    background: {
      image: `url(${wall})`,
      repeat: 'repeat-y',
      size: '100%',
      position: 'center 0',
    },
    width: (height) => `calc(${calcBaseRatio(height)} * 72)`,
    'max-height': (height) => `calc(${calcBaseRatio(height)} * 597)`,
  },
})

type WallProps = {
  current: number
  isOpponent?: boolean
}
const Wall = ({ current, isOpponent = false }: WallProps) => {
  const size = useGameSize()
  const height = (size.height / 3) * 2

  const classes = useStyles(height)
  return (
    <div
      className={cx(
        'h-full mx-4 relative z-20',
        `float-${isOpponent ? 'right' : 'left'}`,
        classes.main
      )}
    >
      <div className={cx('w-full absolute px-4', classes.wallwrapper)}>
        <div
          className={cx('absolute bottom-0', classes.wallbody)}
          style={{ height: heightByCurrent(height, current) }}
        ></div>
      </div>
      <div className="bg-black bg-opacity-50 p-1 shadow-lg w-full absolute bottom-0">
        <div className="border border-yellow-400 border-opacity-25 text-yellow-400 text-center h-7 leading-7 font-mono">
          {current}
        </div>
      </div>
    </div>
  )
}

export default Wall
