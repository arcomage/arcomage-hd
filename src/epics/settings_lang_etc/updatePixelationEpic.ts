import { ofType, StateObservable } from 'redux-observable'
import { Observable, of } from 'rxjs'
import { filter, mergeMap, takeUntil } from 'rxjs/operators'
import { isOfType } from 'typesafe-actions'
import {
  UPDATE_PIXELATION,
  UPDATE_PIXELATION_MAIN,
  ABORT_ALL,
} from '@/constants/ActionTypes'
import { defaultNoanim, defaultVisualvalues } from '@/constants/defaultSettings'
import { RootActionType } from '@/types/actionObj'
import { RootStateType } from '@/types/state'
import { lsSet } from '@/utils/localstorage'

export default (
  action$: Observable<RootActionType>,
  state$: StateObservable<RootStateType>,
) =>
  action$.pipe(
    filter(isOfType(UPDATE_PIXELATION)),
    mergeMap((action) => {
      const { pixelation } = action
      lsSet((draft) => {
        if (draft.visual === undefined) {
          draft.visual = {
            pixelation,
            visualvalues: defaultVisualvalues,
            noanim: defaultNoanim,
          }
        } else {
          draft.visual.pixelation = pixelation
        }
      })
      return of<RootActionType>({
        type: UPDATE_PIXELATION_MAIN,
        pixelation,
      }).pipe(takeUntil(action$.pipe(ofType(ABORT_ALL))))
    }),
  )
