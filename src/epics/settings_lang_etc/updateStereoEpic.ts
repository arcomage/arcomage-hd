import {
  UPDATE_STEREO,
  UPDATE_STEREO_MAIN,
  ABORT_ALL,
} from '../../constants/ActionTypes'
import { RootActionType } from '../../types/actionObj'
import { filter, mergeMap, takeUntil } from 'rxjs/operators'
import { Observable, of } from 'rxjs'
import { isOfType } from 'typesafe-actions'
import { ofType, StateObservable } from 'redux-observable'
import { RootStateType } from '../../types/state'
import { lsSet } from '../../utils/localstorage'
import { defaultVolume } from '../../constants/defaultSettings'

export default (
  action$: Observable<RootActionType>,
  state$: StateObservable<RootStateType>,
) =>
  action$.pipe(
    filter(isOfType(UPDATE_STEREO)),
    mergeMap((action) => {
      const { stereo } = action
      lsSet((draft) => {
        if (draft.sound === undefined) {
          draft.sound = { volume: defaultVolume, stereo }
        } else {
          draft.sound.stereo = stereo
        }
      })
      return of<RootActionType>({
        type: UPDATE_STEREO_MAIN,
        stereo,
      }).pipe(takeUntil(action$.pipe(ofType(ABORT_ALL))))
    }),
  )
