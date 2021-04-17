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
import {
  receiveSeq,
  initReceiveSeq,
  incrementReceiveSeq,
  intoReceiveQueue,
  getRemoveUsablesInRQueue,
} from '../../utils/seq'

export default (
  action$: ActionsObservable<RootActionType>,
  state$: StateObservable<RootStateType>,
) =>
  action$.pipe(
    filter(isOfType(RECEIVE)),
    concatMap((action) => {
      const { data: connDataStr } = action
      devLog(`received: ${connDataStr}`)
      try {
        const connData: ConnDataType = JSON.parse(connDataStr)
        const { seq } = connData
        if (receiveSeq === null) {
          initReceiveSeq(seq)
        } else if (seq === receiveSeq + 1) {
          incrementReceiveSeq()
        } else {
          intoReceiveQueue(connData)
          devLog(`postponed: ${connDataStr}`)
          return EMPTY
        }

        const usableInReceiveQueue: ConnDataType[] = getRemoveUsablesInRQueue(
          seq,
        )
        usableInReceiveQueue.push(connData)

        const ret = usableInReceiveQueue.map((connData) => {
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
