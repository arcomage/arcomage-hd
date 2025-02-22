import React, {
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react'
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
import { tooltipAttrs } from '../../utils/tooltip'

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
    return () => {
      clearTimeout(timer)
    }
  }, [exitableDelay])

  useEffect(() => {
    setTimeout(() => {
      if (containerRef.current) {
        const lastEnabledCard = document.querySelector(
          'button.card:not([disabled]):last-of-type',
        ) as HTMLButtonElement | null
        if (lastEnabledCard) {
          // Set focus to the last enabled card so that tab will focus on the first focusable element in the Window
          lastEnabledCard.focus()
          lastEnabledCard.blur()
        }
      }
    }, 50)
  }, [])

  // to prevent cancelFunc from using stale exitable value
  const exitableRef = useRef<boolean>(false)
  useEffect(() => {
    exitableRef.current = exitable
  }, [exitable])

  const cancelFunc = useCallback(() => {
    if (exitableRef.current) {
      onCancel?.()
      dispatch({
        type: screenActionType,
        show: false,
      })
    }
    // no lint reason: dispatch, onCancel, screenActionType are stable
    // eslint-disable-next-line react-compiler/react-compiler
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

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
      <div
        ref={prefRef}
        className={cx(
          'window-wrapper',
          screenActionType.toLowerCase().replace(/_/g, '-'),
        )}
      >
        <div className={cx('window-innerwrapper')}>
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
            {...tooltipAttrs(_.i18n('ArcoMage HD'), 'bottom')}
          ></div>

          {children}

          <button
            accessKey="x"
            className="cancel"
            onClick={cancelFunc}
            aria-label={_.i18n('Cancel')}
            {...tooltipAttrs(_.i18n('Cancel'), 'bottom')}
          ></button>
        </div>
      </div>
    </div>
  )
}
export default Window
