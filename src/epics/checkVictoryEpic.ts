import { CHECK_VICTORY, ABORT_ALL, SCREEN_END } from '../constants/ActionTypes'
import { RootActionType } from '../types/actionObj'
import { withLatestFrom, filter, concatMap, takeUntil } from 'rxjs/operators'
import { isOfType } from 'typesafe-actions'
import { ActionsObservable, StateObservable } from 'redux-observable'
import { RootStateType } from '../types/state'
import { resNames } from '../constants/resourceNames'
import { EMPTY, of } from 'rxjs'

export const checkVictoryEpic = (
  action$: ActionsObservable<RootActionType>,
  state$: StateObservable<RootStateType>,
) =>
  action$.pipe(
    filter(isOfType(CHECK_VICTORY)),
    withLatestFrom(state$),
    concatMap(([action, state]) => {
      const { tower: winTower, resource: winResource } = state.settings.win
      const { player, opponent } = state.status

      const playerWin =
        player.tower >= winTower ||
        opponent.tower <= 0 ||
        resNames.some((resName) => player[resName] >= winResource)
      const opponentWin =
        opponent.tower >= winTower ||
        player.tower <= 0 ||
        resNames.some((resName) => opponent[resName] >= winResource)

      if (playerWin && !opponentWin) {
        return of<RootActionType>({
          type: SCREEN_END,
          payload: { type: 'win' },
        }).pipe(takeUntil(action$.ofType(ABORT_ALL)))
      }
      if (!playerWin && opponentWin) {
        return of<RootActionType>({
          type: SCREEN_END,
          payload: { type: 'lose' },
        }).pipe(takeUntil(action$.ofType(ABORT_ALL)))
      }
      if (playerWin && opponentWin) {
        return of<RootActionType>({
          type: SCREEN_END,
          payload: { type: 'tie' },
        }).pipe(takeUntil(action$.ofType(ABORT_ALL)))
      }

      return EMPTY
    }),
  )

export default checkVictoryEpic
