import React from 'react'
import { nanoid } from 'nanoid'
import Card from './Card'
import cx from 'classnames'
import { createUseStyles } from 'react-jss'

import { connect } from 'react-redux'
import { StateType } from '../types/state'

const useStyles = createUseStyles({
  main: { background: { image: 'linear-gradient(#326a4b, #000 2rem)' } },
})

type PropType = { cardsP: number[] }

const TableP = ({ cardsP }: PropType) => {
  const classes = useStyles()
  return (
    <div className={cx(classes.main, 'h-1/3 flex-auto')}>
      {cardsP.map((card, i) => (
        <Card n={card} position={i} total={cardsP.length} key={nanoid()} />
      ))}
    </div>
  )
}

const mapStateToProps = (state: StateType) => ({
  cardsP: state.cards.player,
})

export default connect(mapStateToProps)(TableP)
