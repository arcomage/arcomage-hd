import {
  CLEAR_CARD,
  USE_CARD,
  EXEC_CARD,
  MOVE_CARD_TO_CENTER,
  SWITCH_LOCK,
  REMOVE_CARD,
} from '../constants/ActionTypes'
import { ActionType } from '../types/actionObj'
import {
  map,
  withLatestFrom,
  filter,
  mergeMap,
  delay,
  concatMap,
} from 'rxjs/operators'
import { isOfType } from 'typesafe-actions'
import { ActionsObservable, StateObservable } from 'redux-observable'
import { StateType } from '../types/state'
import { entries } from '../utils/typeHelpers'
import dataCards from '../data/cards'
import { concat, interval, merge, of } from 'rxjs'

export const useCardEpic = (
  action$: ActionsObservable<ActionType>,
  state$: StateObservable<StateType>,
) =>
  action$.pipe(
    filter(isOfType(USE_CARD)),
    mergeMap(({ n, index, position, owner }) =>
      merge(
        of({
          type: CLEAR_CARD,
        }),
        of({
          type: EXEC_CARD,
          n,
        }),
        of({
          type: MOVE_CARD_TO_CENTER,
          index,
        }),
        of({
          type: REMOVE_CARD,
          index,
          position,
          owner,
        }),
        of({
          type: SWITCH_LOCK,
        }),
      ),
    ),
  )

// action$.filter(isOfType(USE_CARD))
//   .mergeMapTo(Observable.of({ type: 'FETCH_REQUEST' })
//     .concat(Observable.of({ type: 'FETCH_SUCCESS' })
//       .delay(1000)))

export default useCardEpic
