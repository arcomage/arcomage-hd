import React, { useContext } from 'react'
import { resNameAllMap, ResNameType } from '@/constants/resourceNames'
import { smallRootFontScreenMax, unitTextMaxLength } from '@/constants/visuals'
import { I18nContext } from '@/i18n/I18nContext'
import cl from '@/utils/clarr'
import { GameSizeContext } from '@/utils/contexts/GameSizeContext'
import { useAppSelector } from '@/utils/hooks/useAppDispatch'
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

  const nProd = useAppSelector(
    (state) =>
      state.status[isOpponent ? 'opponent' : 'player'][resNameAllMap[type][1]],
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
  resProdTooltip = `${upper1st(resProdTooltip)} = ${nProd}`

  const nRes = useAppSelector(
    (state) =>
      state.status[isOpponent ? 'opponent' : 'player'][resNameAllMap[type][0]],
  )
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
    .replace('%s1', `${resTooltip} = ${nRes}`)
    .replace('%s2', winResource.toString(10))
  resTooltip = upper1st(resTooltip)

  return (
    <div
      className={cl(
        styles.main,
        styles[type],
        size.narrowMobile ? 'mb-2' : 'mb-3',
      )}
    >
      <div
        className={cl(styles.prodcontainer)}
        style={{
          height: `calc(${calcProdHeight(height)})`,
        }}
        {...tooltipAttrs(resProdTooltip, isOpponent ? 'left' : 'right')}
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
          <ResourceNumber n={nProd} />
        </div>
      </div>
      <div
        className={styles.countcontainer}
        {...tooltipAttrs(resTooltip, isOpponent ? 'left' : 'right')}
      >
        <div
          className={cl(styles.count, 'fatnumber', 'el-number')}
          style={{
            fontSize: `${getFontSize(height, 0.036)}px`,
            lineHeight: `${getLineHeight(height, 0.036)}px`,
            height: `${getLineHeight(height, 0.036)}px`,
          }}
        >
          <ResourceNumber n={nRes} />
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
