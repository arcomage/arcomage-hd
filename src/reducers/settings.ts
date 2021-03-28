import produce from 'immer'
import { CHANGE_SETTINGS } from '../constants/ActionTypes'
import { SettingsStateType } from '../types/state'
import { RootActionType } from '../types/actionObj'
import {
  defaultSettings,
  defaultPlayerName,
  defaultOpponentName,
} from '../constants/defaultSettings'

const defaults: SettingsStateType = {
  playerName: defaultPlayerName,
  opponentName: defaultOpponentName,
  start: { ...defaultSettings.start },
  win: { ...defaultSettings.win },
  cardsInHand: defaultSettings.cardsInHand,
  aiType: defaultSettings.aiType,
}

const game = produce((draft: SettingsStateType, action: RootActionType) => {
  switch (action.type) {
    case CHANGE_SETTINGS: {
      return action.payload
    }
  }
}, defaults)

export default game
