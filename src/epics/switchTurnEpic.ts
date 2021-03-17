import { SWITCH_TURN, SWITCH_LOCK } from '../constants/ActionTypes'
import { ActionType } from '../types/actionObj'
import { map, withLatestFrom, filter } from 'rxjs/operators'
import { isOfType } from 'typesafe-actions'
import { ActionsObservable, StateObservable } from 'redux-observable'
import { StateType } from '../types/state'
import { entries } from '../utils/typeHelpers'
import dataCards from '../data/cards'

export const switchTurnEpic = (
  action$: ActionsObservable<ActionType>,
  state$: StateObservable<StateType>,
) =>
  action$.pipe(
    filter(isOfType(SWITCH_TURN)),
    map(() => ({
      type: SWITCH_LOCK,
    })),
  )

export default switchTurnEpic
