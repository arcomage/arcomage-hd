import {
  PEER_LISTEN,
  ABORT_CONNECTION,
  CONNECTION_LISTEN,
  MULTIPLAYER_STATUS,
  SET_MULTI_GAME_NUMBER,
} from '../../constants/ActionTypes'
import { RootActionType } from '../../types/actionObj'
import { filter, concatMap, takeUntil, mergeMap } from 'rxjs/operators'
import { concat, merge, EMPTY, fromEvent, of } from 'rxjs'
import { isOfType } from 'typesafe-actions'
import { ActionsObservable, StateObservable } from 'redux-observable'
import { RootStateType } from '../../types/state'
import { peerAll } from '../../webrtc/peer'
import { JQueryStyleEventEmitter } from 'rxjs/internal/observable/fromEvent'
import Peer from 'peerjs'
import devLog from '../../utils/devLog'

export default (
  action$: ActionsObservable<RootActionType>,
  state$: StateObservable<RootStateType>,
) =>
  action$.pipe(
    filter(isOfType(PEER_LISTEN)),
    mergeMap((action) => {
      const { peer } = peerAll
      if (peer === null) {
        return EMPTY
      }
      return merge(
        fromEvent<Peer.DataConnection>(
          (peer as unknown) as JQueryStyleEventEmitter,
          'connection',
        ).pipe(
          concatMap((conn) => {
            peerAll.conn = conn
            return concat(
              of<RootActionType>({
                type: CONNECTION_LISTEN,
                host: false,
              }),
            )
          }),
        ),
        fromEvent(
          (peer as unknown) as JQueryStyleEventEmitter,
          'disconnected',
        ).pipe(
          concatMap(() => {
            return concat(
              of<RootActionType>({
                type: MULTIPLAYER_STATUS,
                status: 'disconnected',
              }),
              of<RootActionType>({
                type: SET_MULTI_GAME_NUMBER,
                n: -1,
              }),
            )
          }),
        ),
        fromEvent((peer as unknown) as JQueryStyleEventEmitter, 'close').pipe(
          concatMap(() => {
            return concat(
              of<RootActionType>({
                type: MULTIPLAYER_STATUS,
                status: 'disconnected',
              }),
              of<RootActionType>({
                type: SET_MULTI_GAME_NUMBER,
                n: -1,
              }),
            )
          }),
        ),
        fromEvent((peer as unknown) as JQueryStyleEventEmitter, 'error').pipe(
          concatMap(() => {
            devLog('error emitted by peer', 'error')
            return EMPTY
          }),
        ),
      ).pipe(takeUntil(action$.ofType(ABORT_CONNECTION)))
    }),
  )
