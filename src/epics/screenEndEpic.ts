import {
  ABORT_ALL,
  SCREEN_END,
  SCREEN_END_MAIN,
} from '../constants/ActionTypes'
import { RootActionType } from '../types/actionObj'
import { filter, concatMap } from 'rxjs/operators'
import { isOfType } from 'typesafe-actions'
import { ActionsObservable, StateObservable } from 'redux-observable'
import { RootStateType } from '../types/state'
import { concat, of } from 'rxjs'

export const screenEndEpic = (
  action$: ActionsObservable<RootActionType>,
  state$: StateObservable<RootStateType>,
) =>
  action$.pipe(
    filter(isOfType(SCREEN_END)),
    concatMap((action) =>
      concat(
        of({
          type: ABORT_ALL,
        }),
        of({
          type: SCREEN_END_MAIN,
          kind: action.kind,
        }),
      ),
    ),
  )

export default screenEndEpic
