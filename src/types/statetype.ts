export type PlayerStatusType = {
  resources: [number, number, number] // bricks, gems, recruits
  prods: [number, number, number] // productions of: brick, gem, recruit
  tower: number
  wall: number
  cards: number[]
}

export type StatusType = {
  player: PlayerStatusType
  opponent: PlayerStatusType
}

export type StateType = {
  status: StatusType
  lang: string
}
