import React, { useState, useContext, memo, MouseEvent, useRef } from 'react'
import cx from 'classnames'
import { createUseStyles } from 'react-jss'

import { useAppSelector, useAppDispatch } from '../utils/useAppDispatch'
import { USE_CARD, DISCARD_CARD } from '../constants/ActionTypes'
import { CardTotalType, ownerType } from '../types/state'
import {
  cardGradientSideOpacity,
  cardGradientSideRgb,
  cardTransitionDurationMs,
  resbgOpacity,
  unusableCardOpacity,
} from '../constants/visuals'
import { cardCountPerType } from '../data/cardCountPerType'

import dataCards from '../../src/data/cards'

import noise from '../../assets/img/noise.png'
import cardbackbg from '../../assets/img/cardback.png'
import brick from '../../assets/img/brick.svg'
import gem from '../../assets/img/gem.svg'
import recruit from '../../assets/img/recruit.svg'

import { I18nContext } from '../i18n/I18nContext'
import {
  canDiscardUndiscardableWhenDDP,
  hideOpponentCard,
  useAi,
} from '../constants/devSettings'
import { CardPosContext, CardPosType } from '../utils/CardPosContext'

const useStyles = createUseStyles<
  string,
  {
    cardPos: CardPosType | null
    total: number
    position: number
    type?: number
    unusable: boolean
    zeroOpacity: boolean
  }
