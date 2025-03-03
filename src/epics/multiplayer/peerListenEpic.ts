import { DataConnection } from 'peerjs'
import { ofType, StateObservable } from 'redux-observable'
import { concat, merge, EMPTY, fromEvent, of, Observable, from } from 'rxjs'
import { mergeMap, takeUntil } from 'rxjs/operators'
import {
  PEER_LISTEN,
  ABORT_CONNECTION,
  CONNECTION_LISTEN,
  MULTIPLAYER_STATUS,
  SET_MULTI_GAME_NUMBER,
} from '@/constants/ActionTypes'
import { RootActionType } from '@/types/actionObj'
import { RootStateType } from '@/types/state'
import devLog from '@/utils/devLog'

export default (
  action$: Observable<RootActionType>,
  _state$: StateObservable<RootStateType>,
) =>
  action$.pipe(
    ofType(PEER_LISTEN),
    mergeMap((_action) => {
      return from(import('@/webrtc/peer')).pipe(
        mergeMap(({ peerAll }) => {
          const { peer } = peerAll
          if (peer === null) {
            return EMPTY
          }
          return merge(
            fromEvent<DataConnection>(peer, 'connection').pipe(
              mergeMap((conn) => {
                peerAll.conn = conn
                return concat(
                  of<RootActionType>({
                    type: CONNECTION_LISTEN,
                    host: false,
                  }),
                )
              }),
            ),
            fromEvent(peer, 'disconnected').pipe(
              mergeMap(() =>
                concat(
                  of<RootActionType>({
                    type: MULTIPLAYER_STATUS,
                    status: 'disconnected',
                  }),
                  of<RootActionType>({
                    type: SET_MULTI_GAME_NUMBER,
                    n: -1,
                  }),
                ),
              ),
            ),
            fromEvent(peer, 'close').pipe(
              mergeMap(() =>
                concat(
                  of<RootActionType>({
                    type: MULTIPLAYER_STATUS,
                    status: 'disconnected',
                  }),
                  of<RootActionType>({
                    type: SET_MULTI_GAME_NUMBER,
                    n: -1,
                  }),
                ),
              ),
            ),
            fromEvent(peer, 'error').pipe(
              mergeMap(() => {
                devLog('error emitted by peer', 'error')
                return EMPTY
              }),
            ),
          ).pipe(takeUntil(action$.pipe(ofType(ABORT_CONNECTION))))
        }),
      )
    }),
  )
