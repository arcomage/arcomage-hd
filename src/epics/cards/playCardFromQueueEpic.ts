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
  withLatestFrom,
  delay,
  mergeMap,
} from 'rxjs/operators'
import { isOfType } from 'typesafe-actions'
import { ActionsObservable, StateObservable } from 'redux-observable'
import { RootStateType } from '../../types/state'
import { EMPTY, from, of } from 'rxjs'
import { playCardQueues } from '../../utils/queues'
import Queue from '../../utils/Queue'
import devLog from '../../utils/devLog'

export default (
  action$: ActionsObservable<RootActionType>,
  state$: StateObservable<RootStateType>,
) =>
  action$.pipe(
    filter(isOfType(PLAY_CARD_FROM_QUEUE)),
    withLatestFrom(state$),
    mergeMap(([action, state]) => {
      const { gameNumber } = state.multiplayer
      devLog(`play card from queue: ${gameNumber.toString()}`, 'info')

      let playCardQueue = playCardQueues.get(gameNumber)
      if (playCardQueue === undefined) {
        playCardQueue = new Queue<
          UseCardCoreActionType | DiscardCardCoreActionType
        >()
        playCardQueues.set(gameNumber, playCardQueue)
      }

      const playCardActionPromise = playCardQueue.dequeueAsync()
      return from(playCardActionPromise).pipe(
        withLatestFrom(state$),
        concatMap(([playCardAction, state]) => {
          const currentGameNumber = state.multiplayer.gameNumber
          return currentGameNumber === gameNumber
            ? of<RootActionType>({
                type: PLAY_CARD_CORE_GUARDED,
                payload: playCardAction,
              }).pipe(delay(0))
            : EMPTY
        }),
        takeUntil(action$.ofType(ABORT_CONNECTION)),
      )
    }),
  )
