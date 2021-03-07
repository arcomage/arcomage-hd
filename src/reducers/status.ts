import produce from 'immer'
import {
  CHANGE_RESOURCE,
  CHANGE_PROD,
  CHANGE_TOWER,
  CHANGE_WALL,
} from '../constants/ActionTypes'
import { StatusType } from '../types/statetype'
import { ChangeStatusActionType } from '../actions'
import { defaultStatus } from '../constants/defaultStatus'

const status = produce((draft: StatusType, action: ChangeStatusActionType) => {
  switch (action.type) {
    case CHANGE_RESOURCE:
      draft[action.isPlayer ? 'player' : 'opponent'].resources[
        action.resourceType
      ] += action.amount * (action.increase ? 1 : -1)
      break
    case CHANGE_PROD:
      draft[action.isPlayer ? 'player' : 'opponent'].prods[
        action.resourceType
      ] += action.amount * (action.increase ? 1 : -1)
      break
    case CHANGE_TOWER:
      draft[action.isPlayer ? 'player' : 'opponent'].tower +=
        action.amount * (action.increase ? 1 : -1)
      break
    case CHANGE_WALL:
      draft[action.isPlayer ? 'player' : 'opponent'].wall +=
        action.amount * (action.increase ? 1 : -1)
      break
  }
}, defaultStatus)

export default status
