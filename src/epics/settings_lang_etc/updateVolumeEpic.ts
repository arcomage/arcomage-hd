import { ofType, StateObservable } from 'redux-observable'
import { Observable, of } from 'rxjs'
import { mergeMap, takeUntil } from 'rxjs/operators'
import {
  UPDATE_VOLUME,
  UPDATE_VOLUME_MAIN,
  ABORT_ALL,
} from '@/constants/ActionTypes'
import { defaultStereo } from '@/constants/defaultSettings'
import { RootActionType } from '@/types/actionObj'
import { RootStateType } from '@/types/state'
import { lsSet } from '@/utils/localstorage'

export default (
  action$: Observable<RootActionType>,
  state$: StateObservable<RootStateType>,
) =>
  action$.pipe(
    ofType(UPDATE_VOLUME),
    mergeMap((action) => {
      const { volume } = action
      lsSet((draft) => {
        if (draft.sound === undefined) {
          draft.sound = { volume, stereo: defaultStereo }
        } else {
          draft.sound.volume = volume
        }
      })
      return of<RootActionType>({
        type: UPDATE_VOLUME_MAIN,
        volume,
      }).pipe(takeUntil(action$.pipe(ofType(ABORT_ALL))))
    }),
  )
