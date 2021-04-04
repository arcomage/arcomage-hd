import produce from 'immer'
import {
  INIT_GAME,
  SWITCH_DISCARD_MODE,
  SWITCH_LOCK,
  SWITCH_NEW_TURN,
  SWITCH_TURN,
} from '../constants/ActionTypes'
import { GameStateType } from '../types/state'
import { RootActionType } from '../types/actionObj'

const defaultGame: GameStateType = {
  playersTurn: true,
  locked: false,
  discardMode: false,
  isNewTurn: true,
}

const game = produce((draft: GameStateType, action: RootActionType) => {
  switch (action.type) {
    case INIT_GAME: {
      return {
        ...defaultGame,
        playersTurn: action.playersTurn,
      }
    }
    case SWITCH_DISCARD_MODE: {
      draft.discardMode = action.on
      break
    }
    case SWITCH_TURN: {
      draft.playersTurn = !draft.playersTurn
      break
    }
    case SWITCH_LOCK: {
      draft.locked = action.on
      break
    }
    case SWITCH_NEW_TURN: {
      draft.isNewTurn = action.on
      break
    }
  }
}, defaultGame)

export default game
