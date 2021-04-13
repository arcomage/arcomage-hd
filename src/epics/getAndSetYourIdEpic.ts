import {
  GET_AND_SET_YOUR_ID,
  SET_YOUR_ID,
  ABORT_ALL,
} from '../constants/ActionTypes'
import { RootActionType } from '../types/actionObj'
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
import { RootStateType } from '../types/state'

export default (
  action$: ActionsObservable<RootActionType>,
  state$: StateObservable<RootStateType>,
) =>
  action$.pipe(
    filter(isOfType(GET_AND_SET_YOUR_ID)),
    withLatestFrom(state$),
    concatMap(([action, state]) => {
      const id = '1'
      return concat(
        of<RootActionType>({
          type: SET_YOUR_ID,
          id,
        }),
      ).pipe(takeUntil(action$.ofType(ABORT_ALL)))
    }),
  )
