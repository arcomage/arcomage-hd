import {
  SET_TEMP_FORM_FIELDS,
  UPDATE_SETTINGS,
  DRAW_CARD_CORE,
  INIT_CORE,
} from '../constants/ActionTypes'
import { CHAT, INST } from '../constants/connDataKind'
import {
  SetTempFormFieldsActionType,
  UpdateSettingsActionType,
  DrawCardCoreActionType,
  InitCoreActionType,
} from './actionObj'

export type InstructionType =
  | SetTempFormFieldsActionType
  | UpdateSettingsActionType
  | DrawCardCoreActionType
  | InitCoreActionType

export const instructionActionTypes = [
  SET_TEMP_FORM_FIELDS,
  UPDATE_SETTINGS,
  DRAW_CARD_CORE,
  INIT_CORE,
  // USE_CARD_CORE,
  // DISCARD_CARD_CORE,
] as const

export type InstructionConnDataType = {
  kind: typeof INST
  data: InstructionType
}

// export type ChatConnDataType = {
//   type: typeof CHAT
//   data: any
// }

export type ConnDataType = InstructionConnDataType
//  | ChatConnDataType
