import React, { memo, useContext, useRef } from 'react'
import cx from 'classnames'
import { createUseStyles } from 'react-jss'
import { GameSizeContext } from '../utils/contexts/GameSizeContext'
import TowerOrWallNumber from './TowerOrWallNumber'
import { maxWallOnScreen } from '../constants/visuals'

import wall from '../../assets/img/wall.webp'
import { I18nContext } from '../i18n/I18nContext'
import TooltipAll from './special/TooltipAll'
import { upper1st } from '../utils/upper1st'
import { useAppSelector } from '../utils/hooks/useAppDispatch'

const calcBaseRatio = (height: number): string =>
  `(${height}px - (1.75rem + 0.25rem * 2)) / (282 + 600)`

const heightByCurrent = (height: number, currentGoalRatio: string): string =>
  `calc(${calcBaseRatio(height)} * 597 * ${currentGoalRatio})`

const useStyles = createUseStyles<string, number>({
  main: {
    width: (height) => `calc(${calcBaseRatio(height)} * 72 + 1rem * 2)`,
  },
  wallwrapper: {
    height: (height) => heightByCurrent(height, '1'),
    bottom: 'calc(1.75rem + 0.25rem * 2)',
  },
  wallbody: {
    height: (height) =>
      heightByCurrent(height, `(var(--n) / ${maxWallOnScreen})`),
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

  const wallTitle = `${upper1st(
    _.i18n(isOpponent ? "Opponent's %s" : 'Your %s').replace(
      '%s',
      _.i18n('wall'),
    ),
  )} = ${n}`

  const wallBody = useRef<HTMLDivElement | null>(null)

  return (
    <div
      className={cx(
        'h-full mx-2 relative',
        `float-${isOpponent ? 'right' : 'left'}`,
        classes.main,
      )}
    >
      <TooltipAll title={wallTitle} placement="bottom">
        <div className="w-full h-full">
          <div
            className={cx('z-20 w-full absolute px-4', classes.wallwrapper)}
            aria-hidden={true}
          >
            <div
              ref={wallBody}
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
              <TowerOrWallNumber n={n} target={wallBody} />
            </div>
          </div>
        </div>
      </TooltipAll>
    </div>
  )
}

export default memo(Wall)
