import React from 'react'
import Card from './Card'
import cx from 'classnames'
import { createUseStyles } from 'react-jss'

import { connect } from 'react-redux'
import { StateType, PersonCardStateType } from '../types/state'

const useStyles = createUseStyles({
  main: { background: { image: 'linear-gradient(#326a4b, #000 2rem)' } },
})

type PropType = { cardsP: PersonCardStateType[]; total: number }

const TableP = ({ cardsP, total }: PropType) => {
  const classes = useStyles()
  return (
    <div className={cx(classes.main, 'h-1/3 flex-auto')}>
      {cardsP.map((card, i) => {
        if (card === null) {
          return null
        } else {
          return <Card key={i} total={total} {...card} />
        }
      })}
      {/* <Card n={45} position={-2} total={total} key={i} />
      <Card n={45} position={-3} total={total} key={i} />
      <Card n={-1} position={-1} total={total} key={i} /> */}
    </div>
  )
}

const mapStateToProps = (state: StateType) => ({
  cardsP: state.cards.player,
  total: state.cards.total,
})

export default connect(mapStateToProps)(TableP)
