import {
  DRAW_CARD,
  DRAW_CARD_NO_EFFECT,
  ABORT_ALL,
} from '../../constants/ActionTypes'
import { RootActionType } from '../../types/actionObj'
import { filter, concatMap, takeUntil } from 'rxjs/operators'
import { isOfType } from 'typesafe-actions'
import { ActionsObservable, StateObservable } from 'redux-observable'
import { RootStateType } from '../../types/state'
import { of } from 'rxjs'
import { randomWithProbs } from '../../utils/randomWithProbs'

export default (
  action$: ActionsObservable<RootActionType>,
  state$: StateObservable<RootStateType>,
) =>
  action$.pipe(
    filter(isOfType(DRAW_CARD)),
    concatMap((action) => {
      const n = randomWithProbs()

      return of<RootActionType>({
        type: DRAW_CARD_NO_EFFECT,
        n,
      }).pipe(takeUntil(action$.ofType(ABORT_ALL)))
    }),
  )
