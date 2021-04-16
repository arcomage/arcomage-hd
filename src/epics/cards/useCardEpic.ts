import { USE_CARD, USE_CARD_CORE, ABORT_ALL } from '../../constants/ActionTypes'
import { RootActionType } from '../../types/actionObj'
import {
  filter,
  concatMap,
  delay,
  withLatestFrom,
  takeUntil,
} from 'rxjs/operators'
import { isOfType } from 'typesafe-actions'
import { ActionsObservable, StateObservable } from 'redux-observable'
import { RootStateType } from '../../types/state'
import { concat, EMPTY, of } from 'rxjs'
import playSound from '../../utils/playSound'
import cards from '../../data/cards'
import {
  cardNextStepDelay,
  cardTransitionDuration,
} from '../../constants/visuals'

export default (
  action$: ActionsObservable<RootActionType>,
  state$: StateObservable<RootStateType>,
) =>
  action$.pipe(
    filter(isOfType(USE_CARD)),
    withLatestFrom(state$),
    concatMap(([action, state]) => {
      const { n, index, position, owner } = action
      return of<RootActionType>({
        type: USE_CARD_CORE,
        n,
        index,
        position,
        owner,
      }).pipe(takeUntil(action$.ofType(ABORT_ALL)))
    }),
  )
