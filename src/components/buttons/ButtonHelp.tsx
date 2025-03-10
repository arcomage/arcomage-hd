import cl from 'clarr'
import React, { useContext } from 'react'
import { SCREEN_HELP } from '@/constants/ActionTypes'
import { I18nContext } from '@/i18n/I18nContext'
import { useAppSelector, useAppDispatch } from '@/utils/hooks/useAppDispatch'
import isScreenState from '@/utils/isScreenState'
import { tooltipAttrs } from '@/utils/tooltip'
import styles from './ButtonHelp.module.scss'

const ButtonHelp = () => {
  const _ = useContext(I18nContext)

  const help = useAppSelector((state) => state.screen.help)
  const isScreen = useAppSelector(isScreenState)

  const dispatch = useAppDispatch()

  const clickFunc = () => {
    dispatch({
      type: SCREEN_HELP,
      show: true,
    })
  }

  return (
    <button
      {...(isScreen ? { tabIndex: -1 } : {})}
      accessKey="h"
      className={cl(
        'topbutton',
        styles.helpbutton,
        help && styles.windowactive,
      )}
      onClick={clickFunc}
      onAuxClick={clickFunc}
      {...tooltipAttrs(_.i18n('Help'), 'bottom')}
      aria-label={_.i18n('Help')}
    >
      <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path d="M12,2.1c-5.5,0-9.9,4.4-9.9,9.9c0,5.5,4.4,9.9,9.9,9.9c5.5,0,9.9-4.4,9.9-9.9C21.9,6.5,17.5,2.1,12,2.1z M12,20.1c-4.5,0-8.1-3.6-8.1-8.1c0-4.5,3.6-8.1,8.1-8.1c4.5,0,8.1,3.6,8.1,8.1C20.1,16.5,16.5,20.1,12,20.1z" />
        <path d="M11.8,6.7c-2.5,0-3.2,2.2-3.2,2.2L10,9.7c0,0,0.3-0.8,0.9-1.2c0.5-0.4,1.6-0.6,2.2,0.1c0.7,0.9-0.2,1.6-1.1,2.7 c-1,1.2-1,3.7-1,3.7h2c0,0,0.1-2.3,1-3.4c0.6-0.7,1.4-1.3,1.4-2.5S14.3,6.7,11.8,6.7z" />
        <rect x="11" y="16" width="2" height="2" />
      </svg>
    </button>
  )
}

export default ButtonHelp
