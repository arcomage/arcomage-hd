import produce from 'immer'
import {
  SCREEN_END_MAIN,
  SCREEN_HELP,
  SCREEN_LANG_PREF,
  SCREEN_PREF,
  SCREEN_VOLUME_PREF,
} from '../constants/ActionTypes'
import { RootActionType } from '../types/actionObj'
import { ScreenStateType } from '../types/state'

const defaultScreen: ScreenStateType = {
  pref: false,
  langPref: false,
  volumePref: false,
  help: false,
  end: { type: null },
}

const screen = produce((draft: ScreenStateType, action: RootActionType) => {
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
    case SCREEN_HELP: {
      draft.help = action.show
      break
    }
    case SCREEN_END_MAIN: {
      draft.end.type = action.payload.type
      draft.end.surrender = action.payload.surrender
      break
    }
  }
}, defaultScreen)

export default screen
