import {
  SET_TEMP_SETTINGS,
  SET_TEMP_OPPONENT_NAME,
  UPDATE_SETTINGS,
  DRAW_CARD_TO_QUEUE,
  PLAY_CARD_TO_QUEUE,
  INIT_CORE,
  ABORT_ALL,
} from '../constants/ActionTypes'
import { CHAT, INST } from '../constants/connDataKind'
import {
  SetTempSettingsActionType,
  SetTempOpponentNameActionType,
  UpdateSettingsActionType,
  DrawCardToQueueActionType,
  PlayCardToQueueActionType,
  InitCoreActionType,
  AbortAllActionType,
} from './actionObj'

export type InstructionType =
  | SetTempSettingsActionType
  | SetTempOpponentNameActionType
  | UpdateSettingsActionType
  | DrawCardToQueueActionType
  | PlayCardToQueueActionType
  | InitCoreActionType
  | AbortAllActionType

export const instructionActionTypes = [
  SET_TEMP_SETTINGS,
  SET_TEMP_OPPONENT_NAME,
  UPDATE_SETTINGS,
  DRAW_CARD_TO_QUEUE,
  PLAY_CARD_TO_QUEUE,
  INIT_CORE,
  ABORT_ALL,
] as const

export const verifyGameNumberInstActionTypes = [
  DRAW_CARD_TO_QUEUE,
  PLAY_CARD_TO_QUEUE,
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
  gameNumber: number
}
// | ChatConnDataType
