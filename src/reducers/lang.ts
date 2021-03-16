import { UPDATE_LANG } from '../constants/ActionTypes'
import { ActionType } from '../types/actionObj'

const lang = (state = 'en', action: ActionType) => {
  switch (action.type) {
    case UPDATE_LANG:
      return action.lang
    default:
      return state
  }
}

export default lang
