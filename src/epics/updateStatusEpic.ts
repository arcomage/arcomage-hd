import { UPDATE_STATUS, UPDATE_STATUS_MAIN } from '../constants/ActionTypes'
import { StatusActionType } from '../types/actionObj'
import { map, withLatestFrom, filter } from 'rxjs/operators'
import { isOfType } from 'typesafe-actions'
import { ActionsObservable, StateObservable } from 'redux-observable'
import { StateType } from '../types/state'
import playSound from '../utils/playSound'

export const updateStatusEpic = (
  action$: ActionsObservable<StatusActionType>,
  state$: StateObservable<StateType>,
) =>
  action$.pipe(
    filter(isOfType(UPDATE_STATUS)),
    withLatestFrom(state$),
    map(([action, state]) => {
      const newUpdArr = action.updArr.map((upd) => {
        const { isPlayer, statusProp } = upd
        let increase: boolean | null = null
        if ('to' in upd) {
          const from =
            state.status[isPlayer ? 'player' : 'opponent'][statusProp]
          if (upd.to !== from) {
            increase = upd.to > from
          }
        } else {
          if (upd.diff !== 0) {
            increase = upd.diff > 0
          }
        }
        playSound(statusProp, increase)
        return {
          increase,
          isPlayer,
          statusProp,
          ...('to' in upd ? { to: upd.to } : { diff: upd.diff }),
        }
      })
      return {
        type: UPDATE_STATUS_MAIN,
        updArr: newUpdArr,
      }
    }),
  )

export default updateStatusEpic
