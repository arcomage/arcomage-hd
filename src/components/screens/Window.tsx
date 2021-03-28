import React, { memo, useContext, useRef } from 'react'
import cx from 'classnames'
import { createUseStyles } from 'react-jss'
import { useAppDispatch } from '../../utils/useAppDispatch'

import logo from '../../../assets/logo/logo.svg'
import useClickOutside from '../../utils/useClickOutside'
import { I18nContext } from '../../i18n/I18nContext'

const useStyles = createUseStyles({
  logo: {
    'background-image': `url(${logo})`,
    width: '134.5px',
    height: '46.5px',
  },
})

type PropType = { ScreenActionType: any; children: React.ReactNode }
const Window = ({ ScreenActionType, children }: PropType) => {
  const dispatch = useAppDispatch()
  const trans = useContext(I18nContext)

  const prefRef = useRef(null)
  useClickOutside(prefRef, () => {
    dispatch({
      type: ScreenActionType,
      show: false,
    })
  })

  const classes = useStyles()
  return (
    <div className={cx('window-bg')}>
      <div className={cx('window-outerwrapper')}>
        <div ref={prefRef} className={cx('window-wrapper')}>
          <div
            className={cx(
              classes.logo,
              'm-auto bg-no-repeat bg-center bg-contain',
            )}
          ></div>

          {children}

          <button
            className="cancel"
            title={trans.i18n?.['Cancel']}
            onClick={() => {
              dispatch({
                type: ScreenActionType,
                show: false,
              })
            }}
          ></button>
        </div>
      </div>
    </div>
  )
}

export default memo(Window)
