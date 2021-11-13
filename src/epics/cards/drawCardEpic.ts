import {
  DRAW_CARD,
  DRAW_CARD_CORE,
  ABORT_ALL,
  SEND,
  SWITCH_LOCK,
  DRAW_CARD_TO_QUEUE,
  DRAW_CARD_FROM_QUEUE,
} from '../../constants/ActionTypes'
import { RootActionType } from '../../types/actionObj'
import {
  filter,
  mergeMap,
  takeUntil,
  withLatestFrom,
  delay,
} from 'rxjs/operators'
import { isOfType } from 'typesafe-actions'
import { ofType, StateObservable } from 'redux-observable'
import { RootStateType } from '../../types/state'
import { concat, Observable, of } from 'rxjs'
import { randomWithProbs } from '../../utils/randomWithProbs'
import { INST } from '../../constants/connDataKind'

export default (
  action$: Observable<RootActionType>,
  state$: StateObservable<RootStateType>,
) =>
  action$.pipe(
    filter(isOfType(DRAW_CARD)),
    withLatestFrom(state$),
    mergeMap(([action, state]) => {
      const isHost = state.multiplayer.status === 'connected_to_id'
      // const isGuest = state.multiplayer.status === 'connected_by_id'
      const multiGameNumber = state.multiplayer.gameNumber

      let temp$: Observable<RootActionType>
      if (multiGameNumber === -1) {
        temp$ = of<RootActionType>({
          type: DRAW_CARD_CORE,
          n: randomWithProbs(),
        }).pipe(delay(0))
      } else if (isHost) {
        const n = randomWithProbs()
        temp$ = concat(
          of<RootActionType>({
            type: DRAW_CARD_CORE,
            n,
          }).pipe(delay(0)),
          of<RootActionType>({
            type: SEND,
            kind: INST,
            data: {
              type: DRAW_CARD_TO_QUEUE,
              n,
            },
          }),
        )
      } else {
        // isGuest
        temp$ = of<RootActionType>({
          type: DRAW_CARD_FROM_QUEUE,
        }).pipe(delay(0))
      }

      return concat(
        of<RootActionType>({
          type: SWITCH_LOCK,
          on: true,
          locknumber: 1,
        }),
        temp$,
      ).pipe(takeUntil(action$.pipe(ofType(ABORT_ALL))))
    }),
  )
