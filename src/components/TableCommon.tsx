import React from 'react'
import Status from './Status'
import Tower from './Tower'
import Wall from './Wall'
import Bird from './Bird'
import cx from 'classnames'
import { createUseStyles } from 'react-jss'

import { connect } from 'react-redux'
import { StateType } from '../types/state'

import bg from '../../assets/img/bg.jpg'

const useStyles = createUseStyles({
  main: {
    background: {
      image: `url(${bg})`,
      repeat: 'no-repeat',
      size: 'cover',
      position: 'center 30%',
    },
  },
})

type PropType = {
  bricksP: number
  gemsP: number
  recruitsP: number
  brickProdP: number
  gemProdP: number
  recruitProdP: number
  towerP: number
  wallP: number
  bricksO: number
  gemsO: number
  recruitsO: number
  brickProdO: number
  gemProdO: number
  recruitProdO: number
  towerO: number
  wallO: number
}
const TableCommon = ({
  bricksP,
  gemsP,
  recruitsP,
  brickProdP,
  gemProdP,
  recruitProdP,
  towerP,
  wallP,
  bricksO,
  gemsO,
  recruitsO,
  brickProdO,
  gemProdO,
  recruitProdO,
  towerO,
  wallO,
}: PropType) => {
  const classes = useStyles()
  return (
    <div
      className={cx('z-0 h-2/3 flex-auto bg-green-100 relative', classes.main)}
    >
      <Status
        playerName="Tom Chen"
        bricks={bricksP}
        gems={gemsP}
        recruits={recruitsP}
        brickProd={brickProdP}
        gemProd={gemProdP}
        recruitProd={recruitProdP}
      />
      <Tower goal={100} current={towerP} />
      <Wall current={wallP} />

      <Status
        playerName="Computer"
        bricks={bricksO}
        gems={gemsO}
        recruits={recruitsO}
        brickProd={brickProdO}
        gemProd={gemProdO}
        recruitProd={recruitProdO}
        isOpponent={true}
      />
      <Tower isOpponent={true} goal={100} current={towerO} />
      <Wall isOpponent={true} current={wallO} />
      <Bird />
    </div>
  )
}

const mapStateToProps = (state: StateType) => ({
  bricksP: state.status.player.bricks,
  gemsP: state.status.player.gems,
  recruitsP: state.status.player.recruits,
  brickProdP: state.status.player.brickProd,
  gemProdP: state.status.player.gemProd,
  recruitProdP: state.status.player.recruitProd,
  towerP: state.status.player.tower,
  wallP: state.status.player.wall,
  bricksO: state.status.opponent.bricks,
  gemsO: state.status.opponent.gems,
  recruitsO: state.status.opponent.recruits,
  brickProdO: state.status.opponent.brickProd,
  gemProdO: state.status.opponent.gemProd,
  recruitProdO: state.status.opponent.recruitProd,
  towerO: state.status.opponent.tower,
  wallO: state.status.opponent.wall,
})

export default connect(mapStateToProps)(TableCommon)
