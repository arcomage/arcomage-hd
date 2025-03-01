import { ofType, StateObservable } from 'redux-observable'
import { EMPTY, from, Observable, of } from 'rxjs'
import { mergeMap, takeUntil, withLatestFrom, delay } from 'rxjs/operators'
import {
  PLAY_CARD_FROM_QUEUE,
  ABORT_CONNECTION,
  PLAY_CARD_CORE_GUARDED,
} from '@/constants/ActionTypes'
import {
  DiscardCardCoreActionType,
  RootActionType,
  UseCardCoreActionType,
} from '@/types/actionObj'
import { RootStateType } from '@/types/state'
import devLog from '@/utils/devLog'
import Queue from '@/utils/multiplayer/Queue'
import { playCardQueues } from '@/utils/multiplayer/queues'

export default (
  action$: Observable<RootActionType>,
  state$: StateObservable<RootStateType>,
) =>
  action$.pipe(
    ofType(PLAY_CARD_FROM_QUEUE),
    withLatestFrom(state$),
    mergeMap(([_action, state]) => {
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
        mergeMap(([playCardAction, state0]) => {
          const currentGameNumber = state0.multiplayer.gameNumber
          return currentGameNumber === gameNumber
            ? of<RootActionType>({
                type: PLAY_CARD_CORE_GUARDED,
                payload: playCardAction,
              }).pipe(delay(0))
            : EMPTY
        }),
        takeUntil(action$.pipe(ofType(ABORT_CONNECTION))),
      )
    }),
  )
