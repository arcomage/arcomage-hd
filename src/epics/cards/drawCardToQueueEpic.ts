import { ofType, StateObservable } from 'redux-observable'
import { Observable } from 'rxjs'
import { tap, ignoreElements } from 'rxjs/operators'
import { DRAW_CARD_TO_QUEUE } from '@/constants/ActionTypes'
import { RootActionType } from '@/types/actionObj'
import { RootStateType } from '@/types/state'
import devLog from '@/utils/devLog'
import Queue from '@/utils/multiplayer/Queue'
import { drawCardQueues } from '@/utils/multiplayer/queues'

export default (
  action$: Observable<RootActionType>,
  _state$: StateObservable<RootStateType>,
) =>
  action$.pipe(
    ofType(DRAW_CARD_TO_QUEUE),
    tap((action) => {
      const { n, gameNumber } = action
      if (gameNumber === undefined) {
        devLog(`gameNumber is undefined in ${JSON.stringify(action)}`, 'error')
        return
      }

      let drawCardQueue = drawCardQueues.get(gameNumber)
      if (drawCardQueue === undefined) {
        drawCardQueue = new Queue<number>()
        drawCardQueues.set(gameNumber, drawCardQueue)
      }

      drawCardQueue.enqueue(n)
      return
    }),
    ignoreElements(),
  )
