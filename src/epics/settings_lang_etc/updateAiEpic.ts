import {
  UPDATE_AITYPE,
  UPDATE_AITYPE_MAIN,
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
    filter(isOfType(UPDATE_AITYPE)),
    mergeMap((action) => {
      const { aiType } = action
      lsSet((draft) => {
        if (draft.ai === undefined) {
          draft.ai = { aiType }
        } else {
          draft.ai.aiType = aiType
        }
      })
      return of<RootActionType>({
        type: UPDATE_AITYPE_MAIN,
        aiType,
      }).pipe(takeUntil(action$.ofType(ABORT_ALL)))
    }),
  )
