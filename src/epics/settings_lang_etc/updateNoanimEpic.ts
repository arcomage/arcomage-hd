import { ofType, StateObservable } from 'redux-observable'
import { Observable, of } from 'rxjs'
import { mergeMap, takeUntil } from 'rxjs/operators'
import {
  UPDATE_NOANIM,
  UPDATE_NOANIM_MAIN,
  ABORT_ALL,
} from '@/constants/ActionTypes'
import {
  defaultPixelation,
  defaultVisualvalues,
} from '@/constants/defaultSettings'
import { RootActionType } from '@/types/actionObj'
import { RootStateType } from '@/types/state'
import { lsSet } from '@/utils/localstorage'

export default (
  action$: Observable<RootActionType>,
  state$: StateObservable<RootStateType>,
) =>
  action$.pipe(
    ofType(UPDATE_NOANIM),
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
