import { SEND } from '../../constants/ActionTypes'
import { RootActionType } from '../../types/actionObj'
import { filter, concatMap } from 'rxjs/operators'
import { EMPTY } from 'rxjs'
import { isOfType } from 'typesafe-actions'
import { ActionsObservable, StateObservable } from 'redux-observable'
import { RootStateType } from '../../types/state'
import { peerAll } from '../../webrtc/peer'
import { ConnDataType } from '../../types/connData'

export default (
  action$: ActionsObservable<RootActionType>,
  state$: StateObservable<RootStateType>,
) =>
  action$.pipe(
    filter(isOfType(SEND)),
    concatMap((action) => {
      const { kind, data } = action
      const sentData: ConnDataType = {
        kind,
        data,
      }
      const { conn } = peerAll
      if (conn !== null) {
        const dataStr = JSON.stringify(sentData).replace(
          /[\u007F-\uFFFF]/g,
          (chr) => '\\u' + ('0000' + chr.charCodeAt(0).toString(16)).substr(-4),
        )
        conn.send(dataStr)
        console.log(`sent: ${dataStr}`)
      }
      return EMPTY
    }),
  )
