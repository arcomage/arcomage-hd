import { USE_CARD, EXEC_CARD } from '../constants/ActionTypes'
import { StatusActionType } from '../types/actionObj'
import { map, withLatestFrom, filter } from 'rxjs/operators'
import { isOfType } from 'typesafe-actions'
import { ActionsObservable, StateObservable } from 'redux-observable'
import { StateType } from '../types/state'
import { entries } from '../utils/typeHelpers'
import dataCards from '../data/cards'

export const useCardEpic = (
  action$: ActionsObservable<StatusActionType>,
  state$: StateObservable<StateType>,
) =>
  action$.pipe(
    filter(isOfType(USE_CARD)),
    withLatestFrom(state$),
    map(([action, state]) => {}),
  )

export default useCardEpic
