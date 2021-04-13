import {
  SWITCH_MULTIPLAYER_MODE,
  SWITCH_MULTIPLAYER_MODE_MAIN,
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
import { of, concat } from 'rxjs'
import { isOfType } from 'typesafe-actions'
import { ActionsObservable, StateObservable } from 'redux-observable'
import { RootStateType } from '../../types/state'

export default (
  action$: ActionsObservable<RootActionType>,
  state$: StateObservable<RootStateType>,
) =>
  action$.pipe(
    filter(isOfType(SWITCH_MULTIPLAYER_MODE)),
    withLatestFrom(state$),
    concatMap(([action, state]) => {
      const { on } = action
      return concat(
        of<RootActionType>({
          type: SWITCH_MULTIPLAYER_MODE_MAIN,
          on,
        }),
      ).pipe(takeUntil(action$.ofType(ABORT_ALL)))
    }),
  )
