import produce from 'immer'
import { UPDATE_LANG } from '../constants/ActionTypes'
import { ActionType } from '../types/actionObj'

const lang = produce((draft: 'en' | 'nl' | 'fr', action: ActionType) => {
  switch (action.type) {
    case UPDATE_LANG: {
      return action.lang
    }
  }
}, 'en')

export default lang
