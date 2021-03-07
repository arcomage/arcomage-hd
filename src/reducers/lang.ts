import { CHANGE_LANG } from '../constants/ActionTypes'

const lang = (state = 'en', action: { type: string; lang: string }) => {
  switch (action.type) {
    case CHANGE_LANG:
      return action.lang
    default:
      return state
  }
}

export default lang
