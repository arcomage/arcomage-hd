import {
  SET_TEMP_SETTINGS,
  SET_TEMP_OPPONENT_NAME,
  UPDATE_SETTINGS,
  DRAW_CARD_TO_QUEUE,
  PLAY_CARD_TO_QUEUE,
  INIT_CORE,
  INIT_TO_QUEUE,
} from '../constants/ActionTypes'
import { CHAT, INST } from '../constants/connDataKind'
import { isInArray } from '../utils/typeHelpers'
import {
  SetTempSettingsActionType,
  SetTempOpponentNameActionType,
  UpdateSettingsActionType,
  DrawCardToQueueActionType,
  PlayCardToQueueActionType,
  InitCoreActionType,
  InitToQueueActionType,
} from './actionObj'

export type InstructionType =
  | SetTempSettingsActionType
  | SetTempOpponentNameActionType
  | UpdateSettingsActionType
  | DrawCardToQueueActionType
  | PlayCardToQueueActionType
  | InitCoreActionType
  | InitToQueueActionType

export type VerifyGameNumberInstType =
  | DrawCardToQueueActionType
  | PlayCardToQueueActionType
  | InitToQueueActionType

export const instructionActionTypes = [
  SET_TEMP_SETTINGS,
  SET_TEMP_OPPONENT_NAME,
  UPDATE_SETTINGS,
  DRAW_CARD_TO_QUEUE,
  PLAY_CARD_TO_QUEUE,
  INIT_TO_QUEUE,
  INIT_CORE,
] as const

export const verifyGameNumberInstActionTypes = [
  DRAW_CARD_TO_QUEUE,
  PLAY_CARD_TO_QUEUE,
  INIT_TO_QUEUE,
] as const

export const isVerifyGameNumberInst = (
  inst: InstructionType,
): inst is VerifyGameNumberInstType =>
  isInArray(inst.type, verifyGameNumberInstActionTypes)

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
