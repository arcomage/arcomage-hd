import { RECEIVE } from '../../constants/ActionTypes'
import { RootActionType } from '../../types/actionObj'
import { filter, concatMap } from 'rxjs/operators'
import { EMPTY, of } from 'rxjs'
import { isOfType } from 'typesafe-actions'
import { ActionsObservable, StateObservable } from 'redux-observable'
import { RootStateType } from '../../types/state'
import { ConnDataType, instructionActionTypes } from '../../types/connData'
import { INST } from '../../constants/connDataKind'

export default (
  action$: ActionsObservable<RootActionType>,
  state$: StateObservable<RootStateType>,
) =>
  action$.pipe(
    filter(isOfType(RECEIVE)),
    concatMap((action) => {
      const { data: connDataStr } = action
      try {
        const connData: ConnDataType = JSON.parse(connDataStr)
        const { kind, data } = connData
        switch (kind) {
          case INST: {
            if (instructionActionTypes.includes(data.type)) {
              return of<RootActionType>(data)
            }
            break
          }
        }
      } catch (error) {}
      return EMPTY
    }),
  )
