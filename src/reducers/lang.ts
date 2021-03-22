import produce from 'immer'
import { UPDATE_LANG } from '../constants/ActionTypes'
import { defaultLang } from '../i18n/langs'
import { AvailableLangType } from '../i18n/types'
import { ActionType } from '../types/actionObj'

const lang = produce((draft: AvailableLangType, action: ActionType) => {
  switch (action.type) {
    case UPDATE_LANG: {
      return action.lang
    }
  }
}, defaultLang)

export default lang
