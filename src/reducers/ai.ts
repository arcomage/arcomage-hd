import produce from 'immer'
import { UPDATE_AILEVEL_MAIN } from '../constants/ActionTypes'
import { defaultAiLevel } from '../constants/defaultSettings'
import { RootActionType } from '../types/actionObj'
import { AiStateType } from '../types/state'

const defaultVisualState: AiStateType = {
  aiLevel: defaultAiLevel,
}

export default produce((draft: AiStateType, action: RootActionType) => {
  switch (action.type) {
    case UPDATE_AILEVEL_MAIN: {
      draft.aiLevel = action.aiLevel
      break
    }
  }
}, defaultVisualState)
