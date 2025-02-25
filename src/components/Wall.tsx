import React, { useContext, useRef } from 'react'
import { maxWallOnScreen } from '@/constants/visuals'
import { I18nContext } from '@/i18n/I18nContext'
import cl from '@/utils/clarr'
import { GameSizeContext } from '@/utils/contexts/GameSizeContext'
import { useAppSelector } from '@/utils/hooks/useAppDispatch'
import { tooltipAttrs } from '@/utils/tooltip'
import { upper1st } from '@/utils/upper1st'
import TowerOrWallNumber from './TowerOrWallNumber'
import styles from './Wall.module.scss'

const calcBaseRatio = (height: number): string =>
  `(${height}px - (1.75rem + 0.25rem * 2)) / (282 + 600)`

const heightByCurrent = (height: number, currentGoalRatio: string): string =>
  `${calcBaseRatio(height)} * 597 * ${currentGoalRatio}`

type PropType = {
  isOpponent?: boolean
}
const Wall = ({ isOpponent = false }: PropType) => {
  const _ = useContext(I18nContext)
  const size = useContext(GameSizeContext)
  const height = size.height * (size.narrowMobile ? 1 / 2 : 2 / 3)

  const n = useAppSelector(
    (state) => state.status[isOpponent ? 'opponent' : 'player'].wall,
  )

  const wallTooltip = `${upper1st(
    _.i18n(isOpponent ? "Opponent's %s" : 'Your %s').replace(
      '%s',
      _.i18n('wall'),
    ),
  )} = ${n}`

  const wallNBearer = useRef<HTMLDivElement>(null)

  return (
    <div
      className={cl(styles.main, isOpponent ? styles.opponent : styles.player)}
      style={{
        width: `calc(${calcBaseRatio(height)} * 72 + 1rem * 2)`,
      }}
    >
      <div ref={wallNBearer} className={styles.wallnbearer}>
        <div
          className={styles.wallwrapper}
          style={{
            height: `calc(${heightByCurrent(height, '1')})`,
          }}
          aria-hidden={true}
        >
          <div
            className={cl(styles.wallbody, 'pixelated')}
            style={{
              height: `calc(${heightByCurrent(height, '1')})`,
              width: `calc(${calcBaseRatio(height)} * 72)`,
            }}
          ></div>
        </div>
        <div className={styles.numberouterwrapper}>
          <div
            className={cl(
              styles.numberinnerwrapper,
              'el-number cantoggleboldfont',
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
          className={styles.walltooltipbearer}
          style={{
            height: `calc(2.25rem + ${heightByCurrent(height, '1')} * var(--n) / 100)`, // (1.75rem + 0.25rem * 2) [numberoutwrapper] + heightByCurrent * nRatio
          }}
          {...tooltipAttrs(wallTooltip, 'bottom')}
        ></div>
      </div>
    </div>
  )
}

export default Wall
