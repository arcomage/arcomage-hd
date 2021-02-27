import React from 'react'
import cx from 'classnames'
import { createUseStyles } from 'react-jss'
import useGameSize from '../utils/useGameSize'

import tower from '../../assets/img/tower.png'
import towerRed from '../../assets/img/tower_red.png'
import towerBlue from '../../assets/img/tower_blue.png'

const calcBaseRatio = (height: number): string =>
  `(${height}px - (1.75rem + 0.25rem * 2)) / (282 + 600)`

const calcWidth = (height: number): string => `${calcBaseRatio(height)} * 204`

const calcPaddingX = (height: number): string =>
  `${calcBaseRatio(height)} * ((204 - 135) / 2)`

const heightByCurrent = (height: number, currentGoalRatio: number): string =>
  `calc((${calcWidth(height)} - ${calcPaddingX(
    height,
  )} * 2) / 135 * 600 * ${currentGoalRatio})`

const useStyles = createUseStyles({
  main: {
    width: ({ height }) => `calc(${calcWidth(height)})`,
  },
  towerwrapper: {
    height: ({ height }) => heightByCurrent(height, 1),
    bottom: 'calc(1.75rem + 0.25rem * 2)',
    'padding-left': ({ height }) => `calc(${calcPaddingX(height)})`,
    'padding-right': ({ height }) => `calc(${calcPaddingX(height)})`,
  },
  towerbody: {
    background: {
      image: `url(${tower})`,
      repeat: 'repeat-y',
      size: '100%',
      position: 'center 0',
    },
    width: ({ height }) => `calc(100% - ${calcPaddingX(height)} * 2)`,
    height: ({ height, current, goal }) =>
      heightByCurrent(height, current / goal),
    'max-height': ({ height }) => heightByCurrent(height, 1),
    '&:before': {
      content: '""',
      position: 'absolute',
      top: ({ height }) => `calc(0px - ${calcWidth(height)} / 204 * 282)`,
      left: ({ height }) => `calc(0px - ${calcPaddingX(height)})`,
      right: ({ height }) => `calc(0px - ${calcPaddingX(height)})`,
      width: ({ height }) => `calc(${calcWidth(height)})`,
      height: ({ height }) => `calc(${calcWidth(height)} / 204 * 282)`,
      display: 'block',
      background: {
        repeat: 'no-repeat',
        size: '100%',
        position: 'center 0',
      },
    },
  },
  towerbodyred: {
    '&:before': {
      background: {
        image: `url(${towerRed})`,
      },
    },
  },
  towerbodyblue: {
    '&:before': {
      background: {
        image: `url(${towerBlue})`,
      },
    },
  },
})

type TowerProps = {
  isOpponent?: boolean
  goal: number
  current: number
}
const Tower = ({ isOpponent = false, goal, current }: TowerProps) => {
  const size = useGameSize()
  const height = (size.height / 3) * 2

  const classes = useStyles({ height, current, goal })

  return (
    <div
      className={cx(
        'h-full mx-1 relative z-20',
        `float-${isOpponent ? 'right' : 'left'}`,
        classes.main,
      )}
    >
      <div className={cx('w-full absolute', classes.towerwrapper)}>
        <div
          className={cx(
            'absolute bottom-0',
            classes.towerbody,
            classes[isOpponent ? 'towerbodyblue' : 'towerbodyred'],
          )}
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

export default Tower
