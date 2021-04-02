import { CHECK_VICTORY, SCREEN_END } from '../constants/ActionTypes'
import { RootActionType } from '../types/actionObj'
import { withLatestFrom, filter, concatMap } from 'rxjs/operators'
import { isOfType } from 'typesafe-actions'
import { ActionsObservable, StateObservable } from 'redux-observable'
import { RootStateType } from '../types/state'
import { resNames } from '../constants/resourceNames'
import { EMPTY, of } from 'rxjs'
import playSound from '../utils/playSound'

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
        playSound('victory', state.volume)
        return of({
          type: SCREEN_END,
          kind: 1, // win
        })
      }
      if (!playerWin && opponentWin) {
        playSound('defeat', state.volume)
        return of({
          type: SCREEN_END,
          kind: -1, // lose
        })
      }
      if (playerWin && opponentWin) {
        playSound('victory', state.volume)
        return of({
          type: SCREEN_END,
          kind: 0, // tie
        })
      }

      return EMPTY
    }),
  )

export default checkVictoryEpic
