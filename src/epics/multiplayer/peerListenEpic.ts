import {
  PEER_LISTEN,
  ABORT_CONNECTION,
  CONNECTION_LISTEN,
  MULTIPLAYER_STATUS,
  SET_MULTI_GAME_NUMBER,
} from '../../constants/ActionTypes'
import { RootActionType } from '../../types/actionObj'
import { filter, mergeMap, takeUntil } from 'rxjs/operators'
import { concat, merge, EMPTY, fromEvent, of, Observable } from 'rxjs'
import { isOfType } from 'typesafe-actions'
import { ofType, StateObservable } from 'redux-observable'
import { RootStateType } from '../../types/state'
import { peerAll } from '../../webrtc/peer'
import Peer from 'peerjs'
import devLog from '../../utils/devLog'

export default (
  action$: Observable<RootActionType>,
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
        fromEvent<Peer.DataConnection>(peer, 'connection').pipe(
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
          mergeMap(() => {
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
        fromEvent(peer, 'close').pipe(
          mergeMap(() => {
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
        fromEvent(peer, 'error').pipe(
          mergeMap(() => {
            devLog('error emitted by peer', 'error')
            return EMPTY
          }),
        ),
      ).pipe(takeUntil(action$.pipe(ofType(ABORT_CONNECTION))))
    }),
  )
