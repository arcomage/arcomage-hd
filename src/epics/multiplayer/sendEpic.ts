import { SEND } from '../../constants/ActionTypes'
import { RootActionType } from '../../types/actionObj'
import { filter, concatMap } from 'rxjs/operators'
import { EMPTY } from 'rxjs'
import { isOfType } from 'typesafe-actions'
import { ActionsObservable, StateObservable } from 'redux-observable'
import { RootStateType } from '../../types/state'
import { connection } from '../../webrtc/peer'

export default (
  action$: ActionsObservable<RootActionType>,
  state$: StateObservable<RootStateType>,
) =>
  action$.pipe(
    filter(isOfType(SEND)),
    concatMap((action) => {
      const { data } = action
      const obj = {
        data,
        time: Date.now(),
      }
      const conn = connection.current
      if (conn !== null) {
        conn.send(JSON.stringify(obj))
      }
      return EMPTY
    }),
  )
