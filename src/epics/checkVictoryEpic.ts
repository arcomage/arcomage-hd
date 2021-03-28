import { CHECK_VICTORY, SCREEN_END } from '../constants/ActionTypes'
import { ActionType } from '../types/actionObj'
import { withLatestFrom, filter, map } from 'rxjs/operators'
import { isOfType } from 'typesafe-actions'
import { ActionsObservable, StateObservable } from 'redux-observable'
import { StateType } from '../types/state'
import { resNames } from '../constants/resourceNames'

export const checkVictoryEpic = (
  action$: ActionsObservable<ActionType>,
  state$: StateObservable<StateType>,
) =>
  action$.pipe(
    filter(isOfType(CHECK_VICTORY)),
    withLatestFrom(state$),
    map(([action, state]) => {
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
        return {
          type: SCREEN_END,
          kind: 1,
        }
      }
      if (!playerWin && opponentWin) {
        return {
          type: SCREEN_END,
          kind: -1,
        }
      }
      if (playerWin && opponentWin) {
        return {
          type: SCREEN_END,
          kind: 0,
        }
      }

      return {
        type: SCREEN_END,
        kind: null,
      }
    }),
  )

export default checkVictoryEpic
