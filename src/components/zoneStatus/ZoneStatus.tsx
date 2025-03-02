import React, { useContext } from 'react'
import cl from '@/utils/clarr'
import { GameSizeContext } from '@/utils/contexts/GameSizeContext'
import { useAppSelector } from '@/utils/hooks/useAppDispatch'
import Birds from '../effects/Birds'
import Tower from '../towerWall/Tower'
import Wall from '../towerWall/Wall'
import Status from './Status'
import styles from './ZoneStatus.module.scss'

/**
 * Upper Zone for Status, Tower, Wall, Birds
 */
const ZoneStatus = () => {
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

  return (
    <div className={cl(styles.main, size.narrowMobile ? 'h-1/2' : 'h-2/3')}>
      <div className={cl(styles.mainbg, 'pixelated')}></div>

      <div className={styles.side}>
        <Status playerName={isIdConnected ? tempPlayerName : playerName} />
        <Tower goal={winTower} />
        <Wall />

        <Status
          playerName={isIdConnected ? tempOpponentName : opponentName}
          isOpponent
        />
        <Tower isOpponent goal={winTower} />
        <Wall isOpponent />
        <Birds />
      </div>
    </div>
  )
}

export default ZoneStatus
