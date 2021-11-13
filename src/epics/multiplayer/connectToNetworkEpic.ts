import {
  CONNECT_TO_NETWORK,
  SET_YOUR_ID,
  MULTIPLAYER_STATUS,
  PEER_LISTEN,
  ABORT_CONNECTION,
} from '../../constants/ActionTypes'
import { RootActionType } from '../../types/actionObj'
import { filter, mergeMap, takeUntil, catchError } from 'rxjs/operators'
import { of, concat, from, merge, Observable } from 'rxjs'
import { isOfType } from 'typesafe-actions'
import { ofType, StateObservable } from 'redux-observable'
import { RootStateType } from '../../types/state'
import { initPeer, peerAll } from '../../webrtc/peer'
import devLog from '../../utils/devLog'

// connect to the network, get your ID, and set your ID in the store

export default (
  action$: Observable<RootActionType>,
  state$: StateObservable<RootStateType>,
) =>
  action$.pipe(
    filter(isOfType(CONNECT_TO_NETWORK)),
    mergeMap((action) => {
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
