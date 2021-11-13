import {
  DISCARD_CARD,
  DISCARD_CARD_CORE,
  ABORT_ALL,
  SEND,
  PLAY_CARD_TO_QUEUE,
  PLAY_CARD_CORE_GUARDED,
} from '../../constants/ActionTypes'
import { RootActionType } from '../../types/actionObj'
import { withLatestFrom, filter, mergeMap, takeUntil } from 'rxjs/operators'
import { isOfType } from 'typesafe-actions'
import { ofType, StateObservable } from 'redux-observable'
import { RootStateType } from '../../types/state'
import { of, concat, EMPTY, Observable } from 'rxjs'
import { INST } from '../../constants/connDataKind'
import { reverseOwnerStr } from '../../utils/reverseState'

export default (
  action$: Observable<RootActionType>,
  state$: StateObservable<RootStateType>,
) =>
  action$.pipe(
    filter(isOfType(DISCARD_CARD)),
    withLatestFrom(state$),
    mergeMap(([action, state]) => {
      const { index, position, owner } = action
      const multiGameNumber = state.multiplayer.gameNumber

      return concat(
        of<RootActionType>({
          type: PLAY_CARD_CORE_GUARDED,
          payload: {
            type: DISCARD_CARD_CORE,
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
                  type: DISCARD_CARD_CORE,
                  index,
                  position,
                  owner: reverseOwnerStr(owner),
                },
              },
            })
          : EMPTY,
      ).pipe(takeUntil(action$.pipe(ofType(ABORT_ALL))))
    }),
  )
