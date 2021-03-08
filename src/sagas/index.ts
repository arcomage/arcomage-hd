import { put, takeEvery, delay } from 'redux-saga/effects'
import {
  CHANGE_RESOURCE,
  CHANGE_PROD,
  CHANGE_TOWER,
  CHANGE_WALL,
} from '../constants/ActionTypes'
import {
  ChangeResourceType,
  ChangeProdType,
  ChangeTowerType,
  ChangeWallType,
} from '../actions'

import playSound from './playSound'
import showVisual from './showVisual'

function* changeResource(action: ChangeResourceType) {
  if (action.sound) {
    yield playSound(action)
  }
}

function* changeProd(action: ChangeProdType) {
  if (action.sound) {
    yield playSound(action)
  }
}

function* changeTower(action: ChangeTowerType) {
  if (action.sound) {
    yield playSound(action)
  }
  yield showVisual(action)
}

function* changeWall(action: ChangeWallType) {
  if (action.sound) {
    yield playSound(action)
  }
  yield showVisual(action)
}

export default function* rootSage() {
  yield takeEvery(CHANGE_RESOURCE, changeResource)
  yield takeEvery(CHANGE_PROD, changeProd)
  yield takeEvery(CHANGE_TOWER, changeTower)
  yield takeEvery(CHANGE_WALL, changeWall)
}
