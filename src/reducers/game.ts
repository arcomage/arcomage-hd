import produce from 'immer'
import { SWITCH_TURN } from '../constants/ActionTypes'
import { GameStateType } from '../types/state'
import { ActionType } from '../types/actionObj'
import { defaultGame } from '../constants/defaultGame'

const game = produce((draft: GameStateType, action: ActionType) => {
  switch (action.type) {
    case SWITCH_TURN: {
      draft.playersTurn = !draft.playersTurn
      break
    }
  }
}, defaultGame)

export default game
