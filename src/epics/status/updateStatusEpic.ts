import {
  CHECK_UNUSABLE,
  CHECK_VICTORY,
  ABORT_ALL,
  UPDATE_STATUS,
  UPDATE_STATUS_MAIN,
} from '../../constants/ActionTypes'
import {
  RootActionType,
  UpdateStatusMainActionTypeSingle,
} from '../../types/actionObj'
import { withLatestFrom, filter, mergeMap, takeUntil } from 'rxjs/operators'
import { isOfType } from 'typesafe-actions'
import { ofType, StateObservable } from 'redux-observable'
import { RootStateType } from '../../types/state'
import { Sound } from '../../utils/Sound'
import { concat, Observable, of } from 'rxjs'

export default (
  action$: Observable<RootActionType>,
  state$: StateObservable<RootStateType>,
) =>
  action$.pipe(
    filter(isOfType(UPDATE_STATUS)),
    withLatestFrom(state$),
    mergeMap(([action, state]) => {
      // note that it doesn't perform any negative check,
      // the negative check must be done at the upper stream:
      // data/cards.ts & epics/execCardEpic.ts
      const newUpdArr: UpdateStatusMainActionTypeSingle[] = action.payload.map(
        (upd) => {
          const { isPlayer, statusProp, noSound } = upd
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
          if (!noSound) {
            Sound.play(statusProp, increase, isPlayer)
          }
          return {
            isPlayer,
            statusProp,
            ...('to' in upd ? { to: upd.to } : { diff: upd.diff }),
          }
        },
      )
      return concat(
        of<RootActionType>({
          type: UPDATE_STATUS_MAIN,
          payload: newUpdArr,
        }),
        of<RootActionType>({
          type: CHECK_UNUSABLE,
        }),
        of<RootActionType>({
          type: CHECK_VICTORY,
        }),
      ).pipe(takeUntil(action$.pipe(ofType(ABORT_ALL))))
    }),
  )
