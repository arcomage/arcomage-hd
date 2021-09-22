import {
  UPDATE_PIXELATION,
  UPDATE_PIXELATION_MAIN,
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
    filter(isOfType(UPDATE_PIXELATION)),
    mergeMap((action) => {
      const { pixelation } = action
      lsSet((draft) => {
        if (draft.visual === undefined) {
          draft.visual = { pixelation }
        } else {
          draft.visual.pixelation = pixelation
        }
      })
      return of<RootActionType>({
        type: UPDATE_PIXELATION_MAIN,
        pixelation,
      }).pipe(takeUntil(action$.ofType(ABORT_ALL)))
    }),
  )
