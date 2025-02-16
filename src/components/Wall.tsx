import React, { useContext, useRef } from 'react'
import cx from 'clsx'
import { createUseStyles } from 'react-jss'
import { GameSizeContext } from '../utils/contexts/GameSizeContext'
import TowerOrWallNumber from './TowerOrWallNumber'
import { maxWallOnScreen } from '../constants/visuals'

import wall from '../../assets/img/wall.webp'
import { I18nContext } from '../i18n/I18nContext'
import { upper1st } from '../utils/upper1st'
import { useAppSelector } from '../utils/hooks/useAppDispatch'
import { tooltipAttrs } from '../utils/tooltip'

const calcBaseRatio = (height: number): string =>
  `(${height}px - (1.75rem + 0.25rem * 2)) / (282 + 600)`

const heightByCurrent = (height: number, currentGoalRatio: string): string =>
  `${calcBaseRatio(height)} * 597 * ${currentGoalRatio}`

const useStyles = createUseStyles<string, number>({
  main: {
    width: (height) => `calc(${calcBaseRatio(height)} * 72 + 1rem * 2)`,
  },
  wallwrapper: {
    height: (height) => `calc(${heightByCurrent(height, '1')})`,
    bottom: 'calc(1.75rem + 0.25rem * 2)',
  },
  wallbody: {
    height: (height) => `calc(${heightByCurrent(height, '1')})`,
    transform: `translateY(calc((1 - (var(--n) / ${maxWallOnScreen})) * 100%)) translateZ(0)`,
    background: {
      image: `url(${wall})`,
      repeat: 'repeat-y',
      size: '100%',
      position: 'center 0',
    },
    width: (height) => `calc(${calcBaseRatio(height)} * 72)`,
    'will-change': 'transform',
    'transition-property': 'transform',
    'transition-timing-function': 'linear',
    'transition-duration': '0.4s',
  },
  wallTooltipBearer: {
    height: (height) =>
      `calc(2.25rem + ${heightByCurrent(height, '1')} * var(--n) / 100)`, // (1.75rem + 0.25rem * 2) [numberoutwrapper] + heightByCurrent * nRatio
  },
})

type PropType = {
  isOpponent?: boolean
}
const Wall = ({ isOpponent = false }: PropType) => {
  const _ = useContext(I18nContext)
  const size = useContext(GameSizeContext)
  const height = size.height * (size.narrowMobile ? 1 / 2 : 2 / 3)

  const classes = useStyles(height)

  const boldfont: boolean = useAppSelector((state) => state.lang.boldfont)
  const n = useAppSelector(
    (state) => state.status[isOpponent ? 'opponent' : 'player'].wall,
  )

  // Force TailwindCSS to aware of these classes:
  // float-left
  // float-right

  const wallTooltip = `${upper1st(
    _.i18n(isOpponent ? "Opponent's %s" : 'Your %s').replace(
      '%s',
      _.i18n('wall'),
    ),
  )} = ${n}`

  const wallNBearer = useRef<HTMLDivElement>(null)

  return (
    <div
      className={cx(
        'h-full mx-2 relative',
        `float-${isOpponent ? 'right' : 'left'}`,
        classes.main,
      )}
    >
      <div ref={wallNBearer} className="w-full h-full">
        <div
          className={cx(
            'z-20 w-full absolute px-4 overflow-hidden',
            classes.wallwrapper,
          )}
          aria-hidden={true}
        >
          <div
            className={cx('absolute bottom-0', classes.wallbody, 'pixelated')}
          ></div>
        </div>
        <div className="bg-black bg-opacity-50 p-1 shadow-lg w-full absolute bottom-0">
          <div
            className={cx(
              'border border-yellow-400 border-opacity-25 text-yellow-400 text-center h-7 leading-7 font-mono',
              boldfont && 'font-bold',
              'el-number',
            )}
          >
            <TowerOrWallNumber
              n={n}
              target={wallNBearer}
              maxN={maxWallOnScreen}
            />
          </div>
        </div>
        <div
          className={cx(
            'z-50 w-full absolute bottom-0',
            classes.wallTooltipBearer,
          )}
          {...tooltipAttrs(wallTooltip, 'bottom')}
        ></div>
      </div>
    </div>
  )
}

export default Wall
