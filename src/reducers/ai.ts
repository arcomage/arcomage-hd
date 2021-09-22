import produce from 'immer'
import { UPDATE_AITYPE_MAIN } from '../constants/ActionTypes'
import { defaultAiType } from '../constants/defaultSettings'
import { RootActionType } from '../types/actionObj'
import { AiStateType } from '../types/state'

const defaultVisualState: AiStateType = {
  aiType: defaultAiType,
}

export default produce((draft: AiStateType, action: RootActionType) => {
  switch (action.type) {
    case UPDATE_AITYPE_MAIN: {
      draft.aiType = action.aiType
      break
    }
  }
}, defaultVisualState)
