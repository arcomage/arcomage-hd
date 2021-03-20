import React from 'react'
import Card from './Card'
import cx from 'classnames'
import { createUseStyles } from 'react-jss'

import { useAppSelector, useAppDispatch } from '../utils/useAppDispatch'
import { StateType, CardListItemAllType, CardTotalType } from '../types/state'
import { DeepReadonly } from '../utils/typeHelpers'

const useStyles = createUseStyles({
  main: { background: { image: 'linear-gradient(#326a4b, #000 2rem)' } },
})

const TableP = () => {
  const cards: DeepReadonly<CardListItemAllType[]> = useAppSelector(
    (state) => state.cards.list,
  )
  const totalObj: DeepReadonly<CardTotalType> = useAppSelector(
    (state) => state.cards.total,
  )

  const classes = useStyles()
  return (
    <div className={cx(classes.main, 'h-1/3 flex-auto')}>
      <Card n={-1} position={-1} totalObj={totalObj} unusable={true} />
      {cards.map((card, i) => {
        if (card === null) {
          return null
        } else {
          return <Card key={i} index={i} totalObj={totalObj} {...card} />
        }
      })}
    </div>
  )
}

export default TableP
