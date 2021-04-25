import React, { memo, useContext } from 'react'
import cx from 'classnames'
import { createUseStyles } from 'react-jss'
import Window from './Window'

import { SCREEN_LANDSCAPE } from '../../constants/ActionTypes'
import { I18nContext } from '../../i18n/I18nContext'
import TooltipAll from '../special/TooltipAll'
import { LandscapeNoticeExitableDelay } from '../../constants/visuals'

const useStyles = createUseStyles<string>({
  '@keyframes all': {
    '0%, 32%': {
      transform: 'none',
    },
    '68%, 100%': {
      transform: 'rotate(90deg) translateX(-100%)',
    },
  },
  '@keyframes mouth': {
    '0%, 55.9999%': {
      transform: 'none',
    },
    '56%, 100%': {
      transform: 'scaleY(-1) translateY(-35%)',
    },
  },
  '@keyframes smiley': {
    '0%, 32%': {
      transform: 'none',
    },
    '68%, 100%': {
      transform: 'rotate(-90deg)',
    },
  },
  wrapper: {
    'padding-right': '52%', // (544.12 - 261.17) / 544.12
    width: '10rem',
    'margin-left': '1rem',
    'margin-bottom': '1rem',
  },
  all: {
    'will-change': 'transform',
    'transform-origin': 'bottom left',
    animation: '$all 2.3s linear infinite',
  },
  arrow: {
    top: '8%',
    right: '8%',
    width: '30%',
  },
  mouth: {
    'will-change': 'transform',
    'transform-origin': 'center',
    animation: '$mouth 2.3s linear infinite',
  },
  smiley: {
    top: '50%',
    left: 0,
    'margin-top': '-50%',
    'will-change': 'transform',
    animation: '$smiley 2.3s linear infinite',
  },
})

const LandscapeNotice = () => {
  const _ = useContext(I18nContext)
  const classes = useStyles()

  return (
    <Window
      screenActionType={SCREEN_LANDSCAPE}
      darkerBg
      exitableDelay={LandscapeNoticeExitableDelay}
    >
      <TooltipAll title={_.i18n('Please rotate your device to landscape mode')}>
        <div className={cx(classes.wrapper, 'relative')}>
          <svg
            className={cx(classes.arrow, 'absolute')}
            viewBox="0 0 13.16 10.677"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g stroke="#fff" strokeLinecap="round" strokeWidth="1.323">
              <path d="M.662.66c5.926.163 9.178 3.464 9.354 9.354M12.499 6.02l-2.483 3.991M6.513 6.93l3.503 3.08" />
            </g>
          </svg>
          <div className={cx(classes.all, 'relative')}>
            <svg viewBox="0 0 261.17 544.12" xmlns="http://www.w3.org/2000/svg">
              <path
                fill="#fff"
                d="M15.826 544.12h229.52c8.74 0 15.826-7.086 15.826-15.826V15.834c0-8.75-7.086-15.826-15.826-15.826H15.826C7.086.008 0 7.093 0 15.834v512.45c0 8.749 7.086 15.835 15.826 15.835zm37.59-11.877h-8.587a1.037 1.037 0 01-1.033-1.041c0-.564.459-1.043 1.033-1.043h8.587c.574 0 1.042.479 1.042 1.043a1.037 1.037 0 01-1.042 1.041zm0-4.187h-8.587a1.029 1.029 0 01-1.033-1.033c0-.564.459-1.041 1.033-1.041h8.587c.574 0 1.042.467 1.042 1.041a1.023 1.023 0 01-1.042 1.033zm7.239 2.734c0 1.234-.995 2.238-2.228 2.238s-2.238-1.004-2.238-2.238v-7.373H42.065v7.373a2.233 2.233 0 01-2.228 2.238 2.24 2.24 0 01-2.238-2.238v-9.6a2.24 2.24 0 012.238-2.238h18.589a2.233 2.233 0 012.228 2.238v9.6zm91.035-2.496a3.952 3.952 0 01-3.949 3.959h-34.3a3.954 3.954 0 01-3.959-3.959v-5.938a3.955 3.955 0 013.959-3.959h34.3c2.19 0 3.949 1.77 3.949 3.959zm64.69 5.145h-7.009a2.233 2.233 0 010-4.465h7.009c1.511 0 2.735-1.176 2.735-2.611 0-1.443-1.225-2.609-2.735-2.609h-5.909c-.22.305-.459.506-1.004.496a1.23 1.23 0 01-.488-.096l-3.644-1.539c-.439-.191-.736-.621-.736-1.1s.287-.918.728-1.1l3.643-1.539c.44-.182.957-.096 1.311.258.048.047.096.096.134.152h5.967c3.969 0 7.191 3.176 7.191 7.086.008 3.893-3.224 7.067-7.193 7.067zm13.178-522.94a5.958 5.958 0 015.957 5.958 5.959 5.959 0 11-5.957-5.958zm-61.296 3.605a2.35 2.35 0 012.353 2.352c0 1.301-1.052 2.353-2.353 2.353s-2.353-1.052-2.353-2.353 1.062-2.352 2.353-2.352zm-7.172 0a2.342 2.342 0 012.343 2.352c0 1.301-1.042 2.353-2.343 2.353s-2.353-1.052-2.353-2.353 1.062-2.352 2.353-2.352zm-70.523-3.289h58.694a4.782 4.782 0 010 9.562H90.567a4.783 4.783 0 01-4.781-4.781 4.775 4.775 0 014.781-4.781zM11.58 31.67H249.6v471.89H11.58z"
              />
            </svg>
            <svg
              className={cx(classes.smiley, 'absolute')}
              viewBox="0 0 79.375 79.375"
              xmlns="http://www.w3.org/2000/svg"
            >
              <circle cx="21.828" cy="28.297" r="6.804" fill="#fff" />
              <circle cx="57.544" cy="28.297" r="6.804" fill="#fff" />
              <path
                className={cx(classes.mouth, '')}
                d="M15.119 56.88c13.919-9.022 29.213-12.999 49.137 0"
                stroke="#fff"
                strokeLinecap="round"
                strokeWidth="2"
              />
            </svg>
          </div>
        </div>
      </TooltipAll>
    </Window>
  )
}

export default memo(LandscapeNotice)
