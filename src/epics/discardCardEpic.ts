import { DISCARD_CARD, SWITCH_LOCK } from '../constants/ActionTypes'
import { ActionType } from '../types/actionObj'
import { map, withLatestFrom, filter } from 'rxjs/operators'
import { isOfType } from 'typesafe-actions'
import { ActionsObservable, StateObservable } from 'redux-observable'
import { StateType } from '../types/state'
import { entries } from '../utils/typeHelpers'
import dataCards from '../data/cards'

export const discardCardEpic = (
  action$: ActionsObservable<ActionType>,
  state$: StateObservable<StateType>,
) =>
  action$.pipe(
    filter(isOfType(DISCARD_CARD)),
    map(() => ({
      type: SWITCH_LOCK,
    })),
  )

export default discardCardEpic
