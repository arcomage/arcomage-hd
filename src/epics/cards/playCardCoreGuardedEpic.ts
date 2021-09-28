import {
  ABORT_CONNECTION,
  PLAY_CARD_CORE_GUARDED,
} from '../../constants/ActionTypes'
import { RootActionType } from '../../types/actionObj'
import {
  filter,
  mergeMap,
  withLatestFrom,
  map,
  take,
  takeUntil,
} from 'rxjs/operators'
import { isOfType } from 'typesafe-actions'
import { ActionsObservable, StateObservable } from 'redux-observable'
import { RootStateType } from '../../types/state'
import { of } from 'rxjs'
import devLog from '../../utils/devLog'

export default (
  action$: ActionsObservable<RootActionType>,
  state$: StateObservable<RootStateType>,
) =>
  action$.pipe(
    filter(isOfType(PLAY_CARD_CORE_GUARDED)),
    withLatestFrom(state$),
    mergeMap(([action, state]) => {
      const { payload: playCardAction } = action
      const locked = state.game.locked.some((l) => l === true)
      if (locked) {
        // rare situation
        devLog(
          `${JSON.stringify(
            playCardAction,
          )} executed during the lock ${JSON.stringify(
            state.game.locked,
          )}. the game will try to fix that`,
          'warning',
        )
        return state$.pipe(
          map((state0) => state0.game.locked),
          filter((locked0) => !locked0.some((l) => l === true)),
          take(1),
          map(() => playCardAction),
          takeUntil(action$.ofType(ABORT_CONNECTION)),
        )
      } else {
        return of<RootActionType>(playCardAction)
      }
    }),
  )
