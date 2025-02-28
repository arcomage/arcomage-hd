import { ofType, StateObservable } from 'redux-observable'
import { EMPTY, Observable, of } from 'rxjs'
import { withLatestFrom, mergeMap, takeUntil } from 'rxjs/operators'
import { ai } from '@/ai'
import {
  AI_PLAY_CARD,
  DISCARD_CARD,
  ABORT_ALL,
  USE_CARD,
  SCREEN_END,
} from '@/constants/ActionTypes'
import { RootActionType } from '@/types/actionObj'
import { AiInstructionType } from '@/types/ai'
import { RootStateType } from '@/types/state'

export default (
  action$: Observable<RootActionType>,
  state$: StateObservable<RootStateType>,
) =>
  action$.pipe(
    ofType(AI_PLAY_CARD),
    withLatestFrom(state$),
    mergeMap(([action, state]) => {
      const aiInstruction: AiInstructionType | null = ai(state)
      if (aiInstruction === null) {
        return of<RootActionType>({
          type: SCREEN_END,
          payload: { type: 'win', surrender: true },
        }).pipe(takeUntil(action$.pipe(ofType(ABORT_ALL))))
      }
      const { index, use } = aiInstruction
      const card = state.cards.list[index]
      if (card !== null && card.owner !== 'common') {
        const { n, position, owner } = card
        return use
          ? of<RootActionType>({
              type: USE_CARD,
              index,
              n,
              position,
              owner,
            }).pipe(takeUntil(action$.pipe(ofType(ABORT_ALL))))
          : of<RootActionType>({
              type: DISCARD_CARD,
              index,
              position,
              owner,
            }).pipe(takeUntil(action$.pipe(ofType(ABORT_ALL))))
      } else {
        return EMPTY
      }
    }),
  )
