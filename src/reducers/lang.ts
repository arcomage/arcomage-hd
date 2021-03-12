import { UPDATE_LANG } from '../constants/ActionTypes'
import { LangActionType } from '../types/actionObj'

const lang = (state = 'en', action: LangActionType) => {
  switch (action.type) {
    case UPDATE_LANG:
      return action.lang
    default:
      return state
  }
}

export default lang
