import {
  SWITCH_TURN,
  SWITCH_LOCK,
  NEXT_ROUND,
  DRAW_CARD,
  RESOURCE_PROD,
  SWITCH_NEW_TURN,
  SCREEN_END,
} from '../constants/ActionTypes'
import { RootActionType } from '../types/actionObj'
import {
  withLatestFrom,
  filter,
  concatMap,
  delay,
  takeUntil,
} from 'rxjs/operators'
import { isOfType } from 'typesafe-actions'
import { ActionsObservable, StateObservable } from 'redux-observable'
import { RootStateType } from '../types/state'
import { concat, of } from 'rxjs'

export const nextRoundEpic = (
  action$: ActionsObservable<RootActionType>,
  state$: StateObservable<RootStateType>,
) =>
  action$.pipe(
    filter(isOfType(NEXT_ROUND)),
    withLatestFrom(state$),
    concatMap(([action, state]) => {
      return concat(
        of({
          type: SWITCH_TURN,
        }),
        of({
          type: RESOURCE_PROD,
          owner: state.game.playersTurn ? 'opponent' : 'player',
        }),
        ///////////////////////
        of({
          type: SWITCH_LOCK,
        }),
        of({
          type: DRAW_CARD,
        }).pipe(delay(0)),
        of({
          type: SWITCH_NEW_TURN,
        }),
      ).pipe(takeUntil(action$.ofType(SCREEN_END)))
    }),
  )

export default nextRoundEpic
