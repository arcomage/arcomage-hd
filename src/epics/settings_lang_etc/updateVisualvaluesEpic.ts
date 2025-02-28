import { ofType, StateObservable } from 'redux-observable'
import { Observable, of } from 'rxjs'
import { mergeMap, takeUntil } from 'rxjs/operators'
import {
  UPDATE_VISUALVALUES,
  UPDATE_VISUALVALUES_MAIN,
  ABORT_ALL,
} from '@/constants/ActionTypes'
import {
  defaultNoanim,
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
    ofType(UPDATE_VISUALVALUES),
    mergeMap((action) => {
      const { payload } = action
      lsSet((draft) => {
        if (draft.visual === undefined) {
          draft.visual = {
            pixelation: defaultPixelation,
            visualvalues: { ...defaultVisualvalues, ...payload },
            noanim: defaultNoanim,
          }
        } else {
          draft.visual.visualvalues = {
            ...draft.visual.visualvalues,
            ...payload,
          }
        }
      })
      return of<RootActionType>({
        type: UPDATE_VISUALVALUES_MAIN,
        payload,
      }).pipe(takeUntil(action$.pipe(ofType(ABORT_ALL))))
    }),
  )
