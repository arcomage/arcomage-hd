import {
  DISCARD_CARD,
  DISCARD_CARD_CORE,
  ABORT_ALL,
  SEND,
} from '../../constants/ActionTypes'
import { RootActionType } from '../../types/actionObj'
import { withLatestFrom, filter, concatMap, takeUntil } from 'rxjs/operators'
import { isOfType } from 'typesafe-actions'
import { ActionsObservable, StateObservable } from 'redux-observable'
import { RootStateType } from '../../types/state'
import { of, concat, EMPTY } from 'rxjs'
import { INST } from '../../constants/connDataKind'
import { reverseOwnerStr } from '../../utils/reverseState'

export default (
  action$: ActionsObservable<RootActionType>,
  state$: StateObservable<RootStateType>,
) =>
  action$.pipe(
    filter(isOfType(DISCARD_CARD)),
    withLatestFrom(state$),
    concatMap(([action, state]) => {
      const { index, position, owner } = action
      const isConnected =
        state.multiplayer.on &&
        (state.multiplayer.status === 'connected_to_id' ||
          state.multiplayer.status === 'connected_by_id')

      return concat(
        of<RootActionType>({
          type: DISCARD_CARD_CORE,
          index,
          position,
          owner,
        }),
        isConnected
          ? of<RootActionType>({
              type: SEND,
              kind: INST,
              data: {
                type: DISCARD_CARD_CORE,
                index,
                position,
                owner: reverseOwnerStr(owner),
              },
            })
          : EMPTY,
      ).pipe(takeUntil(action$.ofType(ABORT_ALL)))
    }),
  )
