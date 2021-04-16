import {
  DISCARD_CARD,
  DISCARD_CARD_CORE,
  ABORT_ALL,
} from '../../constants/ActionTypes'
import { RootActionType } from '../../types/actionObj'
import {
  withLatestFrom,
  filter,
  concatMap,
  delay,
  takeUntil,
} from 'rxjs/operators'
import { isOfType } from 'typesafe-actions'
import { ActionsObservable, StateObservable } from 'redux-observable'
import { RootStateType } from '../../types/state'
import { of, concat, EMPTY } from 'rxjs'
import playSound from '../../utils/playSound'
import { cardTransitionDuration } from '../../constants/visuals'

export default (
  action$: ActionsObservable<RootActionType>,
  state$: StateObservable<RootStateType>,
) =>
  action$.pipe(
    filter(isOfType(DISCARD_CARD)),
    withLatestFrom(state$),
    concatMap(([action, state]) => {
      const { index, position, owner } = action
      return of<RootActionType>({
        type: DISCARD_CARD_CORE,
        index,
        position,
        owner,
      }).pipe(takeUntil(action$.ofType(ABORT_ALL)))
    }),
  )
