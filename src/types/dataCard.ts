import { PlayerStatusType } from '../types/state'

export type DataCardEffectPersonType = PlayerStatusType

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
