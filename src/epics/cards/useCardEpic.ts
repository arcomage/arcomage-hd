import { ofType, StateObservable } from 'redux-observable'
import { concat, EMPTY, Observable, of } from 'rxjs'
import { mergeMap, withLatestFrom, takeUntil } from 'rxjs/operators'
import {
  USE_CARD,
  USE_CARD_CORE,
  PLAY_CARD_TO_QUEUE,
  ABORT_ALL,
  SEND,
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
    ofType(USE_CARD),
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
      ).pipe(takeUntil(action$.pipe(ofType(ABORT_ALL))))
    }),
  )
