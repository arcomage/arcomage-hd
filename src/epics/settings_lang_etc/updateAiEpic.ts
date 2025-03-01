import { ofType, StateObservable } from 'redux-observable'
import { Observable, of } from 'rxjs'
import { mergeMap, takeUntil } from 'rxjs/operators'
import {
  UPDATE_AILEVEL,
  UPDATE_AILEVEL_MAIN,
  ABORT_ALL,
} from '@/constants/ActionTypes'
import { RootActionType } from '@/types/actionObj'
import { RootStateType } from '@/types/state'
import { lsSet } from '@/utils/localstorage'

export default (
  action$: Observable<RootActionType>,
  _state$: StateObservable<RootStateType>,
) =>
  action$.pipe(
    ofType(UPDATE_AILEVEL),
    mergeMap((action) => {
      const { aiLevel } = action
      lsSet((draft) => {
        if (draft.ai === undefined) {
          draft.ai = { aiLevel }
        } else {
          draft.ai.aiLevel = aiLevel
        }
      })
      return of<RootActionType>({
        type: UPDATE_AILEVEL_MAIN,
        aiLevel,
      }).pipe(takeUntil(action$.pipe(ofType(ABORT_ALL))))
    }),
  )
