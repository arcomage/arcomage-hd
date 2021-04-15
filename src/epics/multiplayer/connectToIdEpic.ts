import {
  CONNECT_TO_ID,
  SET_OPPONENT_ID,
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
import { peerAll } from '../../webrtc/peer'
import Peer from 'peerjs'
import { connBaseRetryTime, connRetryTimes } from '../../constants/visuals'

// connect to opponent ID, and set opponent ID in the store

export default (
  action$: ActionsObservable<RootActionType>,
  state$: StateObservable<RootStateType>,
) =>
  action$.pipe(
    filter(isOfType(CONNECT_TO_ID)),
    concatMap((action) => {
      const { peer } = peerAll
      if (peer === null) {
        return EMPTY
      }
      const connectToPeerId: Promise<null> = new Promise((resolve, reject) => {
        if (peer !== null) {
          let conn: Peer.DataConnection | null = null
          let timer: NodeJS.Timeout | null = null
          let tryTimes = 0
          const loop = () => {
            if (tryTimes > connRetryTimes) {
              if (conn !== null) {
                conn.close()
              }
              reject(false)
            }
            tryTimes += 1
            if (conn === null || (conn !== null && !conn.open)) {
              if (conn !== null) {
                conn.close()
              }
              conn = peer.connect(action.id)
              peerAll.conn = conn
            }
            timer = setTimeout(loop, connBaseRetryTime * tryTimes)
            conn.on('open', () => {
              // conn.send('hi!')
              if (timer !== null) {
                clearTimeout(timer)
              }
              resolve(null)
            })
          }
          loop()
          peer.on('error', (error) => {
            if (conn !== null) {
              conn.close()
            }
            reject(error)
          })
        }
      })
      return merge(
        of<RootActionType>({
          type: MULTIPLAYER_STATUS,
          status: 'connecting_to_id',
        }),
        from(connectToPeerId).pipe(
          concatMap((_) =>
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
      ).pipe(takeUntil(action$.ofType(ABORT_CONNECTION)))
    }),
  )
