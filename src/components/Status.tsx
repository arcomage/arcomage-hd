import React, { useContext } from 'react'
import cx from 'clsx'
import { createUseStyles } from 'react-jss'
import Resource from './Resource'
import { GameSizeContext } from '../utils/contexts/GameSizeContext'
import Name from './Name'
import { calcStatusWidth } from './ResourceFuncs'

const useStyles = createUseStyles<string, { height: number }>({
  main: {
    width: ({ height }) => `calc(${calcStatusWidth(height)})`,
    'min-width': '7.8rem',
  },
})

type PropType = {
  playerName: string
  isOpponent?: boolean
}
const Status = ({ playerName, isOpponent = false }: PropType) => {
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
      <Name playerName={playerName} isOpponent={isOpponent} />
      <Resource type="brick" isOpponent={isOpponent} />
      <Resource type="gem" isOpponent={isOpponent} />
      <Resource type="recruit" isOpponent={isOpponent} />
    </div>
  )
}

export default Status
