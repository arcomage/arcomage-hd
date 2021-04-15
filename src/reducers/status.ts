import produce from 'immer'
import { INIT_STATUS, UPDATE_STATUS_MAIN } from '../constants/ActionTypes'
import { StatusType } from '../types/state'
import { RootActionType } from '../types/actionObj'
import { defaultStatus } from '../constants/defaultSettings'

const status = produce((draft: StatusType, action: RootActionType) => {
  switch (action.type) {
    case INIT_STATUS: {
      return {
        player: { ...action.payload },
        opponent: { ...action.payload },
      }
    }
    case UPDATE_STATUS_MAIN: {
      for (const upd of action.payload) {
        const { isPlayer, statusProp } = upd
        if ('to' in upd) {
          draft[isPlayer ? 'player' : 'opponent'][statusProp] = upd.to
        } else {
          draft[isPlayer ? 'player' : 'opponent'][statusProp] += upd.diff
        }
      }
      break
    }
  }
}, defaultStatus)

export default status
