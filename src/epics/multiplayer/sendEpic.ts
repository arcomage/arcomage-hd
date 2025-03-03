import { ofType, StateObservable } from 'redux-observable'
import { EMPTY, from, Observable } from 'rxjs'
import { mergeMap, withLatestFrom } from 'rxjs/operators'
import { SEND } from '@/constants/ActionTypes'
import { RootActionType } from '@/types/actionObj'
import { ConnDataType } from '@/types/connData'
import { RootStateType } from '@/types/state'
import devLog from '@/utils/devLog'
import { sendSeq } from '@/utils/multiplayer/seq'

export default (
  action$: Observable<RootActionType>,
  state$: StateObservable<RootStateType>,
) =>
  action$.pipe(
    ofType(SEND),
    withLatestFrom(state$),
    mergeMap(([action, state]) => {
      return from(import('@/webrtc/peer')).pipe(
        mergeMap(({ peerAll }) => {
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
              (chr) =>
                '\\u' + ('0000' + chr.charCodeAt(0).toString(16)).slice(-4),
            )
            conn.send(dataStr)
            devLog(`sent: ${dataStr}`, 'note')
          }
          return EMPTY
        }),
      )
    }),
  )
