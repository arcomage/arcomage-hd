import { ofType, StateObservable } from 'redux-observable'
import { of, concat, Observable, from } from 'rxjs'
import { mergeMap } from 'rxjs/operators'
import {
  DISCONNECT,
  SET_YOUR_ID,
  ABORT_CONNECTION,
  SET_MULTI_GAME_NUMBER,
} from '@/constants/ActionTypes'
import { RootActionType } from '@/types/actionObj'
import { RootStateType } from '@/types/state'

export default (
  action$: Observable<RootActionType>,
  _state$: StateObservable<RootStateType>,
) =>
  action$.pipe(
    ofType(DISCONNECT),
    mergeMap((_action) => {
      return from(import('@/webrtc/peer')).pipe(
        mergeMap(({ nullifyPeer, peerAll }) => {
          const { peer } = peerAll
          if (peer !== null) {
            peer.disconnect()
            peer.destroy()
            nullifyPeer()
          }
          return concat(
            of<RootActionType>({
              type: ABORT_CONNECTION,
            }),
            of<RootActionType>({
              type: SET_YOUR_ID,
              id: '',
            }),
            of<RootActionType>({
              type: SET_MULTI_GAME_NUMBER,
              n: -1,
            }),
          )
        }),
      )
    }),
  )
