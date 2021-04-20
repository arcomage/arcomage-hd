import {
  SET_TEMP_SETTINGS,
  SET_TEMP_OPPONENT_NAME,
  UPDATE_SETTINGS,
  DRAW_CARD_TO_QUEUE,
  PLAY_CARD_TO_QUEUE,
  INIT_CORE,
} from '../constants/ActionTypes'
import { CHAT, INST } from '../constants/connDataKind'
import {
  SetTempSettingsActionType,
  SetTempOpponentNameActionType,
  UpdateSettingsActionType,
  DrawCardToQueueActionType,
  PlayCardToQueueActionType,
  InitCoreActionType,
} from './actionObj'

export type InstructionType =
  | SetTempSettingsActionType
  | SetTempOpponentNameActionType
  | UpdateSettingsActionType
  | DrawCardToQueueActionType
  | PlayCardToQueueActionType
  | InitCoreActionType

export const instructionActionTypes = [
  SET_TEMP_SETTINGS,
  SET_TEMP_OPPONENT_NAME,
  UPDATE_SETTINGS,
  DRAW_CARD_TO_QUEUE,
  PLAY_CARD_TO_QUEUE,
  INIT_CORE,
] as const

export type InstructionConnDataType = {
  kind: typeof INST
  data: InstructionType
}

// export type ChatConnDataType = {
//   type: typeof CHAT
//   data: any
// }

export type ConnDataType = InstructionConnDataType & {
  seq: number
}
// | ChatConnDataType
