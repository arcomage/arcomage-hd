import produce from 'immer'
import {
  SWITCH_MULTIPLAYER_MODE_MAIN,
  SET_YOUR_ID,
  SET_OPPONENT_ID,
} from '../constants/ActionTypes'
import { RootActionType } from '../types/actionObj'
import { MultiplayerStateType } from '../types/state'

const defaultMultiplayerState: MultiplayerStateType = {
  mode: false,
  yourId: '',
  opponentId: '',
}

const multiplayer = produce(
  (draft: MultiplayerStateType, action: RootActionType) => {
    switch (action.type) {
      case SWITCH_MULTIPLAYER_MODE_MAIN: {
        draft.mode = action.on
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
    }
  },
  defaultMultiplayerState,
)

export default multiplayer
