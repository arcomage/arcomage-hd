import React, { useContext } from 'react'
import { I18nContext } from '@/i18n/I18nContext'
import cl from '@/utils/clarr'
import { GameSizeContext } from '@/utils/contexts/GameSizeContext'
import { useAppSelector } from '@/utils/hooks/useAppDispatch'
import { tooltipAttrs } from '@/utils/tooltip'
import styles from './Name.module.scss'

type PropType = {
  playerName: string
  isOpponent?: boolean
}
const Name = ({ playerName, isOpponent = false }: PropType) => {
  const _ = useContext(I18nContext)
  const playersTurn = useAppSelector((state) => state.game.playersTurn)

  const size = useContext(GameSizeContext)

  const nameTooltip = `${_.i18n(isOpponent ? "Opponent's Name" : 'Your Name')} = ${playerName}`

  return (
    <div
      className={cl(
        'bg-black bg-opacity-50 p-1 shadow-lg',
        size.narrowMobile ? ' mb-2' : 'mb-4',
      )}
    >
      <div
        className={cl(
          playersTurn === isOpponent && 'border-opacity-25 text-opacity-25',
          styles.username,
          'el-text',
          'emoji',
        )}
        {...tooltipAttrs(nameTooltip, isOpponent ? 'left' : 'right')}
      >
        {playerName}
      </div>
    </div>
  )
}

export default Name
