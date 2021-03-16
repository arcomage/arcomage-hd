import React from 'react'
import Card from './Card'
import cx from 'classnames'
import { createUseStyles } from 'react-jss'

import { connect } from 'react-redux'
import { StateType, CardListItemAllType } from '../types/state'

const useStyles = createUseStyles({
  main: { background: { image: 'linear-gradient(#326a4b, #000 2rem)' } },
})

type PropType = { cards: CardListItemAllType[]; total: number }

const TableP = ({ cards, total }: PropType) => {
  const classes = useStyles()
  return (
    <div className={cx(classes.main, 'h-1/3 flex-auto')}>
      <Card n={-1} position={-1} total={total} />
      {cards.map((card, i) => {
        if (card === null) {
          return null
        } else {
          return <Card key={i} index={i} total={total} {...card} />
        }
      })}
    </div>
  )
}

const mapStateToProps = (state: StateType) => ({
  cards: state.cards.list,
  total: state.cards.total,
})

export default connect(mapStateToProps)(TableP)
