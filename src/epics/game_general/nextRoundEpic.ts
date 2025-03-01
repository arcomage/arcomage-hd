import { ofType, StateObservable } from 'redux-observable'
import { concat, Observable, of } from 'rxjs'
import { withLatestFrom, mergeMap, delay, takeUntil } from 'rxjs/operators'
import {
  SWITCH_TURN,
  SWITCH_LOCK,
  NEXT_ROUND,
  DRAW_CARD,
  RESOURCE_PROD,
  SWITCH_NEW_TURN,
  ABORT_ALL,
} from '@/constants/ActionTypes'
import { RootActionType } from '@/types/actionObj'
import { RootStateType } from '@/types/state'

export default (
  action$: Observable<RootActionType>,
  state$: StateObservable<RootStateType>,
) =>
  action$.pipe(
    ofType(NEXT_ROUND),
    withLatestFrom(state$),
    mergeMap(([_action, state]) =>
      concat(
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
      ).pipe(takeUntil(action$.pipe(ofType(ABORT_ALL)))),
    ),
  )
