import { ofType, StateObservable } from 'redux-observable'
import { Observable } from 'rxjs'
import { tap, ignoreElements } from 'rxjs/operators'
import { PLAY_CARD_TO_QUEUE } from '@/constants/ActionTypes'
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
  _state$: StateObservable<RootStateType>,
) =>
  action$.pipe(
    ofType(PLAY_CARD_TO_QUEUE),
    tap((action) => {
      const { payload, gameNumber } = action
      if (gameNumber === undefined) {
        devLog(`gameNumber is undefined in ${JSON.stringify(action)}`, 'error')
        return
      }

      let playCardQueue = playCardQueues.get(gameNumber)
      if (playCardQueue === undefined) {
        playCardQueue = new Queue<
          UseCardCoreActionType | DiscardCardCoreActionType
        >()
        playCardQueues.set(gameNumber, playCardQueue)
      }

      playCardQueue.enqueue(payload)
      return
    }),
    ignoreElements(),
  )
