import React, { memo } from 'react'
import Status from './Status'
import Tower from './Tower'
import Wall from './Wall'
import Bird from './effects/Bird'
import cx from 'classnames'
import { createUseStyles } from 'react-jss'

import { useAppSelector } from '../utils/useAppDispatch'

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

const TableCommon = () => {
  const playerName = useAppSelector((state) => state.settings.playerName)
  const opponentName = useAppSelector((state) => state.settings.opponentName)
  const bricksP = useAppSelector((state) => state.status.player.bricks)
  const gemsP = useAppSelector((state) => state.status.player.gems)
  const recruitsP = useAppSelector((state) => state.status.player.recruits)
  const brickProdP = useAppSelector((state) => state.status.player.brickProd)
  const gemProdP = useAppSelector((state) => state.status.player.gemProd)
  const recruitProdP = useAppSelector(
    (state) => state.status.player.recruitProd,
  )
  const towerP = useAppSelector((state) => state.status.player.tower)
  const wallP = useAppSelector((state) => state.status.player.wall)
  const bricksO = useAppSelector((state) => state.status.opponent.bricks)
  const gemsO = useAppSelector((state) => state.status.opponent.gems)
  const recruitsO = useAppSelector((state) => state.status.opponent.recruits)
  const brickProdO = useAppSelector((state) => state.status.opponent.brickProd)
  const gemProdO = useAppSelector((state) => state.status.opponent.gemProd)
  const recruitProdO = useAppSelector(
    (state) => state.status.opponent.recruitProd,
  )
  const towerO = useAppSelector((state) => state.status.opponent.tower)
  const wallO = useAppSelector((state) => state.status.opponent.wall)

  const classes = useStyles()
  return (
    <div
      className={cx('z-0 h-2/3 flex-auto bg-green-100 relative', classes.main)}
    >
      <Status
        playerName={playerName}
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
        playerName={opponentName}
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

export default memo(TableCommon)
