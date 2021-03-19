import {
  CHANGE_SETTINGS_AND_INIT,
  CHANGE_SETTINGS,
  INIT,
  INIT_CARD,
  INIT_GAME,
  INIT_STATUS,
} from '../constants/ActionTypes'
import { ActionType } from '../types/actionObj'
import { map, withLatestFrom, filter, mergeMap } from 'rxjs/operators'
import { of, merge } from 'rxjs'
import { isOfType } from 'typesafe-actions'
import { ActionsObservable, StateObservable } from 'redux-observable'
import { StateType } from '../types/state'
import { entries } from '../utils/typeHelpers'
import dataCards from '../data/cards'

export const changeSettingsAndInitEpic = (
  action$: ActionsObservable<ActionType>,
  state$: StateObservable<StateType>,
) =>
  action$.pipe(
    filter(isOfType(INIT)),
    withLatestFrom(state$),
    mergeMap(([action, state]) =>
      merge(
        of({
          type: INIT_CARD,
          total: state.settings.cardsInHand,
        }),
        of({
          type: INIT_GAME,
        }),
        of({
          type: INIT_STATUS,
          payload: state.settings.start,
        }),
      ),
    ),
  )

export default changeSettingsAndInitEpic
