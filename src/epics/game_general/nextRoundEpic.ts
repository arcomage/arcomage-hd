import {
  SWITCH_TURN,
  SWITCH_LOCK,
  NEXT_ROUND,
  DRAW_CARD,
  RESOURCE_PROD,
  SWITCH_NEW_TURN,
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
import { concat, of } from 'rxjs'

export default (
  action$: ActionsObservable<RootActionType>,
  state$: StateObservable<RootStateType>,
) =>
  action$.pipe(
    filter(isOfType(NEXT_ROUND)),
    withLatestFrom(state$),
    concatMap(([action, state]) => {
      return concat(
        of<RootActionType>({
          type: SWITCH_TURN,
        }),
        of<RootActionType>({
          type: RESOURCE_PROD,
          owner: state.game.playersTurn ? 'opponent' : 'player',
        }),
        of<RootActionType>({
          type: SWITCH_LOCK,
          on: false, // switch it back following `DISCARD_CARD`'s switch
        }),
        of<RootActionType>({
          type: DRAW_CARD,
        }).pipe(delay(0)),
        of<RootActionType>({
          type: SWITCH_NEW_TURN,
          on: true,
        }),
      ).pipe(takeUntil(action$.ofType(ABORT_ALL)))
    }),
  )
