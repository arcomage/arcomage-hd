import {
  SET_TEMP_FORM_FIELDS,
  UPDATE_SETTINGS,
  DRAW_CARD_NO_EFFECT,
  INIT_NO_EFFECT,
} from '../constants/ActionTypes'
import { CHAT, INST } from '../constants/connDataKind'
import {
  SetTempFormFieldsActionType,
  UpdateSettingsActionType,
  DrawCardNoEffectActionType,
  InitNoEffectActionType,
} from './actionObj'

export type InstructionType =
  | SetTempFormFieldsActionType
  | UpdateSettingsActionType
  | DrawCardNoEffectActionType
  | InitNoEffectActionType

export const instructionActionTypes = [
  SET_TEMP_FORM_FIELDS,
  UPDATE_SETTINGS,
  DRAW_CARD_NO_EFFECT,
  INIT_NO_EFFECT,
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
