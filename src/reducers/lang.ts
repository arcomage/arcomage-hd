import produce from 'immer'
import {
  UPDATE_ERATHIAN_MAIN,
  UPDATE_LANG_MAIN,
} from '../constants/ActionTypes'
import { defaultErathian } from '../constants/defaultSettings'
import { defaultLang } from '../i18n/langs'
import { RootActionType } from '../types/actionObj'
import { LangStateType } from '../types/state'

const defaultLangState: LangStateType = {
  code: defaultLang,
  erathian: defaultErathian,
}

export default produce((draft: LangStateType, action: RootActionType) => {
  switch (action.type) {
    case UPDATE_LANG_MAIN: {
      draft.code = action.lang
      break
    }
    case UPDATE_ERATHIAN_MAIN: {
      draft.erathian = action.erathian
      break
    }
  }
}, defaultLangState)
