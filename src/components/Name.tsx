import React, { useContext } from 'react'
import cx from 'clsx'
import { createUseStyles } from 'react-jss'
import { useAppSelector } from '../utils/hooks/useAppDispatch'
import { GameSizeContext } from '../utils/contexts/GameSizeContext'
import { I18nContext } from '../i18n/I18nContext'
import { tooltipAttrs } from '../utils/tooltip'

const useStyles = createUseStyles<string, { height: number }>({
  username: {
    'transition-property': 'color, border-color',
    'transition-timing-function': 'ease-in-out',
    'transition-duration': `0.3s`,
  },
})

type PropType = {
  playerName: string
  isOpponent?: boolean
}
const Name = ({ playerName, isOpponent = false }: PropType) => {
  const _ = useContext(I18nContext)
  const playersTurn = useAppSelector((state) => state.game.playersTurn)

  const size = useContext(GameSizeContext)
  const height = (size.height / 3) * 2

  const nameTooltip = `${_.i18n(isOpponent ? "Opponent's Name" : 'Your Name')} = ${playerName}`

  const classes = useStyles({ height })

  return (
    <div className="bg-black bg-opacity-50 mb-4 p-1 shadow-lg">
      <div
        className={cx(
          'border border-yellow-400 text-yellow-400 text-center h-7 leading-7 overflow-hidden font-mono',
          {
            'border-opacity-25 text-opacity-25': playersTurn === isOpponent,
          },
          classes.username,
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
