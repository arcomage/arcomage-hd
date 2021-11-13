import { DRAW_CARD_TO_QUEUE } from '../../constants/ActionTypes'
import { RootActionType } from '../../types/actionObj'
import { filter, tap, ignoreElements } from 'rxjs/operators'
import { isOfType } from 'typesafe-actions'
import { StateObservable } from 'redux-observable'
import { RootStateType } from '../../types/state'
import { drawCardQueues } from '../../utils/queues'
import devLog from '../../utils/devLog'
import Queue from '../../utils/Queue'
import { Observable } from 'rxjs'

export default (
  action$: Observable<RootActionType>,
  state$: StateObservable<RootStateType>,
) =>
  action$.pipe(
    filter(isOfType(DRAW_CARD_TO_QUEUE)),
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
