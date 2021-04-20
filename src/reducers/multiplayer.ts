import produce from 'immer'
import {
  SWITCH_MULTIPLAYER_MODE_MAIN,
  SET_YOUR_ID,
  SET_OPPONENT_ID,
  MULTIPLAYER_STATUS,
  SET_TEMP_SETTINGS,
  SET_MULTI_GAME_NUMBER,
} from '../constants/ActionTypes'
import { defaultSettings } from '../constants/defaultSettings'
import { RootActionType } from '../types/actionObj'
import { MultiplayerStateType, SettingsType } from '../types/state'

const tempSettingsDefault: SettingsType = {
  ...defaultSettings,
}

const defaultMultiplayerState: MultiplayerStateType = {
  on: false,
  yourId: '',
  opponentId: '',
  status: 'disconnected',
  tempSettings: tempSettingsDefault,
  tempPlayerName: '',
  tempOpponentName: '',
  gameNumber: -1,
}

export default produce(
  (draft: MultiplayerStateType, action: RootActionType) => {
    switch (action.type) {
      case SWITCH_MULTIPLAYER_MODE_MAIN: {
        draft.on = action.on
        break
      }
      case SET_YOUR_ID: {
        draft.yourId = action.id
        break
      }
      case SET_OPPONENT_ID: {
        draft.opponentId = action.id
        break
      }
      case MULTIPLAYER_STATUS: {
        draft.status = action.status
        break
      }
      case SET_MULTI_GAME_NUMBER: {
        draft.gameNumber = action.n
        break
      }
      case SET_TEMP_SETTINGS: {
        if (action.payload !== null) {
          draft.tempSettings = action.payload
        }
        break
      }
    }
  },
  defaultMultiplayerState,
)
