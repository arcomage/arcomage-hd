import { RECEIVE } from '../../constants/ActionTypes'
import { RootActionType } from '../../types/actionObj'
import { filter, concatMap, delay } from 'rxjs/operators'
import { concat, EMPTY, of } from 'rxjs'
import { isOfType } from 'typesafe-actions'
import { ActionsObservable, StateObservable } from 'redux-observable'
import { RootStateType } from '../../types/state'
import { ConnDataType, instructionActionTypes } from '../../types/connData'
import { INST } from '../../constants/connDataKind'
import devLog from '../../utils/devLog'
import { receiveSeq } from '../../utils/seq'

export default (
  action$: ActionsObservable<RootActionType>,
  state$: StateObservable<RootStateType>,
) =>
  action$.pipe(
    filter(isOfType(RECEIVE)),
    concatMap((action) => {
      const { data: connDataStr } = action
      devLog(`received: ${connDataStr}`, 'note')
      try {
        const connData: ConnDataType = JSON.parse(connDataStr)

        const usableConnDataList = receiveSeq.getUsableConnDataList(connData)
        if (usableConnDataList === null) {
          return EMPTY
        }

        const ret = usableConnDataList.map((connData) => {
          const { kind, data } = connData
          switch (kind) {
            case INST: {
              if (instructionActionTypes.includes(data.type)) {
                return of<RootActionType>(data).pipe(delay(0))
              }
              break
            }
          }
          return EMPTY
        })

        return concat(...ret)
      } catch (error) {}
      return EMPTY
    }),
  )
