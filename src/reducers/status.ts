import produce from 'immer'
import {
  UPDATE_STATUS_MAIN,
} from '../constants/ActionTypes'
import { StatusType } from '../types/state'
import { StatusActionType } from '../types/actionObj'
import { defaultStatus } from '../constants/defaultStatus'

const status = produce((draft: StatusType, action: StatusActionType) => {
  switch (action.type) {
    case UPDATE_STATUS_MAIN:
      for (const upd of action.updArr) {
        const { isPlayer, statusProp } = upd
        if ('to' in upd) {
          draft[isPlayer ? 'player' : 'opponent'][statusProp] = upd.to
        } else {
          draft[isPlayer ? 'player' : 'opponent'][statusProp] += upd.diff
        }
      }
      break
  }
}, defaultStatus)

export default status
