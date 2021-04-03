import { PersonStatusType } from '../types/state'

export type DataCardEffectPersonType = PersonStatusType

export type DataCardSpecialType = {
  playagain?: boolean
  drawDiscardPlayagain?: boolean
  undiscardable?: boolean
}

export type DataCardType = {
  // name: string
  // desc: string
  type: 0 | 1 | 2
  cost: number
  prob: number
  special?: DataCardSpecialType
  effect: (p: DataCardEffectPersonType, o: DataCardEffectPersonType) => void
}

export type DataCardsType = DataCardType[]
