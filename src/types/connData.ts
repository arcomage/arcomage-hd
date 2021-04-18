import {
  SET_TEMP_FORM_FIELDS,
  UPDATE_SETTINGS,
  DRAW_CARD_TO_QUEUE,
  USE_CARD_CORE,
  DISCARD_CARD_CORE,
  INIT_CORE,
} from '../constants/ActionTypes'
import { CHAT, INST } from '../constants/connDataKind'
import {
  SetTempFormFieldsActionType,
  UpdateSettingsActionType,
  DrawCardToQueueActionType,
  UseCardCoreActionType,
  DiscardCardCoreActionType,
  InitCoreActionType,
} from './actionObj'

export type InstructionType =
  | SetTempFormFieldsActionType
  | UpdateSettingsActionType
  | DrawCardToQueueActionType
  | UseCardCoreActionType
  | DiscardCardCoreActionType
  | InitCoreActionType

export const instructionActionTypes = [
  SET_TEMP_FORM_FIELDS,
  UPDATE_SETTINGS,
  DRAW_CARD_TO_QUEUE,
  USE_CARD_CORE,
  DISCARD_CARD_CORE,
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
