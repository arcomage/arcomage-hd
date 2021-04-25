import { INIT_TO_QUEUE } from '../../constants/ActionTypes'
import { RootActionType } from '../../types/actionObj'
import { filter, concatMap } from 'rxjs/operators'
import { isOfType } from 'typesafe-actions'
import { ActionsObservable, StateObservable } from 'redux-observable'
import { RootStateType } from '../../types/state'
import { EMPTY } from 'rxjs'
import { initQueue as q } from '../../utils/queues'

export default (
  action$: ActionsObservable<RootActionType>,
  state$: StateObservable<RootStateType>,
) =>
  action$.pipe(
    filter(isOfType(INIT_TO_QUEUE)),
    concatMap((action) => {
      const { type, ...rest } = action
      // rest = {playersTurn, cardList, gameNumber}
      q.enqueue(rest)
      return EMPTY
    }),
  )
