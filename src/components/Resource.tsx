import React, { memo, useContext } from 'react'
import cx from 'classnames'
import { createUseStyles } from 'react-jss'
import { GameSizeContext } from '../utils/GameSizeContext'

import ResourceNumber from './ResourceNumber'

import brickBg from '../../assets/img/res_1.png'
import gemBg from '../../assets/img/res_2.png'
import recruitBg from '../../assets/img/res_3.png'
import { I18nContext } from '../i18n/I18nContext'
import { smallRootFontScreenMax, unitTextMaxLength } from '../constants/visuals'

import brick from '../../assets/img/brick.svg'
import gem from '../../assets/img/gem.svg'
import recruit from '../../assets/img/recruit.svg'
import { ResNameType } from '../constants/resourceNames'

const whRatio = 156 / 216

const getFontSize = (height: number, percentage: number): number => {
  const fontSizeTemp = height * percentage
  return fontSizeTemp >= 12 ? fontSizeTemp : 12
}

const getLineHeight = (height: number, percentage: number): number =>
  getFontSize(height, percentage) * 1.2

const calcProdHeight = (height: number): string =>
  `(${height}px - 1.25rem * 2 - (1.75rem + 0.25rem * 2 + 1rem) - (0.25rem * 2 + ${getLineHeight(
    height,
    0.036,
  )}px + 0.25rem + 0.75rem) * 3) / 3`

export const calcStatusWidth = (height: number): string =>
  `${calcProdHeight(height)} / ${whRatio} + 0.25rem * 2 + 1.25rem * 2`

const useStyles = createUseStyles<
  string,
  {
    type: ResNameType
    height: number
    smallMode: boolean
    unitTextLength: number
  }
>({
  brick: {
    'background-image': `url(${brickBg})`,
    'background-position': 'center 15%',
  },
  gem: {
    'background-image': `url(${gemBg})`,
    'background-position': 'center 21%',
  },
  recruit: {
    'background-image': `url(${recruitBg})`,
  },
  prodcontainer: {
    'min-height': '2em',
  },
  prod: {
    'font-size': ({ height }) => `${getFontSize(height, 0.05)}px`,
    'line-height': ({ height }) => `${getLineHeight(height, 0.05)}px`,
    'margin-bottom': '-0.2em',
  },
  count: {
    'font-size': ({ height }) => `${getFontSize(height, 0.036)}px`,
    'line-height': ({ height }) => `${getLineHeight(height, 0.036)}px`,
    height: ({ height }) => `${getLineHeight(height, 0.036)}px`,
    width: '42.5%',
  },
  unit: {
    'font-size': ({ height, unitTextLength }) => {
      let fontSize = getFontSize(height, 0.036)
      if (unitTextLength > unitTextMaxLength) {
        fontSize = (fontSize / unitTextLength) * (unitTextMaxLength + 1)
      }
      return `${fontSize}px`
    },
    'line-height': ({ height }) => `${getLineHeight(height, 0.036)}px`,
    height: ({ height }) => `${getLineHeight(height, 0.036)}px`,
    width: ({ height, smallMode }) =>
      smallMode ? `${getLineHeight(height, 0.036)}px` : '57.5%',
    'background-image': ({ type, smallMode }) =>
      smallMode
        ? `url(${
            {
              brick,
              gem,
              recruit,
            }[type]
          })`
        : 'none',
    background: {
      repeat: 'no-repeat',
      size: 'cover',
      position: 'center center',
    },
    opacity: ({ smallMode }) => (smallMode ? 0.75 : 1),
    transform: ({ type, smallMode }) => {
      if (smallMode) {
        if (type === 'gem') {
          return 'translateY(-12%)'
        } else if (type === 'recruit') {
          return 'translateY(6%)'
        }
      }
      return 'none'
    },
  },
})

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
  const color = { brick: 'red', gem: 'blue', recruit: 'green' }[type]
  const text = _.i18n(
    {
      brick: 'bricks',
      gem: 'gems',
      recruit: 'recruits',
    }[type],
  )

  const classes = useStyles({
    type,
    height,
    smallMode,
    unitTextLength: smallMode
      ? 0
      : text.replace(/[ыщ]/g, '  ').replace(/ll/g, 'l').replace(/in/g, 'n')
          .length,
  })
  // Force TailwindCSS to aware of these classes:
  // bg-red-300
  // bg-blue-300
  // bg-green-300
  return (
    <div className={cx('mb-3 p-1 shadow-lg', `bg-${color}-300`)}>
      <div
        title={_.i18n(`${isOpponent ? "Opponent's" : 'Your'} %s`).replace(
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
        )}
        className={cx(
          classes[type],
          classes.prodcontainer,
          'bg-no-repeat bg-cover bg-center border border-l-darkborder border-t-darkborder border-r-lightborder border-b-lightborder relative',
        )}
        style={{
          height: `calc(${calcProdHeight(height)})`,
        }}
      >
        <div
          className={cx(
            'text-yellow-400 absolute bottom-1 left-1 text-shadow-md tracking-tighter',
            'fatnumber',
            classes.prod,
          )}
        >
          <ResourceNumber isProd {...{ type, isOpponent }} />
        </div>
      </div>
      <div
        title={_.i18n(`${isOpponent ? "Opponent's" : 'Your'} %sp`)
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
          .replace('%ss', _.i18n(type))}
        className="flow-root mt-1"
      >
        <div
          className={cx(
            'float-left text-black flex-1 text-left relative tracking-tighter',
            'fatnumber',
            classes.count,
          )}
        >
          <ResourceNumber isProd={false} {...{ type, isOpponent }} />
        </div>
        <div
          className={cx(
            'float-right text-black flex-1 text-right',
            'robotocondensed',
            classes.unit,
          )}
        >
          {smallMode ? '' : text}
        </div>
      </div>
    </div>
  )
}

export default memo(Resource)
