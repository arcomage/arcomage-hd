import {
  UPDATE_LANG,
  UPDATE_STATUS,
  UPDATE_STATUS_MAIN,
  EXEC_CARD,
} from '../constants/ActionTypes'
import { PersonStatusType } from '../types/state'

export type LangActionType = { type: typeof UPDATE_LANG; lang: string }

type UpdateStatusActionTypeSingle = {
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

type UpdateStatusMainActionTypeSingle = {
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
  updArr: UpdateStatusActionTypeSingle[]
}

export type UpdateStatusMainActionType = {
  type: typeof UPDATE_STATUS_MAIN
  updArr: UpdateStatusMainActionTypeSingle[]
}

export type ExecCardActionType = {
  type: typeof EXEC_CARD
  n: number
}

export type StatusActionType =
  | UpdateStatusActionType
  | UpdateStatusMainActionType
  | ExecCardActionType

export type ActionType = LangActionType | StatusActionType
