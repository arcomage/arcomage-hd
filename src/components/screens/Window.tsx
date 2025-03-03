import React, {
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react'
import {
  SCREEN_PREF,
  SCREEN_LANG_PREF,
  SCREEN_VOLUME_PREF,
  SCREEN_HELP,
  SCREEN_LANDSCAPE,
  SCREEN_DISCONNECT_NOTICE,
} from '@/constants/ActionTypes'
import { I18nContext } from '@/i18n/I18nContext'
import cl from '@/utils/clarr'
import { GameSizeContext } from '@/utils/contexts/GameSizeContext'
import useClickOutside from '@/utils/hooks/gamecontrols/useClickOutside'
import useKeyDown from '@/utils/hooks/gamecontrols/useKeyDown'
import { useAppDispatch } from '@/utils/hooks/useAppDispatch'
import { tooltipAttrs } from '@/utils/tooltip'
import { screenClassMap, screenTitleMap } from './screenMaps'
import styles from './Window.module.scss'

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

  return (
    <div
      className={cl(styles.windowbg, 'windowbg', darkerBg && styles.darkerbg)}
      role="dialog"
      aria-label={_.i18n(screenTitleMap[screenActionType])}
      aria-modal={true}
      ref={containerRef}
    >
      <div
        ref={prefRef}
        className={cl(
          styles.windowmain,
          'windowmain',
          screenClassMap[screenActionType],
        )}
      >
        <div className={cl(styles.windowinner)}>
          <div
            className={cl(
              styles.logo,
              size.narrowMobile &&
                (screenActionType === SCREEN_PREF ||
                  screenActionType === SCREEN_VOLUME_PREF) &&
                'hidden',
            )}
            aria-hidden={true}
            {...tooltipAttrs(_.i18n('ArcoMage HD'), 'bottom')}
          ></div>

          {children}

          <button
            accessKey="x"
            className={cl(styles.cancel, 'cancel')}
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
