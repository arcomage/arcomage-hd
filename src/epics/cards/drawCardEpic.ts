import {
  DRAW_CARD,
  DRAW_CARD_CORE,
  ABORT_ALL,
  SEND,
  SWITCH_LOCK,
} from '../../constants/ActionTypes'
import { RootActionType } from '../../types/actionObj'
import { filter, concatMap, takeUntil, withLatestFrom } from 'rxjs/operators'
import { isOfType } from 'typesafe-actions'
import { ActionsObservable, StateObservable } from 'redux-observable'
import { RootStateType } from '../../types/state'
import { concat, EMPTY, of } from 'rxjs'
import { randomWithProbs } from '../../utils/randomWithProbs'
import { INST } from '../../constants/connDataKind'

export default (
  action$: ActionsObservable<RootActionType>,
  state$: StateObservable<RootStateType>,
) =>
  action$.pipe(
    filter(isOfType(DRAW_CARD)),
    withLatestFrom(state$),
    concatMap(([action, state]) => {
      const isHost = state.multiplayer.status === 'connected_to_id'
      const isGuest = state.multiplayer.status === 'connected_by_id'
      const isMultiGameStarted = state.multiplayer.gameStarted

      const n = randomWithProbs()

      return concat(
        of<RootActionType>({
          type: SWITCH_LOCK,
          on: true,
          locknumber: 1,
        }),
        isMultiGameStarted && isGuest
          ? EMPTY
          : of<RootActionType>({
              type: DRAW_CARD_CORE,
              n,
            }),
        isMultiGameStarted && isHost
          ? of<RootActionType>({
              type: SEND,
              kind: INST,
              data: {
                type: DRAW_CARD_CORE,
                n,
              },
            })
          : EMPTY,
      ).pipe(takeUntil(action$.ofType(ABORT_ALL)))
    }),
  )
