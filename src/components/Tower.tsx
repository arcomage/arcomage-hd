import React, { memo, useContext, useEffect, useRef, useState } from 'react'
import cx from 'classnames'
import { createUseStyles } from 'react-jss'
import { GameSizeContext } from '../utils/GameSizeContext'
import TowerOrWallNumber from './TowerOrWallNumber'

import tower from '../../assets/img/tower.webp'
import towerRed from '../../assets/img/tower_red.webp'
import towerBlue from '../../assets/img/tower_blue.webp'
import { I18nContext } from '../i18n/I18nContext'
import { useAppSelector } from '../utils/useAppDispatch'
import TooltipAll from './special/TooltipAll'
import Pixelation from './effects/Pixelation'
import {
  towerPixelationFallbackHeight,
  towerWallHeightDelay,
} from '../constants/visuals'

const calcBaseRatio = (height: number): string =>
  `(${height}px - (1.75rem + 0.25rem * 2)) / (282 + 600)`

const calcWidth = (height: number): string => `${calcBaseRatio(height)} * 204`

const calcPaddingX = (height: number): string =>
  `${calcBaseRatio(height)} * ((204 - 135) / 2)`

const heightByCurrent = (height: number, currentGoalRatio: string): string =>
  `calc((${calcWidth(height)} - ${calcPaddingX(
    height,
  )} * 2) / 135 * 600 * ${currentGoalRatio})`

const useStyles = createUseStyles<string, { height: number; goal: number }>({
  main: {
    width: ({ height }) => `calc(${calcWidth(height)})`,
  },
  towerwrapper: {
    height: ({ height }) => heightByCurrent(height, '1'),
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
    height: ({ height, goal }) =>
      heightByCurrent(height, `(var(--n) / ${goal})`),
    'max-height': ({ height }) => heightByCurrent(height, '1'),
    'will-change': 'height',
    'transition-property': 'height',
    'transition-timing-function': 'linear',
    'transition-duration': '0.4s',
  },
  towerbodytop: {
    position: 'absolute',
    top: ({ height }) => `calc(0px - ${calcWidth(height)} / 204 * 282 + 1px)`,
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
  towerbodytopred: {
    background: {
      image: `url(${towerRed})`,
    },
  },
  towerbodytopblue: {
    background: {
      image: `url(${towerBlue})`,
    },
  },
})

type PropType = {
  isOpponent?: boolean
  goal: number
}
const Tower = ({ isOpponent = false, goal }: PropType) => {
  const _ = useContext(I18nContext)
  const size = useContext(GameSizeContext)
  const height = size.height * (size.narrowMobile ? 1 / 2 : 2 / 3)

  const classes = useStyles({ height, goal })

  // Force TailwindCSS to aware of these classes:
  // float-left
  // float-right

  const winTower = useAppSelector((state) => state.settings.winTower)
  let towerTitle = _.i18n(isOpponent ? "Opponent's %s" : 'Your %s').replace(
    '%s',
    _.i18n('tower'),
  )
  towerTitle = _.i18n('%s1. Reach %s2 to win')
    .replace('%s1', towerTitle)
    .replace('%s2', winTower.toString(10))

  const pixelationLevel = useAppSelector((state) => state.visual.pixelation)

  const towerBody = useRef<HTMLDivElement | null>(null)
  const [towerBodyMaxHeight, setTowerBodyMaxHeight] = useState(
    towerPixelationFallbackHeight,
  )
  useEffect(() => {
    const handleResize = () => {
      setTimeout(() => {
        if (pixelationLevel !== 0 && towerBody.current) {
          setTowerBodyMaxHeight(
            window
              .getComputedStyle(towerBody.current)
              .getPropertyValue('max-height'),
          )
        }
      }, towerWallHeightDelay)
    }

    window.addEventListener('resize', handleResize)
    window.addEventListener('orientationchange', handleResize)
    handleResize()
    return () => {
      window.removeEventListener('resize', handleResize)
      window.removeEventListener('orientationchange', handleResize)
    }
  }, [])

  return (
    <div
      className={cx(
        'h-full mx-1 relative',
        `float-${isOpponent ? 'right' : 'left'}`,
        classes.main,
      )}
    >
      <TooltipAll title={towerTitle} placement="bottom">
        <div className="w-full h-full">
          <div className={cx('z-20 w-full absolute', classes.towerwrapper)}>
            <div
              ref={towerBody}
              className={cx('absolute bottom-0', classes.towerbody)}
            >
              <div
                className={cx(
                  classes.towerbodytop,
                  classes[isOpponent ? 'towerbodytopblue' : 'towerbodytopred'],
                )}
              >
                {pixelationLevel !== 0 && (
                  <Pixelation
                    src={isOpponent ? towerBlue : towerRed}
                    level={pixelationLevel}
                    cleanup
                  />
                )}
              </div>
              {pixelationLevel !== 0 && (
                <div className="w-full h-full overflow-hidden">
                  <Pixelation
                    src={tower}
                    level={pixelationLevel}
                    height={towerBodyMaxHeight}
                  />
                </div>
              )}
            </div>
          </div>
          <div className="bg-black bg-opacity-50 p-1 shadow-lg w-full absolute bottom-0">
            <div className="border border-yellow-400 border-opacity-25 text-yellow-400 text-center h-7 leading-7 font-mono">
              <TowerOrWallNumber
                isOpponent={isOpponent}
                isWall={false}
                target={towerBody}
              />
            </div>
          </div>
        </div>
      </TooltipAll>
    </div>
  )
}

export default memo(Tower)
