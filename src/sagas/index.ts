import { put, takeEvery } from 'redux-saga/effects'
import {
  UPDATE_STATUS,
  UPDATE_STATUS_MAIN,
  EXEC_CARD,
} from '../constants/ActionTypes'
import { UpdateStatusActionType } from '../types/actionObj'

import playSound from './playSound'
import execCard from './execCard'

function* updateStatus(action: UpdateStatusActionType) {
  if (!action.noSound) {
    yield playSound(action)
  }
  yield put({
    type: UPDATE_STATUS_MAIN,
    isPlayer: action.isPlayer,
    statusProp: action.statusProp,
    to: action.to,
  })
}

export default function* rootSaga() {
  yield takeEvery(UPDATE_STATUS, updateStatus)
  yield takeEvery(EXEC_CARD, execCard)
}
