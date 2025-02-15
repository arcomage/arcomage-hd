import { produce } from 'immer'
import {
  UPDATE_LANG_MAIN,
  UPDATE_BOLDFONT_MAIN,
  UPDATE_ERATHIAN_MAIN,
} from '../constants/ActionTypes'
import { defaultBoldfont, defaultErathian } from '../constants/defaultSettings'
import { defaultLang } from '../i18n/langs'
import { RootActionType } from '../types/actionObj'
import { LangStateType } from '../types/state'

const defaultLangState: LangStateType = {
  code: defaultLang,
  boldfont: defaultBoldfont,
  erathian: defaultErathian,
}

export default produce((draft: LangStateType, action: RootActionType) => {
  switch (action.type) {
    case UPDATE_LANG_MAIN: {
      draft.code = action.lang
      break
    }
    case UPDATE_BOLDFONT_MAIN: {
      draft.boldfont = action.boldfont
      break
    }
    case UPDATE_ERATHIAN_MAIN: {
      draft.erathian = action.erathian
      break
    }
  }
}, defaultLangState)
