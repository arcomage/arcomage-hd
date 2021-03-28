import produce from 'immer'
import { UPDATE_ERATHIAN, UPDATE_LANG } from '../constants/ActionTypes'
import { defaultLang } from '../i18n/langs'
import { RootActionType } from '../types/actionObj'
import { LangStateType } from '../types/state'

const defaultLangState: LangStateType = {
  code: defaultLang,
  erathian: false,
}

const lang = produce((draft: LangStateType, action: RootActionType) => {
  switch (action.type) {
    case UPDATE_LANG: {
      draft.code = action.lang
      break
    }
    case UPDATE_ERATHIAN: {
      draft.erathian = action.erathian
      break
    }
  }
}, defaultLangState)

export default lang
