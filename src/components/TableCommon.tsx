import React from 'react'
import Status from './Status'
import Tower from './Tower'
import Wall from './Wall'
import Bird from './Bird'
import cx from 'classnames'
import { createUseStyles } from 'react-jss'

import { connect, useDispatch } from 'react-redux'
import { changeResource, changeProd, changeTower, changeWall } from '../actions'
import { StateType } from '../types/statetype'

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
  explosionTowerP,
  explosionWallP,
  explosionTowerO,
  explosionWallO,
}: {
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
  explosionTowerP: boolean
  explosionWallP: boolean
  explosionTowerO: boolean
  explosionWallO: boolean
}) => {
  const classes = useStyles()
  const dispatch = useDispatch()
  return (
    <div
      className={cx('z-0 h-2/3 flex-auto bg-green-100 relative', classes.main)}
      onClick={() => {
        dispatch(changeWall(true, false, 10, true, true))
      }}
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
      <Tower goal={100} current={towerP} ongoingExplosion={explosionTowerP} />
      <Wall current={wallP} ongoingExplosion={explosionWallP} />

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
      <Tower
        isOpponent={true}
        goal={100}
        current={towerO}
        ongoingExplosion={explosionTowerO}
      />
      <Wall
        isOpponent={true}
        current={wallO}
        ongoingExplosion={explosionWallO}
      />
      <Bird />
    </div>
  )
}

const mapStateToProps = (state: StateType) => ({
  bricksP: state.status.player.resources[0],
  gemsP: state.status.player.resources[1],
  recruitsP: state.status.player.resources[2],
  brickProdP: state.status.player.prods[0],
  gemProdP: state.status.player.prods[1],
  recruitProdP: state.status.player.prods[2],
  towerP: state.status.player.tower,
  wallP: state.status.player.wall,
  bricksO: state.status.opponent.resources[0],
  gemsO: state.status.opponent.resources[1],
  recruitsO: state.status.opponent.resources[2],
  brickProdO: state.status.opponent.prods[0],
  gemProdO: state.status.opponent.prods[1],
  recruitProdO: state.status.opponent.prods[2],
  towerO: state.status.opponent.tower,
  wallO: state.status.opponent.wall,
  explosionTowerP: state.visual.explosion.player.tower,
  explosionWallP: state.visual.explosion.player.wall,
  explosionTowerO: state.visual.explosion.opponent.tower,
  explosionWallO: state.visual.explosion.opponent.wall,
})

export default connect(mapStateToProps)(TableCommon)
