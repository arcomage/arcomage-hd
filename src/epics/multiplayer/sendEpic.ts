import { StateObservable } from 'redux-observable'
import { EMPTY, Observable } from 'rxjs'
import { filter, mergeMap, withLatestFrom } from 'rxjs/operators'
import { isOfType } from 'typesafe-actions'
import { SEND } from '@/constants/ActionTypes'
import { RootActionType } from '@/types/actionObj'
import { ConnDataType } from '@/types/connData'
import { RootStateType } from '@/types/state'
import devLog from '@/utils/devLog'
import { sendSeq } from '@/utils/multiplayer/seq'
import { peerAll } from '@/webrtc/peer'

export default (
  action$: Observable<RootActionType>,
  state$: StateObservable<RootStateType>,
) =>
  action$.pipe(
    filter(isOfType(SEND)),
    withLatestFrom(state$),
    mergeMap(([action, state]) => {
      const { gameNumber } = state.multiplayer
      const { kind, data } = action
      const { conn } = peerAll
      if (conn !== null) {
        sendSeq.add()
        const sentData: ConnDataType = {
          kind,
          data,
          seq: sendSeq.v,
          gameNumber,
        }
        const dataStr = JSON.stringify(sentData).replace(
          /[\u007F-\uFFFF]/g,
          (chr) => '\\u' + ('0000' + chr.charCodeAt(0).toString(16)).substr(-4),
        )
        conn.send(dataStr)
        devLog(`sent: ${dataStr}`, 'note')
      }
      return EMPTY
    }),
  )
