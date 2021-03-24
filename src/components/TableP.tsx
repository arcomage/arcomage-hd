import React, { memo } from 'react'
import Card from './Card'
import cx from 'classnames'
import { createUseStyles } from 'react-jss'

import { useAppSelector } from '../utils/useAppDispatch'
import { CardListItemAllType } from '../types/state'

const useStyles = createUseStyles({
  main: { background: { image: 'linear-gradient(#326a4b, #000 2rem)' } },
})

const TableP = () => {
  const cards: Readonly<CardListItemAllType[]> = useAppSelector(
    (state) => state.cards.list,
  )

  const classes = useStyles()
  return (
    <div className={cx(classes.main, 'h-1/3 flex-auto')}>
      <Card n={-1} position={-1} unusable={true} />
      {cards.map((card, i) => {
        if (card === null) {
          return null
        } else {
          return <Card key={i} index={i} {...card} />
        }
      })}
    </div>
  )
}

export default memo(TableP)
