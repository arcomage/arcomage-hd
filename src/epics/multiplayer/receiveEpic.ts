import { ofType, StateObservable } from 'redux-observable'
import { concat, EMPTY, Observable, of } from 'rxjs'
import { mergeMap, delay } from 'rxjs/operators'
import { INIT_TO_QUEUE, RECEIVE } from '@/constants/ActionTypes'
import { INST } from '@/constants/connDataKind'
import { RootActionType } from '@/types/actionObj'
import {
  ConnDataType,
  instructionActionTypes,
  isVerifyGameNumberInst,
} from '@/types/connData'
import { RootStateType } from '@/types/state'
import devLog from '@/utils/devLog'
import { receiveSeq } from '@/utils/multiplayer/seq'

export default (
  action$: Observable<RootActionType>,
  _state$: StateObservable<RootStateType>,
) =>
  action$.pipe(
    ofType(RECEIVE),
    mergeMap((action) => {
      const { data: connDataStr } = action
      devLog(`received: ${connDataStr}`, 'note')
      try {
        const connData: ConnDataType = JSON.parse(connDataStr)

        const usableConnDataList = receiveSeq.getUsableConnDataList(connData)
        if (usableConnDataList === null) {
          return EMPTY
        }

        const ret = usableConnDataList.map((connData0) => {
          const { kind, data, gameNumber } = connData0
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
                `received non-instruction action: ${JSON.stringify(connData0)}`,
                'error',
              )
              break
            }
          }
          return EMPTY
        })

        return concat(...ret)
      } catch (_error) {
        /* empty */
      }
      return EMPTY
    }),
  )
