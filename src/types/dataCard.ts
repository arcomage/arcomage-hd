import { PersonStatusType } from '../types/state'

export type DataCardEffectPersonType = PersonStatusType

export type DataCardSpecialType = {
  playAgain?: boolean
  changeCard?: boolean
  undiscardable?: boolean
}

export type DataCardType = {
  // name: string
  // desc: string
  type: 0 | 1 | 2
  cost: number
  count: number
  special?: DataCardSpecialType
  effect: (p: DataCardEffectPersonType, o: DataCardEffectPersonType) => void
}

export type DataCardsType = DataCardType[]

export type DataCardI18nType = {
  name: string
  desc: string
}

export type DataCardsI18nType = DataCardI18nType[]
