import React from 'react'
import { nanoid } from 'nanoid'
import Card from './Card'
import cx from 'classnames'
import { createUseStyles } from 'react-jss'

import { connect, useDispatch } from 'react-redux'
import { changeResource, changeProd, changeTower, changeWall } from '../actions'
import { StateType } from '../types/statetype'

const useStyles = createUseStyles({
  main: { background: { image: 'linear-gradient(#326a4b, #000 2rem)' } },
})

const TableP = ({ cardsP }: { cardsP: number[] }) => {
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
  cardsP: state.status.player.cards,
})

export default connect(mapStateToProps)(TableP)
