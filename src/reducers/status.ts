import produce from 'immer'
import { UPDATE_STATUS, UPDATE_STATUS_MAIN } from '../constants/ActionTypes'
import { StatusType } from '../types/state'
import {
  UpdateStatusActionType,
  UpdateStatusMainActionType,
} from '../types/actionObj'
import { defaultStatus } from '../constants/defaultStatus'

const status = produce(
  (
    draft: StatusType,
    action: UpdateStatusActionType | UpdateStatusMainActionType,
  ) => {
    const { type, isPlayer, statusProp, to } = action
    switch (type) {
      case UPDATE_STATUS:
        break
      case UPDATE_STATUS_MAIN:
        draft[isPlayer ? 'player' : 'opponent'][statusProp] = to
        break
    }
  },
  defaultStatus,
)

export default status
