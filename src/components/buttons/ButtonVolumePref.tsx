import React, { memo, useContext } from 'react'
import cx from 'classnames'
import { createUseStyles } from 'react-jss'
import { useAppSelector, useAppDispatch } from '../../utils/useAppDispatch'

import { SCREEN_VOLUME_PREF } from '../../constants/ActionTypes'
import { I18nContext } from '../../i18n/I18nContext'

const useStyles = createUseStyles<string>({
  '@keyframes visible-1-3': {
    '24.99%': {
      visibility: 'hidden',
    },
    '25%': {
      visibility: 'visible',
    },
  },
  '@keyframes visible-2-3': {
    '49.99%': {
      visibility: 'hidden',
    },
    '50%': {
      visibility: 'visible',
    },
  },
  '@keyframes visible-3-3': {
    '74.99%': {
      visibility: 'hidden',
    },
    '75%': {
      visibility: 'visible',
    },
  },
  volumePrefButton: {
    left: 'calc(60% + 6rem)',
    '&:hover, &.windowactive': {
      '& svg': {
        '& .el-1': {
          visibility: 'hidden',
          animation: '$visible-1-3 2s linear infinite',
        },
        '& .el-2': {
          visibility: 'hidden',
          animation: '$visible-2-3 2s linear infinite',
        },
        '& .el-3': {
          visibility: 'hidden',
          animation: '$visible-3-3 2s linear infinite',
        },
      },
    },
  },
})

const ButtonBar = () => {
  const trans = useContext(I18nContext)

  const volumePref = useAppSelector((state) => state.screen.volumePref)

  const dispatch = useAppDispatch()

  const classes = useStyles()

  return (
    <button
      title={trans.i18n?.['Volume']}
      className={cx('topbutton', classes.volumePrefButton, {
        windowactive: volumePref,
      })}
      onClick={() => {
        dispatch({
          type: SCREEN_VOLUME_PREF,
          show: true,
        })
      }}
    >
      <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path
          className="el-0"
          d="m12.609 3.606a0.80007 0.80007 0 0 0-0.02447 2.832e-4 0.80007 0.80007 0 0 0-0.50306 0.195l-5.2638 4.5525h-4.8975a0.80007 0.80007 0 0 0-0.8 0.8v6.11a0.80007 0.80007 0 0 0 0.8 0.80007h4.8187l5.3425 4.6212a0.80007 0.80007 0 0 0 1.3231-0.60497v-15.674a0.80007 0.80007 0 0 0-0.79553-0.80027z"
        />
        <path
          className="el-1"
          d="m15.344 8.0319c-0.15037 0.00316-0.2968 0.048654-0.4225 0.13125-0.36963 0.2424-0.47262 0.73862-0.23 1.1081 1.1907 1.8141 1.1907 4.1559 0 5.97-0.24222 0.36936-0.13926 0.86513 0.23 1.1075 0.36936 0.24222 0.86513 0.13926 1.1075-0.23 1.5381-2.3435 1.5381-5.3821 0-7.7253-0.15095-0.23027-0.40971-0.36674-0.685-0.36125z"
        />
        <path
          className="el-2"
          d="m17.615 5.76c-0.16475 0.00378-0.32431 0.058355-0.45687 0.15625-0.35534 0.2621-0.43114 0.76252-0.16937 1.1181 2.2905 3.1074 2.2905 7.336 0 10.443-0.26218 0.35568-0.18635 0.85657 0.16937 1.1187 0.35568 0.26218 0.85657 0.18635 1.1187-0.16937 2.7026-3.6665 2.7026-8.6747 0-12.341-0.15443-0.20985-0.40138-0.33134-0.66187-0.32563z"
        />
        <path
          className="el-3"
          d="m19.704 3.68c-0.17928 0.0019-0.35272 0.063973-0.4925 0.17625-0.34479 0.27659-0.39993 0.78038-0.12313 1.125 3.4165 4.2529 3.4165 10.297 0 14.55-0.27639 0.34452-0.22127 0.84786 0.12313 1.1244 0.34436 0.27654 0.84767 0.2217 1.1244-0.1225 3.8811-4.8311 3.8811-11.723 0-16.555-0.15368-0.19119-0.38658-0.30131-0.63187-0.29875z"
        />
      </svg>
    </button>
  )
}

export default memo(ButtonBar)
