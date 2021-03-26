import produce from 'immer'
import {
  SCREEN_HELP,
  SCREEN_LANG_PREF,
  SCREEN_PREF,
  SCREEN_VOLUME_PREF,
  SCREEN_YOU_LOSE,
  SCREEN_YOU_WIN,
} from '../constants/ActionTypes'
import { ActionType } from '../types/actionObj'
import { ScreenStateType } from '../types/state'

const defaultScreen: ScreenStateType = {
  pref: false,
  langPref: false,
  volumePref: false,
  youWin: false,
  youLose: false,
  help: false,
}

const screen = produce((draft: ScreenStateType, action: ActionType) => {
  switch (action.type) {
    case SCREEN_PREF: {
      draft.pref = action.show
      break
    }
    case SCREEN_LANG_PREF: {
      draft.langPref = action.show
      break
    }
    case SCREEN_VOLUME_PREF: {
      draft.volumePref = action.show
      break
    }
    case SCREEN_YOU_WIN: {
      draft.youWin = action.show
      break
    }
    case SCREEN_YOU_LOSE: {
      draft.youLose = action.show
      break
    }
    case SCREEN_HELP: {
      draft.help = action.show
      break
    }
  }
}, defaultScreen)

export default screen
