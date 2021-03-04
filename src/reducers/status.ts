import produce from 'immer'
import {
  CHANGE_RESOURCE,
  CHANGE_PROD,
  CHANGE_TOWER,
  CHANGE_WALL,
} from '../constants/ActionTypes'
import { StatusType } from '../types/statetype'
import { ChangeStatusActionType } from '../actions'

const defaultStatus: StatusType = {
  player: {
    resources: [12, 15, 4],
    prods: [8, 9, 7],
    tower: 139,
    wall: 12,
    cards: [0, 2, 5, 45, 36, 84],
  },
  opponent: {
    resources: [16, 0, 27],
    prods: [3, 5, 0],
    tower: 23,
    wall: 157,
    cards: [0, 3, 5, 14, 36],
  },
}

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
