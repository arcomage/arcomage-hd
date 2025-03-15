import cl from 'clarr'
import React, { useCallback, useContext, useEffect, useRef } from 'react'
import { resNameAllMap, ResNameType } from '@/constants/resourceNames'
import { smallRootFontScreenMax, unitTextMaxLength } from '@/constants/visuals'
import { I18nContext } from '@/i18n/I18nContext'
import { RootState, store } from '@/store'
import { GameSizeContext } from '@/utils/contexts/GameSizeContext'
import { appSubscriber, useAppSelector } from '@/utils/hooks/useAppDispatch'
import { tooltipAttrs } from '@/utils/tooltip'
import { upper1st } from '@/utils/upper1st'
import styles from './Resource.module.scss'
import { calcProdHeight, getFontSize, getLineHeight } from './ResourceFuncs'
import ResourceNumber from './ResourceNumber'

type PropType = {
  type: ResNameType
  isOpponent: boolean
}
const Resource = ({ type, isOpponent }: PropType) => {
  const _ = useContext(I18nContext)
  const size = useContext(GameSizeContext)
  const winHeight = size.height
  const height = winHeight * (size.narrowMobile ? 1 / 2 : 2 / 3)
  const smallMode = winHeight < smallRootFontScreenMax
  const text = _.i18n(
    {
      brick: 'bricks',
      gem: 'gems',
      recruit: 'recruits',
    }[type],
  )

  let resProdTooltip = _.i18n(
    `${isOpponent ? "Opponent's" : 'Your'} %s`,
  ).replace(
    '%s',
    _.i18n('%s (%ss production)')
      .replace(
        '%s',
        _.i18n(
          {
            brick: 'quarry',
            gem: 'magic',
            recruit: 'dungeon',
          }[type],
        ),
      )
      .replace('%ss', _.i18n(type))
      .replace(
        '%sp',
        _.i18n(
          {
            brick: 'bricks',
            gem: 'gems',
            recruit: 'recruits',
          }[type],
        ),
      ),
  )
  resProdTooltip = `${upper1st(resProdTooltip)} = %%`
  const resProdTooltipBearerRef = useRef<HTMLDivElement>(null)
  const selectNProd = useCallback(
    (state: RootState) =>
      state.status[isOpponent ? 'opponent' : 'player'][resNameAllMap[type][1]],
    [isOpponent, type],
  )
  const updateTooltipProd = useCallback((n: number) => {
    if (resProdTooltipBearerRef.current !== null) {
      const tooltipTemplate =
        resProdTooltipBearerRef.current.dataset.tooltipContentTemplate
      if (tooltipTemplate) {
        resProdTooltipBearerRef.current.dataset.tooltipContent =
          tooltipTemplate.replace('%%', n.toString())
      }
    }
  }, [])
  useEffect(() => {
    const unsubscribe = appSubscriber(selectNProd, updateTooltipProd)
    return unsubscribe
    // no lint reason: isOpponent is stable
    // eslint-disable-next-line react-compiler/react-compiler
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  useEffect(() => {
    updateTooltipProd(selectNProd(store.getState()))
  }, [_, selectNProd, updateTooltipProd])

  const winResource = useAppSelector((state) => state.settings.winResource)
  let resTooltip = _.i18n(`${isOpponent ? "Opponent's" : 'Your'} %sp`)
    .replace(
      '%sp',
      _.i18n(
        {
          brick: 'bricks',
          gem: 'gems',
          recruit: 'recruits',
        }[type],
      ),
    )
    .replace('%ss', _.i18n(type))
  resTooltip = _.i18n('%s1. Reach %s2 to win')
    .replace('%s1', `${resTooltip} = %%`)
    .replace('%s2', winResource.toString())
  resTooltip = upper1st(resTooltip)
  const resTooltipBearerRef = useRef<HTMLDivElement>(null)
  const selectN = useCallback(
    (state: RootState) =>
      state.status[isOpponent ? 'opponent' : 'player'][resNameAllMap[type][0]],
    // no lint reason: type is stable
    // eslint-disable-next-line react-compiler/react-compiler
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [isOpponent],
  )
  const updateTooltip = useCallback((n: number) => {
    if (resTooltipBearerRef.current !== null) {
      const tooltipTemplate =
        resTooltipBearerRef.current.dataset.tooltipContentTemplate
      if (tooltipTemplate) {
        resTooltipBearerRef.current.dataset.tooltipContent =
          tooltipTemplate.replace('%%', n.toString())
      }
    }
  }, [])
  useEffect(() => {
    // non-declarative, efficient update
    const unsubscribe = appSubscriber(selectN, updateTooltip)
    return unsubscribe
    // no lint reason: isOpponent is stable
    // eslint-disable-next-line react-compiler/react-compiler
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  useEffect(() => {
    updateTooltip(selectN(store.getState()))
    // no lint reason: isOpponent is stable
    // eslint-disable-next-line react-compiler/react-compiler
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [_])

  return (
    <div
      className={cl(
        styles.main,
        styles[type],
        size.narrowMobile ? 'mb-2' : 'mb-3',
      )}
    >
      <div
        ref={resProdTooltipBearerRef}
        className={cl(styles.prodcontainer)}
        style={{
          height: `calc(${calcProdHeight(height)})`,
        }}
        {...tooltipAttrs('', isOpponent ? 'left' : 'right')}
        data-tooltip-content-template={resProdTooltip}
      >
        <div
          className={cl(styles.resimgholder, 'pixelated')}
          aria-hidden={true}
        ></div>
        <div
          className={cl(styles.prod, 'fatnumber', 'el-number')}
          style={{
            fontSize: `${getFontSize(height, 0.05)}px`,
            lineHeight: `${getLineHeight(height, 0.05)}px`,
          }}
        >
          <ResourceNumber
            isOpponent={isOpponent}
            type={resNameAllMap[type][1]}
          />
        </div>
      </div>
      <div
        ref={resTooltipBearerRef}
        className={styles.countcontainer}
        {...tooltipAttrs('', isOpponent ? 'left' : 'right')}
        data-tooltip-content-template={resTooltip}
      >
        <div
          className={cl(styles.count, 'fatnumber', 'el-number')}
          style={{
            fontSize: `${getFontSize(height, 0.036)}px`,
            lineHeight: `${getLineHeight(height, 0.036)}px`,
            height: `${getLineHeight(height, 0.036)}px`,
          }}
        >
          <ResourceNumber
            isOpponent={isOpponent}
            type={resNameAllMap[type][0]}
          />
        </div>
        <div
          className={cl(
            styles.unit,
            smallMode && styles.smallmode,
            'robotocondensed',
            'el-text',
          )}
          style={{
            fontSize: (() => {
              let fontSize = getFontSize(height, 0.036)
              const unitTextLength = smallMode
                ? 0
                : text
                    .replace(/[ыщ]/g, '  ')
                    .replace(/ll/g, 'l')
                    .replace(/in/g, 'n').length
              if (unitTextLength > unitTextMaxLength) {
                fontSize = (fontSize / unitTextLength) * (unitTextMaxLength + 1)
              }
              return `${fontSize}px`
            })(),
            lineHeight: `${getLineHeight(height, 0.036)}px`,
            height: `${getLineHeight(height, 0.036)}px`,
            width: smallMode ? `${getLineHeight(height, 0.036)}px` : '57.5%',
          }}
        >
          {smallMode ? '' : text}
        </div>
      </div>
    </div>
  )
}

export default Resource
