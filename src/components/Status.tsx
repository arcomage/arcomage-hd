import React from 'react'
import Ressource, { calcStatusWidth } from './Ressource'
import useGameSize from '../utils/useGameSize'

type StatusProps = {
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
}: StatusProps) => {
  const size = useGameSize()
  const height = (size.height / 3) * 2

  return (
    <div
      className="p-5 h-full relative z-20"
      style={{
        width: `calc(${calcStatusWidth(height)})`,
        float: isOpponent ? 'right' : 'left',
      }}
    >
      <div className="bg-black bg-opacity-50 mb-4 p-1 shadow-lg">
        <div className="border border-yellow-400 border-opacity-25 text-yellow-400 text-center h-7 leading-7 font-mono">
          {playerName}
        </div>
      </div>

      <Ressource
        type="brick"
        count={bricks}
        prod={brickProd}
      />
      <Ressource
        type="gem"
        count={gems}
        prod={gemProd}
      />
      <Ressource
        type="recruit"
        count={recruits}
        prod={recruitProd}
      />
    </div>
  )
}

export default Status
