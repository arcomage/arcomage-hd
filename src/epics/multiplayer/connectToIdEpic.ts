import {
  CONNECT_TO_ID,
  SET_OPPONENT_ID,
  ABORT_ALL,
  MULTIPLAYER_STATUS,
  CONNECTION_LISTEN,
  ABORT_CONNECTION,
} from '../../constants/ActionTypes'
import { RootActionType } from '../../types/actionObj'
import { filter, concatMap, takeUntil, catchError } from 'rxjs/operators'
import { of, concat, merge, from, EMPTY } from 'rxjs'
import { isOfType } from 'typesafe-actions'
import { ActionsObservable, StateObservable } from 'redux-observable'
import { RootStateType } from '../../types/state'
import { connection, peer } from '../../webrtc/peer'
import Peer from 'peerjs'

// connect to opponent ID, and set opponent ID in the store

export default (
  action$: ActionsObservable<RootActionType>,
  state$: StateObservable<RootStateType>,
) =>
  action$.pipe(
    filter(isOfType(CONNECT_TO_ID)),
    concatMap((action) => {
      if (peer === null) {
        return EMPTY
      }
      const connectToPeerId: Promise<Peer.DataConnection> = new Promise(
        (resolve, reject) => {
          if (peer !== null) {
            let conn = peer.connect(action.id)
            connection.current = conn
            conn.on('open', () => {
              // conn.send('hi!')
              resolve(conn)
            })
            peer.on('error', (error) => {
              reject(error)
            })
          }
        },
      )
      return merge(
        of<RootActionType>({
          type: MULTIPLAYER_STATUS,
          status: 'connecting_to_id',
        }),
        from(connectToPeerId).pipe(
          concatMap((conn) =>
            concat(
              of<RootActionType>({
                type: MULTIPLAYER_STATUS,
                status: 'connected_to_id',
              }),
              of<RootActionType>({
                type: SET_OPPONENT_ID,
                id: action.id,
              }),
              of<RootActionType>({
                type: CONNECTION_LISTEN,
                host: true,
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
