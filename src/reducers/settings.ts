import produce from 'immer'
import { CHANGE_SETTINGS } from '../constants/ActionTypes'
import { SettingsStateType } from '../types/state'
import { ActionType } from '../types/actionObj'
import { defaultSettings } from '../constants/defaultSettings'

const defaults: SettingsStateType = {
  playerName: '',
  opponentName: '',
  start: { ...defaultSettings.start },
  win: { ...defaultSettings.win },
  cardsInHand: defaultSettings.cardsInHand,
  aiType: defaultSettings.aiType,
}

const game = produce((draft: SettingsStateType, action: ActionType) => {
  switch (action.type) {
    case CHANGE_SETTINGS: {
      break
    }
  }
}, defaults)

export default game
