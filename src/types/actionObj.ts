import {
  UPDATE_LANG,
  UPDATE_STATUS,
  UPDATE_STATUS_MAIN,
  EXEC_CARD,
  USE_CARD,
  MOVE_CARD_TO_CENTER,
  MOVE_CARD_TO_TOP,
  MOVE_CARD_TO_DECK,
  CLEAR_CARD,
  DELETE_CARD,
  SWITCH_TURN,
  SWITCH_LOCK,
  REMOVE_CARD,
  DISCARD_CARD,
  DISCARD_CARD_MAIN,
  CHANGE_SETTINGS,
  INIT,
  CHANGE_SETTINGS_AND_INIT,
  INIT_CARD,
  INIT_GAME,
  INIT_STATUS,
  DRAW_CARD,
  SWITCH_TURN_MAIN,
  DRAW_CARD_MAIN,
  DRAW_CARD_PRE,
} from '../constants/ActionTypes'
import {
  CardStateType,
  PersonStatusType,
  SettingsStateType,
} from '../types/state'

export type LangActionType = { type: typeof UPDATE_LANG; lang: string }

export type UpdateStatusActionTypeSingle = {
  isPlayer: boolean
  statusProp: keyof PersonStatusType
  noSound?: boolean
} & (
  | {
      to: number
    }
  | {
      diff: number
    }
)

export type UpdateStatusMainActionTypeSingle = {
  increase: boolean
  isPlayer: boolean
  statusProp: keyof PersonStatusType
} & (
  | {
      to: number
    }
  | {
      diff: number
    }
)

export type UpdateStatusActionType = {
  type: typeof UPDATE_STATUS
  payload: UpdateStatusActionTypeSingle[]
}

export type UpdateStatusMainActionType = {
  type: typeof UPDATE_STATUS_MAIN
  payload: UpdateStatusMainActionTypeSingle[]
}

export type ExecCardActionType = {
  type: typeof EXEC_CARD
  n: number
  owner: 'player' | 'opponent'
}

export type UseCardActionType = {
  type: typeof USE_CARD
  n: number
  index: number
  position: number
  owner: 'player' | 'opponent'
}

export type DrawCardActionType = {
  type: typeof DRAW_CARD
  n: number
  position: number
  owner: 'player' | 'opponent'
}

export type DrawCardPreActionType = {
  type: typeof DRAW_CARD_PRE
  n: number
}

export type DrawCardMainActionType = {
  type: typeof DRAW_CARD_MAIN
  position: number
  owner: 'player' | 'opponent'
}

export type MoveCardToCenterActionType = {
  type: typeof MOVE_CARD_TO_CENTER
  index: number
}

export type MoveCardToTopActionType = {
  type: typeof MOVE_CARD_TO_TOP
  index: number
}

export type MoveCardToDeckActionType = {
  type: typeof MOVE_CARD_TO_DECK
  index: number
}

export type ClearCardActionType = {
  type: typeof CLEAR_CARD
}

export type DiscardCardActionType = {
  type: typeof DISCARD_CARD
  index: number
  position: number
  owner: 'player' | 'opponent'
}

export type DiscardCardMainActionType = {
  type: typeof DISCARD_CARD_MAIN
  index: number
}

export type RemoveCardActionType = {
  type: typeof REMOVE_CARD
  index: number
  position: number
  owner: 'player' | 'opponent'
}

export type DeleteCardInDeckActionType = {
  type: typeof DELETE_CARD
  index: number
}

export type SwitchTurnActionType = {
  type: typeof SWITCH_TURN
}

export type SwitchTurnMainActionType = {
  type: typeof SWITCH_TURN_MAIN
}

export type SwitchLockActionType = {
  type: typeof SWITCH_LOCK
}

export type ChangeSettingsActionType = {
  type: typeof CHANGE_SETTINGS
  payload: SettingsStateType
}

export type InitActionType = {
  type: typeof INIT
}

export type InitCardActionType = {
  type: typeof INIT_CARD
  payload: CardStateType
}

export type InitGameActionType = {
  type: typeof INIT_GAME
  playersTurn: boolean
}

export type InitStatusActionType = {
  type: typeof INIT_STATUS
  payload: PersonStatusType
}

export type ChangeSettingsAndInitActionType = {
  type: typeof CHANGE_SETTINGS_AND_INIT
  payload: SettingsStateType
}

export type ActionType =
  | LangActionType
  | UpdateStatusActionType
  | UpdateStatusMainActionType
  | ExecCardActionType
  | UseCardActionType
  | DrawCardActionType
  | DrawCardPreActionType
  | DrawCardMainActionType
  | MoveCardToCenterActionType
  | MoveCardToTopActionType
  | MoveCardToDeckActionType
  | ClearCardActionType
  | DiscardCardActionType
  | DiscardCardMainActionType
  | RemoveCardActionType
  | DeleteCardInDeckActionType
  | SwitchTurnActionType
  | SwitchTurnMainActionType
  | SwitchLockActionType
  | ChangeSettingsActionType
  | InitActionType
  | InitCardActionType
  | InitGameActionType
  | InitStatusActionType
  | ChangeSettingsAndInitActionType
