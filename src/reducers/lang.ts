import { UPDATE_LANG } from '../constants/ActionTypes'
import { UpdateLangActionType } from '../types/actionObj'

const lang = (state = 'en', action: UpdateLangActionType) => {
  switch (action.type) {
    case UPDATE_LANG:
      return action.lang
    default:
      return state
  }
}

export default lang
