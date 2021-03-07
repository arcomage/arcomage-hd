import { put, delay } from 'redux-saga/effects'
import {
  CHANGE_RESOURCE,
  CHANGE_PROD,
  CHANGE_TOWER,
  CHANGE_WALL,
} from '../constants/ActionTypes'
import {
  ChangeTowerType,
  ChangeWallType,
  showExplosion,
  hideExplosion,
} from '../actions'

export default function* showVisual(action: ChangeTowerType | ChangeWallType) {
  if (!action.increase) {
    switch (action.type) {
      case CHANGE_TOWER:
        yield put(showExplosion(action.isPlayer, true))
        yield delay(1000)
        yield put(hideExplosion(action.isPlayer, true))
        break
      case CHANGE_WALL:
        yield put(showExplosion(action.isPlayer, false))
        yield delay(1000)
        yield put(hideExplosion(action.isPlayer, false))
        break
    }
  }
}
