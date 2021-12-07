import React, { memo, useContext } from 'react'
import cx from 'classnames'
import { createUseStyles } from 'react-jss'
import { useAppSelector, useAppDispatch } from '../../utils/useAppDispatch'

import { SCREEN_VOLUME_PREF } from '../../constants/ActionTypes'
import { I18nContext } from '../../i18n/I18nContext'
import TooltipAll from '../special/TooltipAll'

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
  sgPrefButton: {
    left: 'calc(60% + 6rem)',
    '@media screen and (prefers-reduced-motion: no-preference)': {
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
  },
})

const ButtonSgPref = () => {
  const _ = useContext(I18nContext)

  const sgPref = useAppSelector((state) => state.screen.sgPref)

  const dispatch = useAppDispatch()

  const classes = useStyles()

  const clickFunc = () => {
    dispatch({
      type: SCREEN_VOLUME_PREF,
      show: true,
    })
  }

  return (
    <TooltipAll title={_.i18n('Sound & Graphics')}>
      <button
        accessKey="s"
        className={cx('topbutton', classes.sgPrefButton, {
          windowactive: sgPref,
        })}
        onClick={clickFunc}
        onAuxClick={clickFunc}
      >
        <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path
            className="el-0"
            d="m12.584 3.3633a0.80007 0.80007 0 0 0-0.50195 0.19531l-5.2637 4.5527h-4.8984a0.80007 0.80007 0 0 0-0.79883 0.79883v6.1113a0.80007 0.80007 0 0 0 0.79883 0.79883h4.8184l5.3437 4.6211a0.80007 0.80007 0 0 0 1.3223-0.60352v-15.674a0.80007 0.80007 0 0 0-0.79492-0.80078 0.80007 0.80007 0 0 0-0.025391 0zm-5.3555 5.4805c2.9487 0 4.4004 2.8359 4.459 2.9531l0.099609 0.20312-0.099609 0.20312c-0.058613 0.11722-1.5103 2.9531-4.459 2.9531-2.9487 0-4.3998-2.8359-4.4629-2.9531l-0.099609-0.20312 0.10352-0.20312c0.058613-0.11722 1.5103-2.9531 4.459-2.9531zm0 0.90234c-1.9748-1e-7 -3.1558 1.6678-3.5391 2.2539 0.38324 0.58613 1.5643 2.2539 3.5391 2.2539 1.9748 0 3.1558-1.6678 3.5391-2.2539-0.38324-0.58613-1.5643-2.2539-3.5391-2.2539zm-0.0019531 0.44922c1.0041 2e-6 1.8379 0.8069 1.8379 1.8047 4e-7 0.99779-0.83383 1.8047-1.8379 1.8047-1.0041-2e-6 -1.8379-0.8069-1.8379-1.8047-4e-7 -0.99779 0.83383-1.8047 1.8379-1.8047zm0 0.91406c-0.52133 0-0.92383 0.39956-0.92383 0.89062-2e-7 0.49107 0.4025 0.89062 0.92383 0.89062s0.92383-0.39956 0.92383-0.89062c2e-7 -0.49107-0.4025-0.89062-0.92383-0.89062z"
          />
          <path
            className="el-1"
            d="m15.344 7.776c-0.15037 0.00316-0.2968 0.048654-0.4225 0.13125-0.36963 0.2424-0.47262 0.73862-0.23 1.1081 1.1907 1.8141 1.1907 4.1559 0 5.97-0.24222 0.36936-0.13926 0.86513 0.23 1.1075 0.36936 0.24222 0.86513 0.13926 1.1075-0.23 1.5381-2.3435 1.5381-5.3821 0-7.7253-0.15095-0.23027-0.40971-0.36674-0.685-0.36125z"
          />
          <path
            className="el-2"
            d="m17.615 5.504c-0.16475 0.00378-0.32431 0.058355-0.45687 0.15625-0.35534 0.2621-0.43114 0.76252-0.16937 1.1181 2.2905 3.1074 2.2905 7.336 0 10.443-0.26218 0.35568-0.18635 0.85657 0.16937 1.1187 0.35568 0.26218 0.85657 0.18635 1.1187-0.16937 2.7026-3.6665 2.7026-8.6747 0-12.341-0.15443-0.20985-0.40138-0.33134-0.66187-0.32563z"
          />
          <path
            className="el-3"
            d="m19.704 3.4244c-0.17928 0.0019-0.35272 0.063973-0.4925 0.17625-0.34479 0.27659-0.39993 0.78038-0.12313 1.125 3.4165 4.2529 3.4165 10.297 0 14.55-0.27639 0.34452-0.22127 0.84786 0.12313 1.1244 0.34436 0.27654 0.84767 0.2217 1.1244-0.1225 3.8811-4.8311 3.8811-11.723 0-16.555-0.15368-0.19119-0.38658-0.30131-0.63187-0.29875z"
          />
        </svg>
      </button>
    </TooltipAll>
  )
}

export default memo(ButtonSgPref)
