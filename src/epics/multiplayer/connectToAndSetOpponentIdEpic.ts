import {
  CONNECT_TO_AND_SET_OPPONENT_ID,
  SET_OPPONENT_ID,
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
    filter(isOfType(CONNECT_TO_AND_SET_OPPONENT_ID)),
    withLatestFrom(state$),
    concatMap(([action, state]) => {
      const { id } = action
      return concat(
        of<RootActionType>({
          type: SET_OPPONENT_ID,
          id,
        }),
      ).pipe(takeUntil(action$.ofType(ABORT_ALL)))
    }),
  )
