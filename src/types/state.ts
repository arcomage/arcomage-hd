export type PersonStatusType = {
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
  player: PersonStatusType
  opponent: PersonStatusType
}

export type PersonCardStateExistedType = {
  position: number
  n: number
  unusable: boolean
  discarded: boolean
  isflipped: boolean
}

export type PersonCardStateType = PersonCardStateExistedType | null

export type CardStateType = {
  total: number
  player: PersonCardStateType[]
  opponent: PersonCardStateType[]
}

export type StateType = {
  lang: string
  status: StatusType
  cards: CardStateType
}
