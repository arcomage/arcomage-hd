import { AiCardListItemType, AiInstructionType } from '../types/ai'
import { RootStateType } from '../types/state'
import checkCardUseDiscard from './checkCardUseDiscard'
import { aiDecision } from './main'

export const ai = (state: RootStateType): AiInstructionType => {
  const cardList: AiCardListItemType[] = checkCardUseDiscard(state)
  return aiDecision(cardList, state.status, state.settings.win)
}
