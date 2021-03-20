import React from 'react'
import cx from 'classnames'
import { createUseStyles } from 'react-jss'
import Resource, { calcStatusWidth } from './Resource'
import { useAppSelector, useAppDispatch } from '../utils/useAppDispatch'
import { StateType } from '../types/state'
import useGameSize from '../utils/useGameSize'

const useStyles = createUseStyles({
  username: {
    'transition-property': 'color, border-color',
    'transition-timing-function': 'ease-in-out',
    'transition-duration': `0.3s`,
  },
})

type PropType = {
  playerName: string
  bricks: number
  gems: number
  recruits: number
  brickProd: number
  gemProd: number
  recruitProd: number
  isOpponent?: boolean
}
const Status = ({
  playerName,
  bricks,
  gems,
  recruits,
  brickProd,
  gemProd,
  recruitProd,
  isOpponent = false,
}: PropType) => {
  const playersTurn = useAppSelector((state) => state.game.playersTurn)

  const size = useGameSize()
  const height = (size.height / 3) * 2

  const classes = useStyles()

  return (
    <div
      className="z-20 p-5 h-full relative"
      style={{
        width: `calc(${calcStatusWidth(height)})`,
        float: isOpponent ? 'right' : 'left',
      }}
    >
      <div className="bg-black bg-opacity-50 mb-4 p-1 shadow-lg">
        <div
          className={cx(
            'border border-yellow-400 text-yellow-400 text-center h-7 leading-7 font-mono',
            { 'border-opacity-25 text-opacity-25': playersTurn === isOpponent },
            classes.username,
          )}
        >
          {playerName}
        </div>
      </div>

      <Resource type="brick" count={bricks} prod={brickProd} />
      <Resource type="gem" count={gems} prod={gemProd} />
      <Resource type="recruit" count={recruits} prod={recruitProd} />
    </div>
  )
}

export default Status
