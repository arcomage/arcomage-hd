import React, { memo, useContext } from 'react'
import cx from 'classnames'
import { createUseStyles } from 'react-jss'
import { GameSizeContext } from '../utils/GameSizeContext'
import AnimatedNumber from './effects/AnimatedNumber'
import NumberDiff from './effects/NumberDiff'
import NumberChangeVisual from './effects/NumberChangeVisual'
import { maxWallOnScreen } from '../constants/visuals'

import wall from '../../assets/img/wall.png'
import { I18nContext } from '../i18n/I18nContext'

const calcBaseRatio = (height: number): string =>
  `(${height}px - (1.75rem + 0.25rem * 2)) / (282 + 600)`

const heightByCurrent = (height: number, current: number): string =>
  `calc(${calcBaseRatio(height)} * 597 * ${current / maxWallOnScreen})`

const useStyles = createUseStyles<string, number>({
  main: {
    width: (height) => `calc(${calcBaseRatio(height)} * 72 + 1rem * 2)`,
  },
  wallwrapper: {
    height: (height) => heightByCurrent(height, maxWallOnScreen),
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
    'will-change': 'height',
    'transition-property': 'height',
    'transition-timing-function': 'linear',
    'transition-duration': '0.4s',
  },
})

type PropType = {
  current: number
  isOpponent?: boolean
}
const Wall = ({ current, isOpponent = false }: PropType) => {
  const _ = useContext(I18nContext)
  const size = useContext(GameSizeContext)
  const height = (size.height / 3) * 2

  const classes = useStyles(height)

  // Force TailwindCSS to aware of these classes:
  // float-left
  // float-right

  return (
    <div
      title={_.i18n(isOpponent ? "Opponent's %s" : 'Your %s').replace(
        '%s',
        _.i18n('wall'),
      )}
      className={cx(
        'h-full mx-2 relative',
        `float-${isOpponent ? 'right' : 'left'}`,
        classes.main,
      )}
    >
      <div className={cx('z-20 w-full absolute px-4', classes.wallwrapper)}>
        <div
          className={cx('absolute bottom-0', classes.wallbody)}
          style={{ height: heightByCurrent(height, current) }}
        ></div>
      </div>
      <div className="bg-black bg-opacity-50 p-1 shadow-lg w-full absolute bottom-0">
        <div className="border border-yellow-400 border-opacity-25 text-yellow-400 text-center h-7 leading-7 font-mono">
          <NumberDiff n={current} />
          <AnimatedNumber n={current} />
          <NumberChangeVisual n={current} />
        </div>
      </div>
    </div>
  )
}

export default memo(Wall)
