import React, { useContext, useEffect, useRef, useState } from 'react'
import cx from 'clsx'
import { createUseStyles } from 'react-jss'
import { useAppDispatch } from '../../utils/hooks/useAppDispatch'

import logo from '../../../assets/logo/logo.svg'
import useClickOutside from '../../utils/hooks/gamecontrols/useClickOutside'
import { I18nContext } from '../../i18n/I18nContext'
import useKeyDown from '../../utils/hooks/gamecontrols/useKeyDown'
import { GameSizeContext } from '../../utils/contexts/GameSizeContext'
import {
  SCREEN_PREF,
  SCREEN_LANG_PREF,
  SCREEN_VOLUME_PREF,
  SCREEN_HELP,
  SCREEN_LANDSCAPE,
  SCREEN_DISCONNECT_NOTICE,
} from '../../constants/ActionTypes'
import TooltipAll from '../special/TooltipAll'

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
    | typeof SCREEN_DISCONNECT_NOTICE
  children: React.ReactNode
  onCancel?: () => void
  darkerBg?: boolean
  exitableDelay?: number
}
const Window = ({
  screenActionType,
  children,
  onCancel,
  darkerBg = false,
  exitableDelay = 0,
}: PropType) => {
  const dispatch = useAppDispatch()
  const _ = useContext(I18nContext)

  const containerRef = useRef<HTMLDivElement>(null)

  const [exitable, setExitable] = useState(false)
  useEffect(() => {
    setExitable(false)
    const timer: ReturnType<typeof setTimeout> = setTimeout(() => {
      setExitable(true)
    }, exitableDelay)

    setTimeout(() => {
      if (containerRef.current) {
        ;(
          containerRef.current.querySelector(
            'a[href], button, input, textarea, select, details, [tabindex]:not([tabindex="-1"])',
          ) as HTMLElement | null
        )?.focus()
      }
    }, 50)
    // containerRef.current.focus()

    return () => {
      clearTimeout(timer)
    }
  }, [])
  const exitableRef = useRef<boolean>(undefined)
  exitableRef.current = exitable

  const cancelFunc = () => {
    if (exitableRef.current) {
      if (onCancel !== undefined) {
        onCancel()
      }
      dispatch({
        type: screenActionType,
        show: false,
      })
    }
  }

  const prefRef = useRef<HTMLDivElement>(null)
  useClickOutside(prefRef, cancelFunc)
  useKeyDown('Escape', cancelFunc)

  const size = useContext(GameSizeContext)

  const classes = useStyles()

  return (
    <div
      className={cx('window-bg', { darkerbg: darkerBg })}
      role="dialog"
      aria-modal={true}
      ref={containerRef}
    >
      <div className={'window-outerwrapper'}>
        <div
          ref={prefRef}
          className={cx(
            'window-wrapper',
            screenActionType.toLowerCase().replace(/_/g, '-'),
          )}
        >
          <TooltipAll title={_.i18n('ArcoMage HD')}>
            <div
              className={cx(
                classes.logo,
                {
                  hidden:
                    size.narrowMobile &&
                    (screenActionType === SCREEN_PREF ||
                      screenActionType === SCREEN_VOLUME_PREF),
                },
                'm-auto bg-no-repeat bg-center bg-contain',
              )}
              aria-hidden={true}
            ></div>
          </TooltipAll>

          {children}

          <TooltipAll title={_.i18n('Cancel')}>
            <button
              accessKey="x"
              className="cancel"
              onClick={cancelFunc}
            ></button>
          </TooltipAll>
        </div>
      </div>
    </div>
  )
}

export default Window
