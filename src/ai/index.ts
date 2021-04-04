import { AiCardListItemType, AiInstructionType } from '../types/ai'
import { RootStateType } from '../types/state'
import checkCardUseDiscard from './checkCardUseDiscard'
import { aiDecision } from './main'

// `null` return value is a 'surrender' instruction
export const ai = (state: RootStateType): AiInstructionType | null => {
  const cardList: AiCardListItemType[] = checkCardUseDiscard(state, 'opponent')
  return aiDecision(cardList, state.status, state.settings.win)
}
