import { ofType, StateObservable } from 'redux-observable'
import { EMPTY, Observable, of } from 'rxjs'
import { withLatestFrom, filter, mergeMap, takeUntil } from 'rxjs/operators'
import { isOfType } from 'typesafe-actions'
import { CHECK_VICTORY, ABORT_ALL, SCREEN_END } from '@/constants/ActionTypes'
import { RootActionType } from '@/types/actionObj'
import { RootStateType } from '@/types/state'
import { checkVictory } from '@/utils/checkVictory'
import { getWinState } from '@/utils/startWinState'

export default (
  action$: Observable<RootActionType>,
  state$: StateObservable<RootStateType>,
) =>
  action$.pipe(
    filter(isOfType(CHECK_VICTORY)),
    withLatestFrom(state$),
    mergeMap(([action, state]) => {
      const { winTower, winResource } = getWinState(state.settings)
      const { player, opponent } = state.status

      const res = checkVictory(player, opponent, winTower, winResource)

      if (res) {
        return of<RootActionType>({
          type: SCREEN_END,
          payload: res,
        }).pipe(takeUntil(action$.pipe(ofType(ABORT_ALL))))
      }

      return EMPTY
    }),
  )
