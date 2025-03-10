import cl from 'clarr'
import React, { useContext, useRef } from 'react'
import { USE_CARD, DISCARD_CARD } from '@/constants/ActionTypes'
import {
  canDiscardUndiscardableWhenDDP,
  hideOpponentCard,
  shouldUseAi,
} from '@/constants/devSettings'
import { touchDelay } from '@/constants/visuals'
import dataCards from '@/data/cards'
import { I18nContext } from '@/i18n/I18nContext'
import { CardTotalType, ownerType } from '@/types/state'
import { useAppSelector, useAppDispatch } from '@/utils/hooks/useAppDispatch'
import isScreenState from '@/utils/isScreenState'
import isTouch from '@/utils/isTouch'
import styles from './Card.module.scss'
import CardBack from './CardBack'
import CardFront from './CardFront'

type PropType = {
  n: number // 0 | 1 | 2 | ... | -1: cardback. index of the card in `cards` array, see src/data/cards.ts
  unusable?: boolean
  discarded?: boolean
  position: number // 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | ... | -1 | -2 | -3 | -4 | -5. See ROOTFOLDER/tools/devnotes/card-state-position-numbers.png
  owner?: ownerType
  index?: number // in-store index
  isFlipped?: boolean
  zeroOpacity?: boolean
}
const Card = ({
  n,
  unusable = false,
  discarded = false,
  position,
  owner = 'common',
  index = -1,
  isFlipped = false,
  zeroOpacity = false,
}: PropType) => {
  const _ = useContext(I18nContext)
  const dispatch = useAppDispatch()
  const main = useRef<HTMLButtonElement>(null)

  const playersTurn = useAppSelector((state) => state.game.playersTurn)
  const locked = useAppSelector((state) =>
    state.game.locked.some((l) => l === true),
  )
  const discardMode = useAppSelector((state) => state.game.discardMode)
  const multiGameNumber = useAppSelector(
    (state) => state.multiplayer.gameNumber,
  )
  const totalObj: Readonly<CardTotalType> = useAppSelector(
    (state) => state.cards.total,
  ) // player: 4 | 5 | 6 | 7 | 8, opponent:...
  const isScreen = useAppSelector(isScreenState)
  const cardsInHand = useAppSelector((state) => state.settings.cardsInHand) + 1

  const total =
    owner === 'common'
      ? totalObj[playersTurn ? 'player' : 'opponent']
      : totalObj[owner]
  const isM0 = total === cardsInHand
  const isCardback = n === -1 || (hideOpponentCard && owner === 'opponent')
  const type = isCardback ? undefined : dataCards[n].type
  const isNotPlayersTurn =
    (playersTurn && owner === 'opponent') ||
    (!playersTurn && owner === 'player')

  if (type === undefined) {
    // CardBack
    // `type === undefined` is equivalent to `isCardback`, use the former for type narrowing
    return (
      <button
        ref={main}
        disabled
        aria-hidden={true}
        tabIndex={-1}
        className={cl(
          styles.main,
          styles.cardbackhard,
          isNotPlayersTurn && 'opacity-0 pointer-events-none',
          n === -1 && styles.unusableopacity,
          'card',
          `card-pos-${position}`,
          `card-pos-${isM0 ? 'm0' : 'm1'}`,
        )}
      >
        <div className={cl(styles.cardbackimage, 'pixelated')}></div>
      </button>
    )
  }

  // CardFront
  const { special } = dataCards[n]
  let buttonDisabled = true

  const useCardFunc = () => {
    if (owner !== 'common') {
      dispatch({
        type: USE_CARD,
        n,
        index,
        position,
        owner,
      })
    }
  }

  const discardCardFunc = () => {
    if (owner !== 'common') {
      dispatch({
        type: DISCARD_CARD,
        index,
        position,
        owner,
      })
    }
  }

  const onClickFunc = (() => {
    if (
      owner !== 'common' &&
      !locked &&
      !(shouldUseAi && multiGameNumber === -1 && owner === 'opponent')
    ) {
      if (discardMode) {
        if (canDiscardUndiscardableWhenDDP || !special?.undiscardable) {
          buttonDisabled = false
          return {
            onClick: discardCardFunc,
          }
        }
      } else {
        if (!unusable) {
          buttonDisabled = false
          return {
            onClick: useCardFunc,
          }
        }
      }
    }
    return {}
  })()

  const onContextMenuFunc = (() => {
    if (
      owner !== 'common' &&
      !locked &&
      (!special?.undiscardable ||
        (discardMode && canDiscardUndiscardableWhenDDP)) &&
      !(shouldUseAi && multiGameNumber === -1 && owner === 'opponent')
    ) {
      buttonDisabled = false
      let timer: ReturnType<typeof setTimeout> | undefined
      const clear = () => {
        if (timer) {
          clearTimeout(timer)
        }
      }
      /**
       * Note: Most mobile systems treat long press as right click on desktop,
       * but not iOS 13+ which need onTouch listeners
       * so we use onTouch listeners for all (very likely) touch-only devices and use onContextMenu for all other devices
       */
      return isTouch
        ? {
            onTouchStart: (e: React.TouchEvent<HTMLButtonElement>) => {
              if (e.touches.length > 1) {
                // ignore multi-touch
                return
              }
              timer = setTimeout(() => {
                e.preventDefault()
                discardCardFunc()
              }, touchDelay)
            },
            onTouchCancel: clear,
            onTouchEnd: clear,
            onTouchMove: clear,
          }
        : {
            onContextMenu: (e: React.MouseEvent) => {
              e.preventDefault()
              discardCardFunc()
            },
          }
    }
    return {}
  })()

  if (isNotPlayersTurn) {
    buttonDisabled = true
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Delete' || e.key === 'Backspace') {
      const el = main.current
      if (el) {
        const mouseEvent = new MouseEvent('contextmenu', {
          bubbles: true,
          cancelable: true,
          view: window,
          button: 2,
        })
        e.preventDefault()
        el.dispatchEvent(mouseEvent)
      }
    }
  }

  const accessKey =
    !buttonDisabled && position >= 0 && position < 9
      ? (position + 1).toString()
      : ''

  let tabIndexData = -1
  let tabIndexShown = -1 // attr `tabindex` must be -1 or 0
  if (!isScreen && !buttonDisabled) {
    tabIndexData = position + 1
    tabIndexShown = 0
  }

  return (
    <button
      ref={main}
      className={cl(
        styles.main,
        styles.cardeffect,
        styles[['red', 'blue', 'green'][type]],
        isFlipped && styles.isflipped,
        ((playersTurn && owner === 'opponent') ||
          (!playersTurn && owner === 'player')) &&
          'opacity-0 pointer-events-none',
        position !== -1 && 'shadow-lg',
        position >= 0 && 'cursor-pointer hover:scale-105',
        'card',
        `card-pos-${position}`,
        `card-pos-${isM0 ? 'm0' : 'm1'}`,
      )}
      accessKey={accessKey}
      tabIndex={tabIndexShown}
      data-tabindex={tabIndexData}
      disabled={buttonDisabled}
      onKeyDown={handleKeyDown}
      {...onClickFunc}
      {...onContextMenuFunc}
    >
      <CardFront
        n={n}
        discarded={discarded}
        unusable={unusable}
        zeroOpacity={zeroOpacity}
      />
      <CardBack unusable={unusable} zeroOpacity={zeroOpacity} />
    </button>
  )
}

export default Card
