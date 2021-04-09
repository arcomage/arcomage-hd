import React, { memo, useContext } from 'react'
import cx from 'classnames'
import { createUseStyles } from 'react-jss'
import { GameSizeContext } from '../utils/GameSizeContext'

import AnimatedNumber from './effects/AnimatedNumber'
import NumberDiff from './effects/NumberDiff'

import brickBg from '../../assets/img/res_1.png'
import gemBg from '../../assets/img/res_2.png'
import recruitBg from '../../assets/img/res_3.png'
import { I18nContext } from '../i18n/I18nContext'

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

const useStyles = createUseStyles<string, number>({
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
    'min-height': '1.2rem',
  },
  prod: {
    'font-size': (height) => `${getFontSize(height, 0.05)}px`,
    'line-height': (height) => `${getLineHeight(height, 0.05)}px`,
    'margin-bottom': '-0.2em',
  },
  count: {
    'font-size': (height) => `${getFontSize(height, 0.036)}px`,
    'line-height': (height) => `${getLineHeight(height, 0.036)}px`,
    height: (height) => `${getLineHeight(height, 0.036)}px`,
  },
  unit: {
    'font-size': (height) => `${getFontSize(height, 0.036)}px`,
    'line-height': (height) => `${getLineHeight(height, 0.036)}px`,
    height: (height) => `${getLineHeight(height, 0.036)}px`,
  },
})

type PropType = {
  type: 'brick' | 'gem' | 'recruit'
  count: number
  prod: number
}
const Resource = ({ type, count, prod }: PropType) => {
  const _ = useContext(I18nContext)
  const size = useContext(GameSizeContext)
  const height = size.height * (size.narrowMobile ? 1 / 2 : 2 / 3)

  const classes = useStyles(height)
  const color = { brick: 'red', gem: 'blue', recruit: 'green' }[type]
  const text = {
    brick: _.i18n('bricks'),
    gem: _.i18n('gems'),
    recruit: _.i18n('recruits'),
  }[type]
  // Force TailwindCSS to aware of these classes:
  // bg-red-300
  // bg-blue-300
  // bg-green-300
  return (
    <div className={cx('mb-3 p-1 shadow-lg', `bg-${color}-300`)}>
      <div
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
          <NumberDiff n={prod} />
          <AnimatedNumber n={prod} />
        </div>
      </div>
      <div className="flow-root mt-1">
        <div
          className={cx(
            'float-left text-black flex-1 text-left relative tracking-tighter',
            'fatnumber',
            classes.count,
          )}
        >
          <NumberDiff n={count} />
          <AnimatedNumber n={count} />
        </div>
        <div
          className={cx(
            'float-right text-black flex-1 text-right',
            'robotocondensed',
            classes.unit,
          )}
        >
          {text}
        </div>
      </div>
    </div>
  )
}

export default memo(Resource)
