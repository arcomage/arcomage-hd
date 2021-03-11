export type DataCardEffectPersonType = {
  bricks: number
  gems: number
  recruits: number
  brickProd: number
  gemProd: number
  recruitProd: number
  tower: number
  wall: number
}

export type DataCardEffectReturnType = {
  playAgain?: boolean
  changeCard?: boolean
  undiscardable?: boolean
} | void

export type DataCardType = {
  // name: string
  // desc: string
  type: 0 | 1 | 2
  cost: number
  count: number
  effect: (
    p: DataCardEffectPersonType,
    o: DataCardEffectPersonType,
  ) => DataCardEffectReturnType
}

export type DataCardsType = DataCardType[]
