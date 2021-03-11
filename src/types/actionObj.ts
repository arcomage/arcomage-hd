import {
  UPDATE_LANG,
  UPDATE_STATUS,
  UPDATE_STATUS_MAIN,
  EXEC_CARD,
} from '../constants/ActionTypes'
import { PlayerStatusType } from '../types/state'

export type UpdateLangActionType = { type: typeof UPDATE_LANG; lang: string }

export type UpdateStatusActionType = {
  type: typeof UPDATE_STATUS
  isPlayer: boolean
  statusProp: keyof PlayerStatusType
  to: number
  noSound?: boolean
}

export type UpdateStatusMainActionType = Omit<
  UpdateStatusActionType,
  'type' | 'noSound'
> & {
  type: typeof UPDATE_STATUS_MAIN
  increase: boolean
}

export type ExecCardActionType = {
  type: typeof EXEC_CARD
  n: number
}
