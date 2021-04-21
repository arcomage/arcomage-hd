import { RECEIVE } from '../../constants/ActionTypes'
import { RootActionType } from '../../types/actionObj'
import { filter, concatMap, delay, withLatestFrom } from 'rxjs/operators'
import { concat, EMPTY, of } from 'rxjs'
import { isOfType } from 'typesafe-actions'
import { ActionsObservable, StateObservable } from 'redux-observable'
import { RootStateType } from '../../types/state'
import {
  ConnDataType,
  instructionActionTypes,
  verifyGameNumberInstActionTypes,
} from '../../types/connData'
import { INST } from '../../constants/connDataKind'
import devLog from '../../utils/devLog'
import { receiveSeq } from '../../utils/seq'
import { isInArray } from '../../utils/typeHelpers'

export default (
  action$: ActionsObservable<RootActionType>,
  state$: StateObservable<RootStateType>,
) =>
  action$.pipe(
    filter(isOfType(RECEIVE)),
    withLatestFrom(state$),
    concatMap(([action, state]) => {
      const { gameNumber: curGameNumber } = state.multiplayer
      const { data: connDataStr } = action
      devLog(`received: ${connDataStr}`, 'note')
      try {
        const connData: ConnDataType = JSON.parse(connDataStr)

        const usableConnDataList = receiveSeq.getUsableConnDataList(connData)
        if (usableConnDataList === null) {
          return EMPTY
        }

        const ret = usableConnDataList.map((connData) => {
          const { kind, data, gameNumber: recvGameNumber } = connData
          switch (kind) {
            case INST: {
              const { type } = data
              if (instructionActionTypes.includes(type)) {
                if (isInArray(type, verifyGameNumberInstActionTypes)) {
                  if (curGameNumber > recvGameNumber) {
                    devLog(
                      `Current gameNumber (game start timestamp) ${curGameNumber} is higher than received in-game instruction ${JSON.stringify(
                        connData,
                      )} 's gameNumber. The instruction arriving late is therefore dropped`,
                      'warning',
                    )
                    return EMPTY
                  } else if (curGameNumber < recvGameNumber) {
                    devLog(
                      `Current gameNumber (game start timestamp) ${curGameNumber} is lower than received in-game instruction ${JSON.stringify(
                        connData,
                      )} 's gameNumber. The instruction arriving early is pushed to the queue rathen than dropped, but you should be careful`,
                      'warning',
                    )
                  }
                }
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
