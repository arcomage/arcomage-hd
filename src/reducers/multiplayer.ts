import produce from 'immer'
import {
  SWITCH_MULTIPLAYER_MODE_MAIN,
  SET_YOUR_ID,
  SET_OPPONENT_ID,
  MULTIPLAYER_STATUS,
  SET_TEMP_FORM_FIELDS,
  SWITCH_MULTI_GAME_STARTED,
} from '../constants/ActionTypes'
import { defaultSettings } from '../constants/defaultSettings'
import { RootActionType } from '../types/actionObj'
import { FormFieldsAllPartialType } from '../types/formFields'
import { MultiplayerStateType } from '../types/state'

const tempFormFieldsDefault: FormFieldsAllPartialType = {
  opponentName: '',
  ...defaultSettings,
  cardsInHand: defaultSettings.cardsInHand,
}

const defaultMultiplayerState: MultiplayerStateType = {
  on: false,
  yourId: '',
  opponentId: '',
  status: 'disconnected',
  tempFormFields: tempFormFieldsDefault, // guest uses opponentName & all nums; host uses opponentName
  gameStarted: false,
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
      case SWITCH_MULTI_GAME_STARTED: {
        draft.gameStarted = action.on
        break
      }
      case SET_TEMP_FORM_FIELDS: {
        if (action.payload !== null) {
          draft.tempFormFields = {
            ...draft.tempFormFields,
            ...action.payload,
          }
        }
        break
      }
    }
  },
  defaultMultiplayerState,
)
