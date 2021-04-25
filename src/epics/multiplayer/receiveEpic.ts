import { INIT_TO_QUEUE, RECEIVE } from '../../constants/ActionTypes'
import { RootActionType } from '../../types/actionObj'
import { filter, mergeMap, delay } from 'rxjs/operators'
import { concat, EMPTY, of } from 'rxjs'
import { isOfType } from 'typesafe-actions'
import { ActionsObservable, StateObservable } from 'redux-observable'
import { RootStateType } from '../../types/state'
import {
  ConnDataType,
  instructionActionTypes,
  isVerifyGameNumberInst,
} from '../../types/connData'
import { INST } from '../../constants/connDataKind'
import devLog from '../../utils/devLog'
import { receiveSeq } from '../../utils/seq'

export default (
  action$: ActionsObservable<RootActionType>,
  state$: StateObservable<RootStateType>,
) =>
  action$.pipe(
    filter(isOfType(RECEIVE)),
    mergeMap((action) => {
      const { data: connDataStr } = action
      devLog(`received: ${connDataStr}`, 'note')
      try {
        const connData: ConnDataType = JSON.parse(connDataStr)

        const usableConnDataList = receiveSeq.getUsableConnDataList(connData)
        if (usableConnDataList === null) {
          return EMPTY
        }

        const ret = usableConnDataList.map((connData) => {
          const { kind, data, gameNumber } = connData
          switch (kind) {
            case INST: {
              if (instructionActionTypes.includes(data.type)) {
                if (isVerifyGameNumberInst(data)) {
                  if (data.type === INIT_TO_QUEUE) {
                    return of<RootActionType>({
                      ...data,
                      prevGameNumber: gameNumber,
                    }).pipe(delay(0))
                  }
                  // DRAW_CARD_TO_QUEUE or PLAY_CARD_TO_QUEUE
                  return of<RootActionType>({ ...data, gameNumber }).pipe(
                    delay(0),
                  )
                }
                return of<RootActionType>(data).pipe(delay(0))
              }
              devLog(
                `received non-instruction action: ${JSON.stringify(connData)}`,
                'error',
              )
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
