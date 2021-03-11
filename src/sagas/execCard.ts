import { ExecCardActionType } from '../types/actionObj'
import { UPDATE_STATUS } from '../constants/ActionTypes'
import { put, select } from 'redux-saga/effects'

export default function* execCard(action: ExecCardActionType) {
  const { n } = action
  n
  yield put({
    type: UPDATE_STATUS,
    isPlayer: true,
    statusProp: 'recruits',
    to: 1,
  })
}
