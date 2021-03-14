import { PersonStatusType } from '../types/state'

export type DataCardEffectPersonType = PersonStatusType

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
