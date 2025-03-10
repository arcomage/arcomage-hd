import cl from 'clarr'
import React, { useContext } from 'react'
import { GameSizeContext } from '@/utils/contexts/GameSizeContext'
import Name from './Name'
import Resource from './Resource'
import { calcStatusWidth } from './ResourceFuncs'
import styles from './Status.module.scss'

type PropType = {
  playerName: string
  isOpponent?: boolean
}
const Status = ({ playerName, isOpponent = false }: PropType) => {
  const size = useContext(GameSizeContext)
  const height = (size.height / 3) * 2

  return (
    <div
      className={cl(styles.main, isOpponent ? 'float-right' : 'float-left')}
      style={{
        width: `calc(${calcStatusWidth(height)})`,
      }}
    >
      <Name playerName={playerName} isOpponent={isOpponent} />
      <Resource type="brick" isOpponent={isOpponent} />
      <Resource type="gem" isOpponent={isOpponent} />
      <Resource type="recruit" isOpponent={isOpponent} />
    </div>
  )
}

export default Status
