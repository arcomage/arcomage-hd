import {
  CONNECT_TO_NETWORK,
  SET_YOUR_ID,
  ABORT_ALL,
  MULTIPLAYER_STATUS,
  PEER_LISTEN,
  ABORT_CONNECTION,
} from '../../constants/ActionTypes'
import { RootActionType } from '../../types/actionObj'
import { filter, concatMap, takeUntil, catchError } from 'rxjs/operators'
import { of, concat, from, merge } from 'rxjs'
import { isOfType } from 'typesafe-actions'
import { ActionsObservable, StateObservable } from 'redux-observable'
import { RootStateType } from '../../types/state'
import { initPeer, peer } from '../../webrtc/peer'

// connect to the network, get your ID, and set your ID in the store

export default (
  action$: ActionsObservable<RootActionType>,
  state$: StateObservable<RootStateType>,
) =>
  action$.pipe(
    filter(isOfType(CONNECT_TO_NETWORK)),
    concatMap((action) => {
      const getPeerId: Promise<string> = new Promise((resolve, reject) => {
        initPeer()
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
          concatMap((id) =>
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
          catchError((error) =>
            of<RootActionType>({
              type: MULTIPLAYER_STATUS,
              status: 'failed',
            }),
          ),
        ),
      ).pipe(
        takeUntil(
          merge(action$.ofType(ABORT_CONNECTION), action$.ofType(ABORT_ALL)),
        ),
      )
    }),
  )
