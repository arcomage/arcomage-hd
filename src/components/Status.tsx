import React from 'react'

type StatusProps = {
  playerName: string
  bricks: number
  gems: number
  recruits: number
  brickProd: number
  gemProd: number
  recruitProd: number
}
const Status = ({
  playerName,
  bricks,
  gems,
  recruits,
  brickProd,
  gemProd,
  recruitProd,
}: StatusProps) => <div>{playerName}</div>

export default Status
