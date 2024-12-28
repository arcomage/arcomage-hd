import {
  UPDATE_NOANIM,
  UPDATE_NOANIM_MAIN,
  ABORT_ALL,
} from '../../constants/ActionTypes'
import { RootActionType } from '../../types/actionObj'
import { filter, mergeMap, takeUntil } from 'rxjs/operators'
import { Observable, of } from 'rxjs'
import { isOfType } from 'typesafe-actions'
import { ofType, StateObservable } from 'redux-observable'
import { RootStateType } from '../../types/state'
import { lsSet } from '../../utils/localstorage'
import {
  defaultPixelation,
  defaultVisualvalues,
} from '../../constants/defaultSettings'

export default (
  action$: Observable<RootActionType>,
  state$: StateObservable<RootStateType>,
) =>
  action$.pipe(
    filter(isOfType(UPDATE_NOANIM)),
    mergeMap((action) => {
      const { noanim } = action
      lsSet((draft) => {
        if (draft.visual === undefined) {
          draft.visual = {
            noanim,
            visualvalues: defaultVisualvalues,
            pixelation: defaultPixelation,
          }
        } else {
          draft.visual.noanim = noanim
        }
      })
      return of<RootActionType>({
        type: UPDATE_NOANIM_MAIN,
        noanim,
      }).pipe(takeUntil(action$.pipe(ofType(ABORT_ALL))))
    }),
  )
