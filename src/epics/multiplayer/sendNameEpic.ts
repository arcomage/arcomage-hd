import { StateObservable } from 'redux-observable'
import { Observable, of } from 'rxjs'
import { debounceTime, filter, mergeMap } from 'rxjs/operators'
import { isOfType } from 'typesafe-actions'
import {
  SEND,
  SEND_NAME,
  SET_TEMP_OPPONENT_NAME,
} from '@/constants/ActionTypes'
import { INST } from '@/constants/connDataKind'
import { sendSettingsDebounceTime } from '@/constants/visuals'
import { RootActionType } from '@/types/actionObj'
import { RootStateType } from '@/types/state'

export default (
  action$: Observable<RootActionType>,
  state$: StateObservable<RootStateType>,
) =>
  action$.pipe(
    filter(isOfType(SEND_NAME)),
    debounceTime(sendSettingsDebounceTime),
    mergeMap((action) => {
      const { name } = action
      return of<RootActionType>({
        type: SEND,
        kind: INST,
        data: {
          type: SET_TEMP_OPPONENT_NAME,
          name,
        },
      })
    }),
  )
