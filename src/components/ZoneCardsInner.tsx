import React, { useContext } from 'react'
import Card from './Card'
import cx from 'clsx'
import { createUseStyles } from 'react-jss'

import { useAppSelector } from '../utils/hooks/useAppDispatch'
import { CardListItemAllType } from '../types/state'
import DiscardModeNotice from './special/DiscardModeNotice'
import { GameSizeContext } from '../utils/contexts/GameSizeContext'
import { I18nContext } from '../i18n/I18nContext'
import { tooltipAttrs } from '../utils/tooltip'
import dataCards from '../../src/data/cards'
import { canDiscardUndiscardableWhenDDP } from '../constants/devSettings'

const useStyles = createUseStyles({
  main: { background: { image: 'linear-gradient(#326a4b, #000 2rem)' } },
})

const ZoneCardsInner = () => {
  const _ = useContext(I18nContext)
  const cards: Readonly<CardListItemAllType[]> = useAppSelector(
    (state) => state.cards.list,
  )
  const discardMode = useAppSelector((state) => state.game.discardMode)

  const playersTurn = useAppSelector((state) => state.game.playersTurn)
  const locked = useAppSelector((state) =>
    state.game.locked.some((l) => l === true),
  )

  const size = useContext(GameSizeContext)

  const playerCards = cards.filter(
    (card) => card && card.position >= 0 && card.owner === 'player',
  )
  const allUnusable =
    playerCards.length > 0 &&
    playerCards.every((card) => card && card.unusable === true)

  const isMultiplayer = useAppSelector((state) => state.multiplayer.on)

  // only for multiplayer, surrender is automatic in single player (AI) mode, done in checkSurrenderEpic.ts
  const shouldSurrender =
    isMultiplayer &&
    playerCards.length > 0 &&
    playerCards.every(
      (card) =>
        card &&
        card.unusable === true &&
        dataCards[card.n].special?.undiscardable === true &&
        !(discardMode && canDiscardUndiscardableWhenDDP),
    )

  const shouldSurrenderTooltip =
    shouldSurrender && playersTurn && !locked
      ? _.i18n(
          'With no usable or discardable card, you must surrender. Open the "%s1" window and click "%s2" (or ask your opponent to do so)',
        )
          .replace('%s1', _.i18n('Preferences'))
          .replace('%s2', _.i18n('Apply & New Game'))
      : ''
  // TODO i18n

  const allUnusableTooltip =
    allUnusable && playersTurn && !locked && !discardMode
      ? _.i18n('allUnusableTip')
      : ''

  const classes = useStyles()

  return (
    <div
      className={cx(
        classes.main,
        'flex-auto',
        size.narrowMobile ? 'h-1/2' : 'h-1/3',
      )}
      {...tooltipAttrs(shouldSurrenderTooltip || allUnusableTooltip)}
    >
      <Card n={-1} position={-1} unusable />
      {cards.map((card, i) =>
        card === null ? null : <Card key={i} index={i} {...card} />,
      )}
      <DiscardModeNotice shown={discardMode} />
    </div>
  )
}

export default ZoneCardsInner
