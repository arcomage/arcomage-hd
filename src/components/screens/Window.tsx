import React, { memo, useContext, useRef } from 'react'
import cx from 'classnames'
import { createUseStyles } from 'react-jss'
import { useAppDispatch } from '../../utils/useAppDispatch'

import logo from '../../../assets/logo/logo.svg'
import useClickOutside from '../../utils/useClickOutside'
import { I18nContext } from '../../i18n/I18nContext'
import useKeyDown from '../../utils/useKeyDown'
import { GameSizeContext } from '../../utils/GameSizeContext'
import {
  SCREEN_PREF,
  SCREEN_LANG_PREF,
  SCREEN_VOLUME_PREF,
  SCREEN_HELP,
  SCREEN_LANDSCAPE,
  SCREEN_OP_DISCONNECT,
} from '../../constants/ActionTypes'

const useStyles = createUseStyles({
  logo: {
    'background-image': `url(${logo})`,
    width: '134.5px',
    height: '46.5px',
  },
})

type PropType = {
  screenActionType:
    | typeof SCREEN_PREF
    | typeof SCREEN_LANG_PREF
    | typeof SCREEN_VOLUME_PREF
    | typeof SCREEN_HELP
    | typeof SCREEN_LANDSCAPE
    | typeof SCREEN_OP_DISCONNECT
  children: React.ReactNode
  onCancel?: () => void
  darkerBg?: boolean
}
const Window = ({
  screenActionType,
  children,
  onCancel,
  darkerBg = false,
}: PropType) => {
  const dispatch = useAppDispatch()
  const _ = useContext(I18nContext)

  const cancelFunc = () => {
    if (onCancel !== undefined) {
      onCancel()
    }
    dispatch({
      type: screenActionType,
      show: false,
    })
  }

  const prefRef = useRef(null)
  useClickOutside(prefRef, cancelFunc)
  useKeyDown('Escape', cancelFunc)

  const size = useContext(GameSizeContext)

  const classes = useStyles()
  return (
    <div className={cx('window-bg', { darkerbg: darkerBg })}>
      <div className={cx('window-outerwrapper')}>
        <div ref={prefRef} className={cx('window-wrapper')}>
          <div
            title={_.i18n('ArcoMage HD')}
            className={cx(
              classes.logo,
              { hidden: size.narrowMobile && screenActionType === SCREEN_PREF },
              'm-auto bg-no-repeat bg-center bg-contain',
            )}
          ></div>

          {children}

          <button
            className="cancel"
            title={_.i18n('Cancel')}
            onClick={cancelFunc}
          ></button>
        </div>
      </div>
    </div>
  )
}

export default memo(Window)
