import React, { useCallback, useContext, useEffect, useState } from 'react'
import { CLOSE_SCREEN_END_INIT } from '@/constants/ActionTypes'
import { endScreenExitableDelay } from '@/constants/visuals'
import { I18nContext } from '@/i18n/I18nContext'
import { EndScreenNoCloseStateType } from '@/types/state'
import { reasonTranslate } from '@/utils/checkVictory'
import cl from '@/utils/clarr'
import { GameSizeContext } from '@/utils/contexts/GameSizeContext'
import useKeyDown from '@/utils/hooks/gamecontrols/useKeyDown'
import { useAppDispatch } from '@/utils/hooks/useAppDispatch'
import styles from './EndScreen.module.scss'
import EndScreenReviewCardsBtn from './EndScreenReviewCardsBtn'

const textMap = { lose: 'You Lose!', tie: 'Tie Game', win: 'You Win!' }
const erathianTextMap = { lose: 'you lose', tie: 'tie game', win: 'you win' }

const EndScreen = (endScreenState: EndScreenNoCloseStateType) => {
  const dispatch = useAppDispatch()
  const _ = useContext(I18nContext)

  const { type, surrender, reasons } = endScreenState

  const size = useContext(GameSizeContext)

  const text = _.i18n(textMap[type])

  const erathianTextArr = erathianTextMap[type].split(' ')

  const erathianTextContainer = (
    <>
      {erathianTextArr[0]}
      <span className={styles.erathiantextspace}></span>
      {erathianTextArr[1]}
    </>
  )

  let noteText: string | null = null
  if (reasons) {
    const reasonTexts = [
      ...(reasons.win
        ? reasons.win.map((reason) => reasonTranslate(reason, true, _))
        : []),
      ...(reasons.lose
        ? reasons.lose.map((reason) => reasonTranslate(reason, false, _))
        : []),
    ]
    noteText = reasonTexts.join(_.i18n('. '))
  } else if (surrender) {
    switch (type) {
      case 'win':
        noteText = _.i18n(
          'With no usable or discardable card, your opponent has surrendered',
        )
        break
      case 'lose':
        noteText = _.i18n(
          'With no usable or discardable card, you have surrendered',
        )
        break
    }
  }

  const [exitable, setExitable] = useState(false)
  useEffect(() => {
    setExitable(false)
    const timer: ReturnType<typeof setTimeout> = setTimeout(() => {
      setExitable(true)
    }, endScreenExitableDelay)

    return () => {
      clearTimeout(timer)
    }
  }, [endScreenState])

  const onActionFunc = useCallback(
    (
      e: React.MouseEvent | MouseEvent | React.KeyboardEvent | KeyboardEvent,
    ) => {
      if (
        (e instanceof KeyboardEvent ||
          ('nativeEvent' in e && e.nativeEvent instanceof KeyboardEvent)) &&
        (('key' in e &&
          (e.key === 'Tab' || e.key === 'c' || e.key === 'CapsLock')) ||
          e.shiftKey ||
          e.altKey ||
          e.ctrlKey ||
          e.metaKey)
      ) {
        return
      }
      e.preventDefault()
      dispatch({
        type: CLOSE_SCREEN_END_INIT,
      })
    },
    // no lint reason: dispatch function is stable
    // eslint-disable-next-line react-compiler/react-compiler
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [],
  )

  useKeyDown(null, onActionFunc, endScreenExitableDelay)

  const clickObj = exitable
    ? { onClick: onActionFunc, onContextMenu: onActionFunc }
    : {}

  return (
    <div
      className={cl(
        styles.container,
        styles[type],
        size.narrowMobile ? styles.narrowmobilemode : styles.normalmode,
      )}
      {...clickObj}
    >
      <div className={cl(styles.main)} role="button" tabIndex={0}>
        {noteText !== null && (
          <div className={cl(styles.notetext, 'robotocondensed el-text')}>
            {noteText}
          </div>
        )}
        <div className={cl(styles.text, 'robotocondensed el-text')}>{text}</div>
        <div className={cl(styles.erathiantext, 'erathian-normal')}>
          {erathianTextContainer}
        </div>
        {(type === 'win' || type === 'tie') && (
          <>
            <div className={cl(styles.firework, styles.firework1)}></div>
            <div className={cl(styles.firework, styles.firework2)}></div>
          </>
        )}
      </div>
      <EndScreenReviewCardsBtn />
    </div>
  )
}
export default EndScreen
