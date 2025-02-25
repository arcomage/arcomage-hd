import { StateObservable } from 'redux-observable'
import { of, concat, Observable } from 'rxjs'
import { filter, mergeMap, takeUntil } from 'rxjs/operators'
import { isOfType } from 'typesafe-actions'
import {
  DISCONNECT,
  ABORT_ALL,
  SET_YOUR_ID,
  ABORT_CONNECTION,
  SET_MULTI_GAME_NUMBER,
} from '@/constants/ActionTypes'
import { RootActionType } from '@/types/actionObj'
import { RootStateType } from '@/types/state'
import { nullifyPeer, peerAll } from '@/webrtc/peer'

export default (
  action$: Observable<RootActionType>,
  state$: StateObservable<RootStateType>,
) =>
  action$.pipe(
    filter(isOfType(DISCONNECT)),
    mergeMap((action) => {
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
