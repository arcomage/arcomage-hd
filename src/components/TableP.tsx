import React, { memo, useContext } from 'react'
import Card from './Card'
import cx from 'clsx'
import { createUseStyles } from 'react-jss'

import { useAppSelector } from '../utils/hooks/useAppDispatch'
import { CardListItemAllType } from '../types/state'
import DiscardModeNotice from './special/DiscardModeNotice'
import { CardPosProvider } from '../utils/contexts/CardPosContext'
import { GameSizeContext } from '../utils/contexts/GameSizeContext'
import { I18nContext } from '../i18n/I18nContext'
import TooltipAll from './special/TooltipAll'

const useStyles = createUseStyles({
  main: { background: { image: 'linear-gradient(#326a4b, #000 2rem)' } },
})

const TableP = () => {
  const _ = useContext(I18nContext)
  const cards: Readonly<CardListItemAllType[]> = useAppSelector(
    (state) => state.cards.list,
  )
  const cardsInHand = useAppSelector((state) => state.settings.cardsInHand)
  const discardMode = useAppSelector((state) => state.game.discardMode)

  const playersTurn = useAppSelector((state) => state.game.playersTurn)
  const locked = useAppSelector((state) => state.game.locked).some(
    (l) => l === true,
  )

  const size = useContext(GameSizeContext)
  const winHeight = size.height
  const winWidth = size.width

  const playerCards = cards.filter(
    (card) => card && card.position >= 0 && card.owner === 'player',
  )
  const allUnusable =
    playerCards.length > 0 &&
    playerCards.every((card) => card && card.unusable === true)

  const classes = useStyles()

  const inner = (
    <div
      className={cx(
        classes.main,
        'flex-auto',
        size.narrowMobile ? 'h-1/2' : 'h-1/3',
      )}
    >
      <Card n={-1} position={-1} unusable />
      {cards.map((card, i) =>
        card === null ? null : <Card key={i} index={i} {...card} />,
      )}
      <DiscardModeNotice shown={discardMode} />
    </div>
  )
  return (
    <CardPosProvider
      cardsInHand={cardsInHand}
      winHeight={winHeight}
      winWidth={winWidth}
    >
      <TooltipAll
        title={
          allUnusable && playersTurn && !locked && !discardMode
            ? _.i18n('allUnusableTip')
            : ''
        }
        placement="top"
        enterTouchDelay={0}
      >
        {inner}
      </TooltipAll>
    </CardPosProvider>
  )
}

export default memo(TableP)
