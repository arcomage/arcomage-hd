import { ofType, StateObservable } from 'redux-observable'
import { of, concat, from, merge, Observable } from 'rxjs'
import { mergeMap, takeUntil, catchError } from 'rxjs/operators'
import {
  CONNECT_TO_NETWORK,
  SET_YOUR_ID,
  MULTIPLAYER_STATUS,
  PEER_LISTEN,
  ABORT_CONNECTION,
} from '@/constants/ActionTypes'
import { RootActionType } from '@/types/actionObj'
import { RootStateType } from '@/types/state'
import devLog from '@/utils/devLog'
import { initPeer, peerAll } from '@/webrtc/peer'

// connect to the network, get your ID, and set your ID in the store

export default (
  action$: Observable<RootActionType>,
  _state$: StateObservable<RootStateType>,
) =>
  action$.pipe(
    ofType(CONNECT_TO_NETWORK),
    mergeMap((_action) => {
      const getPeerId: Promise<string> = new Promise((resolve, reject) => {
        initPeer()
        const { peer } = peerAll
        if (peer !== null) {
          peer.on('open', (id) => {
            resolve(id)
          })
          peer.on('error', (error: Error) => {
            reject(error)
          })
        }
      })

      return merge(
        of<RootActionType>({
          type: MULTIPLAYER_STATUS,
          status: 'connecting_net',
        }),
        from(getPeerId).pipe(
          mergeMap((id) =>
            concat(
              of<RootActionType>({
                type: MULTIPLAYER_STATUS,
                status: 'connected_net',
              }),
              of<RootActionType>({
                type: SET_YOUR_ID,
                id,
              }),
              of<RootActionType>({
                type: PEER_LISTEN,
              }),
            ),
          ),
          catchError((error) => {
            devLog(`${error}`, 'error')
            return of<RootActionType>({
              type: MULTIPLAYER_STATUS,
              status: 'failed',
            })
          }),
        ),
      ).pipe(takeUntil(action$.pipe(ofType(ABORT_CONNECTION))))
    }),
  )
