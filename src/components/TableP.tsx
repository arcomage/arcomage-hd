import React, { memo, useContext } from 'react'
import Card from './Card'
import cx from 'classnames'
import { createUseStyles } from 'react-jss'

import { useAppSelector } from '../utils/useAppDispatch'
import { CardListItemAllType } from '../types/state'
import DiscardModeNotice from './special/DiscardModeNotice'
import { CardPosProvider } from '../utils/CardPosContext'
import { GameSizeContext } from '../utils/GameSizeContext'

const useStyles = createUseStyles({
  main: { background: { image: 'linear-gradient(#326a4b, #000 2rem)' } },
})

const TableP = () => {
  const cards: Readonly<CardListItemAllType[]> = useAppSelector(
    (state) => state.cards.list,
  )
  const cardsInHand = useAppSelector((state) => state.settings.cardsInHand)
  const discardMode = useAppSelector((state) => state.game.discardMode)

  const size = useContext(GameSizeContext)
  const winHeight = size.height
  const winWidth = size.width

  const classes = useStyles()
  return (
    <CardPosProvider
      cardsInHand={cardsInHand}
      winHeight={winHeight}
      winWidth={winWidth}
    >
      <div className={cx(classes.main, 'h-1/3 flex-auto')}>
        <Card n={-1} position={-1} unusable={true} />
        {cards.map((card, i) => {
          if (card === null) {
            return null
          } else {
            return <Card key={i} index={i} {...card} />
          }
        })}
        <DiscardModeNotice shown={discardMode} />
      </div>
    </CardPosProvider>
  )
}

export default memo(TableP)
