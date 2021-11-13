import {
  CONNECT_TO_ID,
  SET_OPPONENT_ID,
  MULTIPLAYER_STATUS,
  CONNECTION_LISTEN,
  ABORT_CONNECTION,
} from '../../constants/ActionTypes'
import { RootActionType } from '../../types/actionObj'
import { filter, mergeMap, takeUntil, catchError } from 'rxjs/operators'
import { of, concat, merge, from, EMPTY, Observable } from 'rxjs'
import { isOfType } from 'typesafe-actions'
import { ofType, StateObservable } from 'redux-observable'
import { RootStateType } from '../../types/state'
import { peerAll } from '../../webrtc/peer'
import Peer from 'peerjs'
import { connBaseRetryTime, connRetryTimes } from '../../constants/visuals'
import { receiveSeq, sendSeq } from '../../utils/seq'
import devLog from '../../utils/devLog'

// connect to opponent ID, and set opponent ID in the store

export default (
  action$: Observable<RootActionType>,
  state$: StateObservable<RootStateType>,
) =>
  action$.pipe(
    filter(isOfType(CONNECT_TO_ID)),
    mergeMap((action) => {
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
          mergeMap((_) => {
            sendSeq.reset()
            receiveSeq.reset()
            devLog(
              'host connected to guest; sendSeq & receiveSeq reset',
              'note',
            )
            // host connected to guest
            return concat(
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
            )
          }),
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
