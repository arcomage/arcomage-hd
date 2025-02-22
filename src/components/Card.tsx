import React, { useContext, useRef } from 'react'
import cx from 'clsx'
import { createUseStyles } from 'react-jss'

import { useAppSelector, useAppDispatch } from '../utils/hooks/useAppDispatch'
import { USE_CARD, DISCARD_CARD } from '../constants/ActionTypes'
import { CardTotalType, ownerType } from '../types/state'
import {
  cardGradientSideOpacity,
  cardGradientSideRgb,
  cardNameMaxLength,
  cardTransitionDuration,
  resbgOpacity,
  touchDelay,
  unusableCardOpacity,
} from '../constants/visuals'

import dataCards from '../../src/data/cards'

import noise from '../../assets/img/noise.webp'
import cardbackbg from '../../assets/img/cardback.webp'
import brick from '../../assets/img/brick.svg'
import gem from '../../assets/img/gem.svg'
import recruit from '../../assets/img/recruit.svg'

import { I18nContext } from '../i18n/I18nContext'
import {
  canDiscardUndiscardableWhenDDP,
  hideOpponentCard,
  shouldUseAi,
} from '../constants/devSettings'
import { tooltipAttrs } from '../utils/tooltip'
import isTouch from '../utils/isTouch'

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

const calcOpacity = ({
  unusable,
  zeroOpacity,
}: {
  unusable: boolean
  zeroOpacity: boolean
}): number => {
  if (zeroOpacity) {
    return 0
  }
  if (unusable) {
    return unusableCardOpacity
  }
  return 1
}

const useStyles = createUseStyles<
  string,
  {
    position: number
    type?: number
    unusable: boolean
    zeroOpacity: boolean
    cardNameLength: number
  }
