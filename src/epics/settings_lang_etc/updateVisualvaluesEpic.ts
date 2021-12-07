import {
  UPDATE_VISUALVALUES,
  UPDATE_VISUALVALUES_MAIN,
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
    filter(isOfType(UPDATE_VISUALVALUES)),
    mergeMap((action) => {
      const { payload } = action
      lsSet((draft) => {
        if (draft.visual === undefined) {
          draft.visual = {
            pixelation: defaultPixelation,
            visualvalues: { ...defaultVisualvalues, ...payload },
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
