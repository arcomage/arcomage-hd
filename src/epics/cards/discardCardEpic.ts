import { ofType, StateObservable } from 'redux-observable'
import { of, concat, EMPTY, Observable } from 'rxjs'
import { withLatestFrom, mergeMap, takeUntil } from 'rxjs/operators'
import {
  DISCARD_CARD,
  DISCARD_CARD_CORE,
  ABORT_ALL,
  SEND,
  PLAY_CARD_TO_QUEUE,
  PLAY_CARD_CORE_GUARDED,
} from '@/constants/ActionTypes'
import { INST } from '@/constants/connDataKind'
import { RootActionType } from '@/types/actionObj'
import { RootStateType } from '@/types/state'
import { reverseOwnerStr } from '@/utils/multiplayer/reverseState'

export default (
  action$: Observable<RootActionType>,
  state$: StateObservable<RootStateType>,
) =>
  action$.pipe(
    ofType(DISCARD_CARD),
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
