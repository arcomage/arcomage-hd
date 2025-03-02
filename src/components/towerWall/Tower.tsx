import React, { useContext, useEffect, useRef } from 'react'
import { I18nContext } from '@/i18n/I18nContext'
import { RootState, store } from '@/store'
import cl from '@/utils/clarr'
import { GameSizeContext } from '@/utils/contexts/GameSizeContext'
import { useAppSelector, appSubscriber } from '@/utils/hooks/useAppDispatch'
import { tooltipAttrs } from '@/utils/tooltip'
import { upper1st } from '@/utils/upper1st'
import styles from './Tower.module.scss'
import TowerOrWallNumber from './TowerOrWallNumber'

const calcBaseRatio = (height: number): string =>
  `(${height}px - (1.75rem + 0.25rem * 2)) / (282 + 600)`

const calcWidth = (height: number): string => `${calcBaseRatio(height)} * 204`

const calcPaddingX = (height: number): string =>
  `${calcBaseRatio(height)} * ((204 - 135) / 2)`

const heightByCurrent = (height: number, currentGoalRatio: string): string =>
  `(${calcWidth(height)} - ${calcPaddingX(
    height,
  )} * 2) / 135 * 600 * ${currentGoalRatio}`

type PropType = {
  isOpponent?: boolean
  goal: number
}
const Tower = ({ isOpponent = false, goal }: PropType) => {
  const _ = useContext(I18nContext)
  const size = useContext(GameSizeContext)
  const height = size.height * (size.narrowMobile ? 1 / 2 : 2 / 3)

  const winTower = useAppSelector((state) => state.settings.winTower)

  const towerNBearer = useRef<HTMLDivElement>(null)

  let towerTooltip = _.i18n(isOpponent ? "Opponent's %s" : 'Your %s').replace(
    '%s',
    _.i18n('tower'),
  )
  towerTooltip = _.i18n('%s1. Reach %s2 to win')
    .replace('%s1', `${towerTooltip} = %%`)
    .replace('%s2', winTower.toString())
  towerTooltip = upper1st(towerTooltip)
  const towerTooltipBearerRef = useRef<HTMLDivElement>(null)
  useEffect(() => {
    const selectN = (state: RootState) =>
      state.status[isOpponent ? 'opponent' : 'player'].tower
    const updateTooltip = (n: number) => {
      if (towerTooltipBearerRef.current !== null) {
        const tooltipTemplate =
          towerTooltipBearerRef.current.dataset.tooltipContentTemplate
        if (tooltipTemplate) {
          towerTooltipBearerRef.current.dataset.tooltipContent =
            tooltipTemplate.replace('%%', n.toString())
        }
      }
    }
    const unsubscribe = appSubscriber(selectN, updateTooltip)
    updateTooltip(selectN(store.getState()))
    return unsubscribe
    // no lint reason: isOpponent is stable
    // eslint-disable-next-line react-compiler/react-compiler
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div
      className={cl(styles.main, isOpponent ? styles.opponent : styles.player)}
      style={{
        width: `calc(${calcWidth(height)})`,
      }}
    >
      <div ref={towerNBearer} className={styles.towernbearer}>
        <div
          className={styles.towerwrapper}
          style={{
            paddingLeft: `calc(${calcPaddingX(height)})`,
            paddingRight: `calc(${calcPaddingX(height)})`,
          }}
          aria-hidden={true}
        >
          <div
            className={styles.towerbody}
            style={{
              width: `calc(100% - ${calcPaddingX(height)} * 2)`,
              height: `calc(${heightByCurrent(height, '1')})`,
              transform: `translateY(calc((1 - (var(--n) / ${goal})) * 100%)) translateZ(0)`,
            }}
          >
            <div
              className={cl(styles.towerbodytop, 'pixelated')}
              style={{
                top: `calc(0px - ${calcWidth(height)} / 204 * 282 + 1px)`,
                left: `calc(0px - ${calcPaddingX(height)})`,
                right: `calc(0px - ${calcPaddingX(height)})`,
                width: `calc(${calcWidth(height)})`,
                height: `calc(${calcWidth(height)} / 204 * 282)`,
              }}
            ></div>
            <div className={cl(styles.towerbodybg, 'pixelated')}></div>
          </div>
        </div>
        <div className={styles.numberouterwrapper}>
          <div
            className={cl(
              styles.numberinnerwrapper,
              'el-number cantoggleboldfont',
            )}
          >
            <TowerOrWallNumber
              isOpponent={isOpponent}
              isWall={false}
              target={towerNBearer}
              maxN={goal}
            />
          </div>
        </div>
        <div
          ref={towerTooltipBearerRef}
          className={styles.towertooltipbearer}
          style={{
            height: `calc(2.25rem + ${heightByCurrent(height, '1')} * var(--n) / ${goal} + ${calcWidth(height)} / 204 * 282)`, // (1.75rem + 0.25rem * 2) [numberoutwrapper] + heightByCurrent * nRatio + towerbodytop's Height
          }}
          {...tooltipAttrs(towerTooltip, 'bottom')}
          data-tooltip-content-template={towerTooltip}
        ></div>
      </div>
    </div>
  )
}

export default Tower
