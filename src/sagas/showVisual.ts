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
} from '../actions'

export default function* showVisual(action: ChangeTowerType | ChangeWallType) {

}
