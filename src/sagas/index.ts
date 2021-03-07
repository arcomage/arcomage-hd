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

import showVisual from './showVisual'

function* changeResource(action: ChangeResourceType) {
}

function* changeProd(action: ChangeProdType) {
}

function* changeTower(action: ChangeTowerType) {
  yield showVisual(action)
}

function* changeWall(action: ChangeWallType) {
  yield showVisual(action)
}

export default function* rootSage() {
  yield takeEvery(CHANGE_RESOURCE, changeResource)
  yield takeEvery(CHANGE_PROD, changeProd)
  yield takeEvery(CHANGE_TOWER, changeTower)
  yield takeEvery(CHANGE_WALL, changeWall)
}
