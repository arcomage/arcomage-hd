import produce from 'immer'
import { UPDATE_SETTINGS_MAIN } from '../constants/ActionTypes'
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
    case UPDATE_SETTINGS_MAIN: {
      return action.payload
    }
  }
}, defaults)

export default game