>({
  main: {
    width: ({ cardPos }) => cardPos?.width,
    height: ({ cardPos }) => cardPos?.height,
    top: ({ cardPos, total, position }) =>
      cardPos?.[total === cardPos.total ? 'top' : 'topM1'][position + 5],
    left: ({ cardPos, total, position }) =>
      cardPos?.[total === cardPos.total ? 'left' : 'leftM1'][position + 5],

    // 'will-change: opacity' has bug and cannot be set here
    'will-change': 'transform, left, top, box-shadow',
    'transition-property': 'opacity, transform, left, top, box-shadow',
    'transition-timing-function': 'ease-in-out',
    'transition-duration': `${cardTransitionDurationMs}ms`,
  },
  isflipped: {
    transform: 'translateX(-100%) rotateY(-179.99deg)',
  },
  cardeffect: {
    'transform-style': 'preserve-3d',
    'transform-origin': 'center right',
  },
  cardfront: {
    'background-image': `url(${noise})`,
    'backface-visibility': 'hidden',
    opacity: ({ unusable, zeroOpacity }) => {
      if (zeroOpacity) {
        return 0
      }
      if (unusable) {
        return unusableCardOpacity
      }
      return 1
    },
    'will-change': 'transform, left, top, box-shadow',
    'transition-property': 'opacity, transform, left, top, box-shadow',
    'transition-timing-function': 'ease-in-out',
    'transition-duration': `${cardTransitionDurationMs}ms`,
    '&:before': {
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
    background: {
      image: `url(${cardbackbg})`,
      size: 'cover',
      position: 'center',
      repeat: 'no-repeat',
    },
    opacity: ({ unusable, zeroOpacity }) => {
      if (zeroOpacity) {
        return 0
      }
      if (unusable) {
        return unusableCardOpacity
      }
      return 1
    },
    'will-change': 'transform, left, top, box-shadow',
    'transition-property': 'opacity, transform, left, top, box-shadow',
    'transition-timing-function': 'ease-in-out',
    'transition-duration': `${cardTransitionDurationMs}ms`,
    '&:before': {
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
    transform: 'translateX(0) rotateY(180deg)',
    'backface-visibility': 'hidden',
  },
  cardbackhard: {
    background: {
      image: `url(${cardbackbg})`,
      size: 'cover',
      position: 'center',
      repeat: 'no-repeat',
    },
    '&:before': {
      width: '100%',
      height: '100%',
      position: 'absolute',
      top: '0',
      left: '0',
      content: '""',
      background: `linear-gradient(to left, rgba(${cardGradientSideRgb}, ${cardGradientSideRgb}, ${cardGradientSideRgb}, ${cardGradientSideOpacity}), rgba(0, 0, 0, 0), rgba(${cardGradientSideRgb}, ${cardGradientSideRgb}, ${cardGradientSideRgb}, ${cardGradientSideOpacity}))`,
    },
  },
  image: {
    // width: calc(100% - 0.25rem * 2),
    height: 'calc((100% / 63 * 47 - 0.5rem) / 22 * 13)',
  },
  text: {
    // width: calc(100% - 0.25rem * 2),
    height:
      'calc(100% - (1.25rem + 0.25rem + 0.25rem) - (0.5rem + 0.5rem) - (100% / 63 * 47 - 0.5rem) / 22 * 13)',
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
  n: number // .. | -1: cardback
  unusable?: boolean
  discarded?: boolean
  position: number // 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | -1 | -2 | -3 | -4 | -5
  owner?: ownerType
  index?: number // in-store index
  isflipped?: boolean
}
const Card = ({
  n,
  unusable = false,
  discarded = false,
  position,
  owner = 'common',
  index = -1,
  isflipped = false,
}: PropType) => {
  const _ = useContext(I18nContext)
  const playersTurn = useAppSelector((state) => state.game.playersTurn)
  const locked = useAppSelector((state) => state.game.locked)
  const discardMode = useAppSelector((state) => state.game.discardMode)
  const main = useRef<HTMLButtonElement | null>(null)

  const totalObj: Readonly<CardTotalType> = useAppSelector(
    (state) => state.cards.total,
  ) // player: 4 | 5 | 6 | 7 | 8, opponent:...

  const dispatch = useAppDispatch()
  const cardPos = useContext(CardPosContext)
  const [zeroOpacity, setZeroOpacity] = useState(false)

  const total =
    owner === 'common'
      ? totalObj[playersTurn ? 'player' : 'opponent']
      : totalObj[owner]

  if (n === -1 || (hideOpponentCard && owner === 'opponent')) {
    const classes = useStyles({
      cardPos,
      total,
      position,
      unusable,
      zeroOpacity,
    })
    return (
      <button
        ref={main}
        disabled={true}
        className={cx(
          classes.main,
          classes.cardbackhard,
          'transform absolute rounded shadow-lg',
          {
            'opacity-0 pointer-events-none':
              (playersTurn && owner === 'opponent') ||
              (!playersTurn && owner === 'player'),
            [classes.unusableopacity]: n === -1,
          },
        )}
      ></button>
    )
  } else {
    const { type, cost, special } = dataCards[n]

    const classes = useStyles({
      cardPos,
      total,
      position,
      type,
      unusable,
      zeroOpacity,
    })
    const color = ['red', 'blue', 'green'][type]
    // Force TailwindCSS to aware of these classes:
    // bg-red-200
    // bg-blue-200
    // bg-green-200
    // bg-red-300
    // bg-blue-300
    // bg-green-300

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
      if (owner !== 'common' && !locked && !(useAi && owner === 'opponent')) {
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
        !(useAi && owner === 'opponent')
      ) {
        buttonDisabled = false
        return {
          onContextMenu: (e: MouseEvent) => {
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

    return (
      <button
        ref={main}
        className={cx(
          classes.main,
          classes.cardeffect,
          { [classes.isflipped]: isflipped },
          'transform absolute rounded',
          {
            'opacity-0 pointer-events-none':
              (playersTurn && owner === 'opponent') ||
              (!playersTurn && owner === 'player'),
          },
          { 'shadow-lg': position !== -1 },
          { 'cursor-pointer hover:scale-105': position >= 0 },
        )}
        accessKey={
          !buttonDisabled && position >= 0 && position < 9
            ? (position + 1).toString(10)
            : ''
        }
        tabIndex={!buttonDisabled ? position + 1 : -1}
        disabled={buttonDisabled}
        {...onClickFunc}
        {...onContextMenuFunc}
        onKeyDown={(event) => {
          if (event.key === 'Delete' || event.key === 'Backspace') {
            const el = main.current
            if (el) {
              const mouseEvent = new MouseEvent('contextmenu', {
                bubbles: true,
                cancelable: false,
                view: window,
                button: 2,
                buttons: 0,
                clientX: el.getBoundingClientRect().x,
                clientY: el.getBoundingClientRect().y,
              })
              el.dispatchEvent(mouseEvent)
            }
          }
        }}
        onTransitionEnd={(e) => {
          if (e.propertyName === 'transform' && position === -1) {
            // card moved to the stack, will fade
            setZeroOpacity(true)
            // when the card fade finishes, it will be deleted, see epics/clearCardEpic.ts
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
              'm-1 shadow text-center font-bold leading-5 h-5',
              `bg-${color}-200`,
            )}
          >
            {_.cards(n, 'name')}
          </div>
          <div
            className={cx(
              classes.image,
              'm-1 shadow bg-no-repeat bg-cover bg-center flex justify-center items-center text-red-600 text-xl font-bold uppercase text-shadow-stroke',
            )}
            style={{
              backgroundImage: `url(${
                require(`../../assets/img/cards/${dataCards[
                  n
                ].type.toString()}_${(n % cardCountPerType).toString()}.png`)
                  .default
              })`,
            }}
          >
            {discarded && _.i18n('discarded')}
          </div>
          <div
            className={cx(
              classes.text,
              'm-2 flex flex-wrap content-center justify-center',
            )}
          >
            <div className="leading-none break-words text-center">
              {_.cards(n, 'desc')}
            </div>
          </div>
          <div className="absolute bottom-1 right-1 w-9 h-9 leading-9 text-center font-bold">
            <div
              className={cx(
                classes.resbg,
                'absolute top-0 left-0 w-full h-full',
              )}
            ></div>
            <div className="absolute top-0 left-0 w-full h-full">{cost}</div>
          </div>
        </div>
        <div
          className={cx(
            classes.cardback,
            classes.cardbackeffect,
            'absolute top-0 bottom-0 left-0 right-0 rounded',
          )}
        ></div>
      </button>
    )
  }
}

export default memo(Card)
