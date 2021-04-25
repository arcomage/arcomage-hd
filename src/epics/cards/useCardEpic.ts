import {
  USE_CARD,
  USE_CARD_CORE,
  PLAY_CARD_TO_QUEUE,
  ABORT_ALL,
  SEND,
  PLAY_CARD_CORE_GUARDED,
} from '../../constants/ActionTypes'
import { RootActionType } from '../../types/actionObj'
import { filter, mergeMap, withLatestFrom, takeUntil } from 'rxjs/operators'
import { isOfType } from 'typesafe-actions'
import { ActionsObservable, StateObservable } from 'redux-observable'
import { RootStateType } from '../../types/state'
import { concat, EMPTY, of } from 'rxjs'
import { INST } from '../../constants/connDataKind'
import { reverseOwnerStr } from '../../utils/reverseState'

export default (
  action$: ActionsObservable<RootActionType>,
  state$: StateObservable<RootStateType>,
) =>
  action$.pipe(
    filter(isOfType(USE_CARD)),
    withLatestFrom(state$),
    mergeMap(([action, state]) => {
      const { n, index, position, owner } = action
      const multiGameNumber = state.multiplayer.gameNumber

      return concat(
        of<RootActionType>({
          type: PLAY_CARD_CORE_GUARDED,
          payload: {
            type: USE_CARD_CORE,
            n,
            index,
            position,
            owner,
          },
        }),
        multiGameNumber > 0
          ? of<RootActionType>({
              type: SEND,
              kind: INST,
              data: {
                type: PLAY_CARD_TO_QUEUE,
                payload: {
                  type: USE_CARD_CORE,
                  n,
                  index,
                  position,
                  owner: reverseOwnerStr(owner),
                },
              },
            })
          : EMPTY,
      ).pipe(takeUntil(action$.ofType(ABORT_ALL)))
    }),
  )
