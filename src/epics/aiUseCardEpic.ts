import {
  AI_USE_CARD,
  DISCARD_CARD,
  ABORT_ALL,
  USE_CARD,
  SCREEN_END,
} from '../constants/ActionTypes'
import { RootActionType } from '../types/actionObj'
import { withLatestFrom, filter, concatMap, takeUntil } from 'rxjs/operators'
import { isOfType } from 'typesafe-actions'
import { ActionsObservable, StateObservable } from 'redux-observable'
import { RootStateType } from '../types/state'
import { EMPTY, of } from 'rxjs'
import { ai } from '../ai'
import { AiInstructionType } from '../types/ai'

export default (
  action$: ActionsObservable<RootActionType>,
  state$: StateObservable<RootStateType>,
) =>
  action$.pipe(
    filter(isOfType(AI_USE_CARD)),
    withLatestFrom(state$),
    concatMap(([action, state]) => {
      const aiInstruction: AiInstructionType | null = ai(state)
      if (aiInstruction === null) {
        return of<RootActionType>({
          type: SCREEN_END,
          payload: { type: 'win', surrender: true },
        }).pipe(takeUntil(action$.ofType(ABORT_ALL)))
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
            }).pipe(takeUntil(action$.ofType(ABORT_ALL)))
          : of<RootActionType>({
              type: DISCARD_CARD,
              index,
              position,
              owner,
            }).pipe(takeUntil(action$.ofType(ABORT_ALL)))
      } else {
        return EMPTY
      }
    }),
  )
