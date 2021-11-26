import React, { memo, useContext } from 'react'
import Status from './Status'
import Tower from './Tower'
import Wall from './Wall'
import Bird from './effects/Bird'
import cx from 'classnames'
import { createUseStyles } from 'react-jss'

import { useAppSelector } from '../utils/useAppDispatch'

import bg from '../../assets/img/bg.webp'
import { GameSizeContext } from '../utils/GameSizeContext'

const useStyles = createUseStyles({
  mainbg: {
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

  const isMultiplayer = useAppSelector((state) => state.multiplayer.on)
  const multiplayerStatus = useAppSelector((state) => state.multiplayer.status)

  const isIdConnected =
    isMultiplayer &&
    (multiplayerStatus === 'connected_by_id' ||
      multiplayerStatus === 'connected_to_id')

  const tempPlayerName = useAppSelector(
    (state) => state.multiplayer.tempPlayerName,
  )
  const tempOpponentName = useAppSelector(
    (state) => state.multiplayer.tempOpponentName,
  )

  const size = useContext(GameSizeContext)

  const classes = useStyles()

  return (
    <div
      className={cx(
        'z-0 flex-auto bg-green-100 relative',
        size.narrowMobile ? 'h-1/2' : 'h-2/3',
      )}
    >
      <div
        className={cx(classes.mainbg, 'w-full h-full bg-cover pixelated')}
      ></div>

      <div className="absolute top-0 left-0 w-full h-full">
        <Status playerName={isIdConnected ? tempPlayerName : playerName} />
        <Tower goal={winTower} />
        <Wall />

        <Status
          playerName={isIdConnected ? tempOpponentName : opponentName}
          isOpponent
        />
        <Tower isOpponent goal={winTower} />
        <Wall isOpponent />
        <Bird />
      </div>
    </div>
  )
}

export default memo(TableCommon)
