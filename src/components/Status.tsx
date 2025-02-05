import React, { memo, useContext } from 'react'
import cx from 'clsx'
import { createUseStyles } from 'react-jss'
import Resource, { calcStatusWidth } from './Resource'
import { useAppSelector } from '../utils/hooks/useAppDispatch'
import { GameSizeContext } from '../utils/contexts/GameSizeContext'
import { I18nContext } from '../i18n/I18nContext'
import TooltipAll from './special/TooltipAll'

const useStyles = createUseStyles<string, { height: number }>({
  main: {
    width: ({ height }) => `calc(${calcStatusWidth(height)})`,
    'min-width': '7.8rem',
  },
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
const Status = ({ playerName, isOpponent = false }: PropType) => {
  const _ = useContext(I18nContext)
  const playersTurn = useAppSelector((state) => state.game.playersTurn)

  const size = useContext(GameSizeContext)
  const height = (size.height / 3) * 2

  const classes = useStyles({ height })

  return (
    <div
      className={cx(
        classes.main,
        'z-20 p-5 h-full relative',
        isOpponent ? 'float-right' : 'float-left',
      )}
    >
      <div className="bg-black bg-opacity-50 mb-4 p-1 shadow-lg">
        <TooltipAll
          title={`${_.i18n(isOpponent ? "Opponent's Name" : 'Your Name')} = ${playerName}`}
          placement={isOpponent ? 'left' : 'right'}
        >
          <div
            className={cx(
              'border border-yellow-400 text-yellow-400 text-center h-7 leading-7 font-mono',
              {
                'border-opacity-25 text-opacity-25': playersTurn === isOpponent,
              },
              classes.username,
              'el-text',
              'emoji',
            )}
          >
            {playerName}
          </div>
        </TooltipAll>
      </div>

      <Resource type="brick" isOpponent={isOpponent} />
      <Resource type="gem" isOpponent={isOpponent} />
      <Resource type="recruit" isOpponent={isOpponent} />
    </div>
  )
}

export default memo(Status)
