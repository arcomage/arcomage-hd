import {
  UPDATE_PIXELATED,
  UPDATE_PIXELATED_MAIN,
  ABORT_ALL,
} from '../../constants/ActionTypes'
import { RootActionType } from '../../types/actionObj'
import { filter, mergeMap, takeUntil } from 'rxjs/operators'
import { of } from 'rxjs'
import { isOfType } from 'typesafe-actions'
import { ActionsObservable, StateObservable } from 'redux-observable'
import { RootStateType } from '../../types/state'
import { lsSet } from '../../utils/localstorage'

export default (
  action$: ActionsObservable<RootActionType>,
  state$: StateObservable<RootStateType>,
) =>
  action$.pipe(
    filter(isOfType(UPDATE_PIXELATED)),
    mergeMap((action) => {
      const { pixelated } = action
      lsSet((draft) => {
        if (draft.visual === undefined) {
          draft.visual = { pixelated }
        } else {
          draft.visual.pixelated = pixelated
        }
      })
      return of<RootActionType>({
        type: UPDATE_PIXELATED_MAIN,
        pixelated,
      }).pipe(takeUntil(action$.ofType(ABORT_ALL)))
    }),
  )
