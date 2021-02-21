import React from 'react'
import c from './Status.module.scss'

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
}: StatusProps) => <div></div>

export default Status
