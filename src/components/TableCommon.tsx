import React, { memo, useContext } from 'react'
import Status from './Status'
import Tower from './Tower'
import Wall from './Wall'
import Bird from './effects/Bird'
import cx from 'classnames'
import { createUseStyles } from 'react-jss'

import { useAppSelector } from '../utils/useAppDispatch'

import bg from '../../assets/img/bg.jpg'
import { GameSizeContext } from '../utils/GameSizeContext'

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
  const winTower = useAppSelector((state) => state.settings.winTower)

  const size = useContext(GameSizeContext)

  const classes = useStyles()
  return (
    <div
      className={cx(
        classes.main,
        'z-0 flex-auto bg-green-100 relative',
        size.narrowMobile ? 'h-1/2' : 'h-2/3',
      )}
    >
      <Status playerName={playerName} />
      <Tower goal={winTower} />
      <Wall />

      <Status playerName={opponentName} isOpponent={true} />
      <Tower isOpponent={true} goal={winTower} />
      <Wall isOpponent={true} />
      <Bird />
    </div>
  )
}

export default memo(TableCommon)
