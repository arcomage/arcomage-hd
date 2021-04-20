import {
  SEND,
  SEND_NAME,
  SET_TEMP_OPPONENT_NAME,
} from '../../constants/ActionTypes'
import { RootActionType } from '../../types/actionObj'
import { debounceTime, filter, mergeMap } from 'rxjs/operators'
import { of } from 'rxjs'
import { isOfType } from 'typesafe-actions'
import { ActionsObservable, StateObservable } from 'redux-observable'
import { RootStateType } from '../../types/state'
import { INST } from '../../constants/connDataKind'
import { sendSettingsDebounceTime } from '../../constants/visuals'

export default (
  action$: ActionsObservable<RootActionType>,
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
