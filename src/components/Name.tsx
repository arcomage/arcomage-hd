import React, { useContext } from 'react'
import cx from 'clsx'
import { useAppSelector } from '../utils/hooks/useAppDispatch'
import { GameSizeContext } from '../utils/contexts/GameSizeContext'
import { I18nContext } from '../i18n/I18nContext'
import { tooltipAttrs } from '../utils/tooltip'
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
      className={cx(
        'bg-black bg-opacity-50 p-1 shadow-lg',
        size.narrowMobile ? ' mb-2' : 'mb-4',
      )}
    >
      <div
        className={cx(
          'border border-yellow-400 text-yellow-400 text-center h-7 leading-7 overflow-hidden font-mono',
          {
            'border-opacity-25 text-opacity-25': playersTurn === isOpponent,
          },
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
