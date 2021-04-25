import {
  PLAY_CARD_FROM_QUEUE,
  ABORT_CONNECTION,
  PLAY_CARD_CORE_GUARDED,
} from '../../constants/ActionTypes'
import {
  DiscardCardCoreActionType,
  RootActionType,
  UseCardCoreActionType,
} from '../../types/actionObj'
import {
  filter,
  concatMap,
  takeUntil,
  map,
  withLatestFrom,
} from 'rxjs/operators'
import { isOfType } from 'typesafe-actions'
import { ActionsObservable, StateObservable } from 'redux-observable'
import { RootStateType } from '../../types/state'
import { from } from 'rxjs'
import { playCardQueues } from '../../utils/queues'
import Queue from '../../utils/Queue'

export default (
  action$: ActionsObservable<RootActionType>,
  state$: StateObservable<RootStateType>,
) =>
  action$.pipe(
    filter(isOfType(PLAY_CARD_FROM_QUEUE)),
    withLatestFrom(state$),
    concatMap(([action, state]) => {
      const { gameNumber } = state.multiplayer

      let playCardQueue = playCardQueues.get(gameNumber)
      if (playCardQueue === undefined) {
        playCardQueue = new Queue<
          UseCardCoreActionType | DiscardCardCoreActionType
        >()
        playCardQueues.set(gameNumber, playCardQueue)
      }

      const playCardActionPromise = playCardQueue.dequeueAsync()
      return from(playCardActionPromise).pipe(
        map((playCardAction) => {
          return {
            type: PLAY_CARD_CORE_GUARDED,
            payload: playCardAction,
          }
        }),
        takeUntil(action$.ofType(ABORT_CONNECTION)),
      )
    }),
  )
