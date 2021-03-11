export type PlayerStatusType = {
  bricks: number
  gems: number
  recruits: number
  brickProd: number
  gemProd: number
  recruitProd: number
  tower: number
  wall: number
}

export type StatusType = {
  player: PlayerStatusType
  opponent: PlayerStatusType
}

export type CardStateType = {
  player: number[]
  opponent: number[]
}

export type StateType = {
  lang: string
  status: StatusType
  cards: CardStateType
}