>({
  main: {
    // 'will-change: opacity' has bug and cannot be set here
    'will-change': 'transform, left, top',
    'transition-property': 'opacity, transform, left, top',
    'transition-timing-function': 'ease-in-out',
    'transition-duration': `${cardTransitionDuration}ms`,
  },
  cardname: {
    'font-size': ({ cardNameLength }) => {
      if (cardNameLength > cardNameMaxLength) {
        return `calc(var(--cardwidth) * 0.094 * ${cardNameMaxLength + 1} / ${cardNameLength})`
      } else {
        return 'inherit'
      }
    },
    height: 'calc(var(--cardwidth) * 0.094 * 1.1)',
    'line-height': 'calc(var(--cardwidth) * 0.094 * 1.1)',
  },
  isflipped: {
    transform: 'translateX(-100%) translateZ(0) rotateY(-179.99deg)',
  },
  cardeffect: {
    'transform-style': 'preserve-3d',
    'transform-origin': 'center right',
  },
  cardfront: {
    'background-image': `url(${noise})`,
    'backface-visibility': 'hidden',
    opacity: calcOpacity,
    'will-change': 'transform, left, top',
    'transition-property': 'opacity, transform, left, top',
    'transition-timing-function': 'ease-in-out',
    'transition-duration': `${cardTransitionDuration}ms`,
    '&::before': {
      width: '100%',
      height: '100%',
      position: 'absolute',
      top: '0',
      left: '0',
      content: '""',
      background: `linear-gradient(to left, rgba(${cardGradientSideRgb}, ${cardGradientSideRgb}, ${cardGradientSideRgb}, ${cardGradientSideOpacity}), rgba(0, 0, 0, 0), rgba(${cardGradientSideRgb}, ${cardGradientSideRgb}, ${cardGradientSideRgb}, ${cardGradientSideOpacity}))`,
    },
  },
  unusableopacity: {
    opacity: unusableCardOpacity,
  },
  cardback: {
    opacity: calcOpacity,
    'will-change': 'transform, left, top',
    'transition-property': 'opacity, transform, left, top',
    'transition-timing-function': 'ease-in-out',
    'transition-duration': `${cardTransitionDuration}ms`,
    '&::before': {
      width: '100%',
      height: '100%',
      position: 'absolute',
      top: '0',
      left: '0',
      content: '""',
      background: `linear-gradient(to left, rgba(${cardGradientSideRgb}, ${cardGradientSideRgb}, ${cardGradientSideRgb}, ${cardGradientSideOpacity}), rgba(0, 0, 0, 0), rgba(${cardGradientSideRgb}, ${cardGradientSideRgb}, ${cardGradientSideRgb}, ${cardGradientSideOpacity}))`,
    },
  },
  cardbackeffect: {
    transform: 'translateX(0) translateZ(0) rotateY(180deg)',
    'backface-visibility': 'hidden',
  },
  cardbackhard: {
    '&::before': {
      width: '100%',
      height: '100%',
      position: 'absolute',
      top: '0',
      left: '0',
      content: '""',
      background: `linear-gradient(to left, rgba(${cardGradientSideRgb}, ${cardGradientSideRgb}, ${cardGradientSideRgb}, ${cardGradientSideOpacity}), rgba(0, 0, 0, 0), rgba(${cardGradientSideRgb}, ${cardGradientSideRgb}, ${cardGradientSideRgb}, ${cardGradientSideOpacity}))`,
    },
  },
  cardbackimage: {
    background: {
      image: `url(${cardbackbg})`,
      size: 'cover',
      position: 'center',
      repeat: 'no-repeat',
    },
  },
  imagewrapper: {
    // width: calc(100% - 0.25rem * 2),
    height: 'calc((100% / 63 * 47 - 0.5rem) / 22 * 13)',
  },
  discarded: {
    'font-size': '125%',
  },
  text: {
    // width: calc(100% - 0.25rem * 2),
    height:
      'calc(100% - (var(--cardwidth) * 0.094 * 1.1 + 0.25rem + 0.25rem) - (0.5rem + 0.5rem) - (100% / 63 * 47 - 0.5rem) / 22 * 13)',
  },
  resall: {
    width: 'calc(var(--cardwidth) * 0.2)',
    height: 'calc(var(--cardwidth) * 0.2)',
    'line-height': 'calc(var(--cardwidth) * 0.2)',
  },
  resbg: {
    'background-image': ({ type }) =>
      type === undefined ? 'none' : `url(${[brick, gem, recruit][type]})`,
    background: {
      repeat: 'no-repeat',
      size: 'cover',
      position: 'center center',
    },
    opacity: resbgOpacity,
  },
})

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
  const boldfont: boolean = useAppSelector((state) => state.lang.boldfont)

  const dispatch = useAppDispatch()

  const cardsInHand = useAppSelector((state) => state.settings.cardsInHand) + 1

  const total =
    owner === 'common'
      ? totalObj[playersTurn ? 'player' : 'opponent']
      : totalObj[owner]

  const isM0 = total === cardsInHand

  const isCardback = n === -1 || (hideOpponentCard && owner === 'opponent')

  const type = isCardback ? undefined : dataCards[n].type

  const classes = useStyles({
    position,
    type,
    unusable,
    zeroOpacity,
    cardNameLength,
  })

  if (type === undefined) {
    // CardBack
    // `type === undefined` is equivalent to `isCardback`
    return (
      <button
        ref={main}
        disabled
        aria-hidden={true}
        tabIndex={-1}
        className={cx(
          classes.main,
          classes.cardbackhard,
          'absolute rounded shadow-lg',
          {
            'opacity-0 pointer-events-none':
              (playersTurn && owner === 'opponent') ||
              (!playersTurn && owner === 'player'),
            [classes.unusableopacity]: n === -1,
          },
          'card',
          `card-pos-${position}`,
          `card-pos-${isM0 ? 'm0' : 'm1'}`,
        )}
      >
        <div
          className={cx(
            classes.cardbackimage,
            'w-full h-full bg-cover pixelated',
          )}
        ></div>
      </button>
    )
  } else {
    // CardFront

    const color = ['red', 'blue', 'green'][type]
    // Force TailwindCSS to aware of these classes:
    // bg-red-200
    // bg-blue-200
    // bg-green-200
    // bg-red-300
    // bg-blue-300
    // bg-green-300

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
        className={cx(
          classes.main,
          classes.cardeffect,
          { [classes.isflipped]: isFlipped },
          'absolute rounded',
          {
            'opacity-0 pointer-events-none':
              (playersTurn && owner === 'opponent') ||
              (!playersTurn && owner === 'player'),
          },
          { 'shadow-lg': position !== -1 },
          { 'cursor-pointer hover:scale-105': position >= 0 },
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
          className={cx(
            classes.cardfront,
            'absolute top-0 bottom-0 left-0 right-0 rounded',
            `bg-${color}-300`,
          )}
        >
          <div
            className={cx(
              classes.cardname,
              'm-1 shadow text-center tracking-tight',
              boldfont ? 'font-bold' : 'font-semibold',
              `bg-${color}-200`,
              'el-text',
            )}
          >
            {cardName}
          </div>
          <div
            className={cx(
              classes.imagewrapper,
              'relative m-1 shadow bg-no-repeat bg-cover bg-center',
            )}
          >
            <div
              style={{
                backgroundImage: `url(${getImageUrl(n)})`,
              }}
              className="w-full h-full bg-cover pixelated"
            ></div>
            {discarded && (
              <div
                className={cx(
                  classes.discarded,
                  'absolute top-0 left-0 w-full h-full flex justify-center items-center text-red-500 font-bold uppercase text-shadow-stroke',
                  'el-text',
                )}
              >
                {_.i18n('discarded')}
              </div>
            )}
          </div>
          <div
            className={cx(
              classes.text,
              'm-2 flex flex-wrap items-center justify-center',
            )}
          >
            <div
              className={cx(
                'leading-tight break-words text-center',
                boldfont && 'font-bold',
                'el-text',
              )}
            >
              {_.cards(n, 'desc')}
            </div>
          </div>
          <div
            className={cx(
              classes.resall,
              'absolute bottom-1 right-1 text-center font-bold',
            )}
          >
            <div
              className={cx(
                classes.resbg,
                'absolute top-0 left-0 w-full h-full',
              )}
            ></div>
            <div
              className={cx('absolute top-0 left-0 w-full h-full', 'el-number')}
              {...tooltipAttrs(cardTooltip, undefined, { noTouch: true })}
            >
              {cost}
            </div>
          </div>
        </div>
        <div
          className={cx(
            classes.cardback,
            classes.cardbackeffect,
            'absolute top-0 bottom-0 left-0 right-0 rounded',
          )}
        >
          <div
            className={cx(
              classes.cardbackimage,
              'w-full h-full bg-cover pixelated',
            )}
          ></div>
        </div>
      </button>
    )
  }
}

export default Card
