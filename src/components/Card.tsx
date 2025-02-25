import React, { useContext, useRef } from 'react'
import { USE_CARD, DISCARD_CARD } from '@/constants/ActionTypes'
import {
  canDiscardUndiscardableWhenDDP,
  hideOpponentCard,
  shouldUseAi,
} from '@/constants/devSettings'
import { cardNameMaxLength, touchDelay } from '@/constants/visuals'
import dataCards from '@/data/cards'
import { I18nContext } from '@/i18n/I18nContext'
import { CardTotalType, ownerType } from '@/types/state'
import cl from '@/utils/clarr'
import { useAppSelector, useAppDispatch } from '@/utils/hooks/useAppDispatch'
import isTouch from '@/utils/isTouch'
import { tooltipAttrs } from '@/utils/tooltip'
import styles from './Card.module.scss'

// `import.meta.glob()` is vite-only
const images = import.meta.glob('../../assets/img/cards/*.webp', {
  eager: true,
})
const getImageUrl = (n: number) => {
  return (
    (images[`../../assets/img/cards/${n}.webp`] as { default: string })
      ?.default || ''
  )
}

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
  const cardName = _.cards(n, 'name')
  const cardNameLength = cardName.length
  const playersTurn = useAppSelector((state) => state.game.playersTurn)
  const locked = useAppSelector((state) =>
    state.game.locked.some((l) => l === true),
  )
  const discardMode = useAppSelector((state) => state.game.discardMode)
  const main = useRef<HTMLButtonElement>(null)

  const multiGameNumber = useAppSelector(
    (state) => state.multiplayer.gameNumber,
  )

  const totalObj: Readonly<CardTotalType> = useAppSelector(
    (state) => state.cards.total,
  ) // player: 4 | 5 | 6 | 7 | 8, opponent:...

  const isEndScreen = useAppSelector((state) => !!state.screen.end.type)

  const dispatch = useAppDispatch()

  const cardsInHand = useAppSelector((state) => state.settings.cardsInHand) + 1

  const total =
    owner === 'common'
      ? totalObj[playersTurn ? 'player' : 'opponent']
      : totalObj[owner]

  const isM0 = total === cardsInHand

  const isCardback = n === -1 || (hideOpponentCard && owner === 'opponent')

  const type = isCardback ? undefined : dataCards[n].type

  if (type === undefined) {
    // CardBack
    // `type === undefined` is equivalent to `isCardback`
    return (
      <button
        ref={main}
        disabled
        aria-hidden={true}
        tabIndex={-1}
        className={cl(
          styles.main,
          styles.cardbackhard,
          ((playersTurn && owner === 'opponent') ||
            (!playersTurn && owner === 'player')) &&
            'opacity-0 pointer-events-none',
          n === -1 && styles.unusableopacity,
          'card',
          `card-pos-${position}`,
          `card-pos-${isM0 ? 'm0' : 'm1'}`,
        )}
      >
        <div className={cl(styles.cardbackimage, 'pixelated')}></div>
      </button>
    )
  } else {
    // CardFront

    const { cost, special } = dataCards[n]

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

    if (
      (playersTurn && owner === 'opponent') ||
      (!playersTurn && owner === 'player')
    ) {
      buttonDisabled = true
    }

    const cardTooltip = _.i18n('This card costs %s').replace(
      '%s',
      cost === 1
        ? _.i18n(['1 brick', '1 gem', '1 recruit'][type])
        : _.i18n(['%s bricks', '%s gems', '%s recruits'][type]).replace(
            '%s',
            cost.toString(10),
          ),
    )

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
        accessKey={
          !buttonDisabled && position >= 0 && position < 9
            ? (position + 1).toString(10)
            : ''
        }
        tabIndex={isEndScreen ? -1 : !buttonDisabled ? position + 1 : -1}
        disabled={buttonDisabled}
        {...onClickFunc}
        {...onContextMenuFunc}
        onKeyDown={(e) => {
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
        }}
      >
        <div
          className={cl(
            styles.cardfront,
            zeroOpacity
              ? 'opacity-0'
              : unusable
                ? styles.unusableopacity
                : 'opacity-100',
          )}
        >
          <div
            className={cl(styles.cardname, 'el-text cantoggleboldfont')}
            style={{
              fontSize:
                cardNameLength > cardNameMaxLength
                  ? `calc(var(--cardwidth) * 0.094 * ${cardNameMaxLength + 1} / ${cardNameLength})`
                  : 'inherit',
            }}
          >
            {cardName}
          </div>
          <div className={styles.imagewrapper}>
            <div
              style={{
                backgroundImage: `url(${getImageUrl(n)})`,
              }}
              className={cl(styles.imageholder, 'pixelated')}
            ></div>
            {discarded && (
              <div className={cl(styles.discarded, 'el-text')}>
                {_.i18n('discarded')}
              </div>
            )}
          </div>
          <div className={styles.text}>
            <div className={cl(styles.textholder, 'el-text cantoggleboldfont')}>
              {_.cards(n, 'desc')}
            </div>
          </div>
          <div className={styles.resall}>
            <div
              className={cl(
                styles.resbg,
                [styles.brick, styles.gem, styles.recruit][type],
              )}
            ></div>
            <div
              className={cl(styles.cost, 'el-number')}
              {...tooltipAttrs(cardTooltip, undefined, { noTouch: true })}
            >
              {cost}
            </div>
          </div>
        </div>
        <div
          className={cl(
            styles.cardback,
            zeroOpacity
              ? 'opacity-0'
              : unusable
                ? styles.unusableopacity
                : 'opacity-100',
          )}
        >
          <div className={cl(styles.cardbackimage, 'pixelated')}></div>
        </div>
      </button>
    )
  }
}

export default Card
