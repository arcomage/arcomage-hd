import {
  ABORT_ALL,
  SCREEN_END,
  CHECK_SURRENDER,
} from '../constants/ActionTypes'
import { RootActionType } from '../types/actionObj'
import { withLatestFrom, filter, concatMap, takeUntil } from 'rxjs/operators'
import { isOfType } from 'typesafe-actions'
import { ActionsObservable, StateObservable } from 'redux-observable'
import { RootStateType } from '../types/state'
import { EMPTY, of } from 'rxjs'
import { AiCardListItemType } from '../types/ai'
import checkCardUseDiscard from '../ai/checkCardUseDiscard'

export default (
  action$: ActionsObservable<RootActionType>,
  state$: StateObservable<RootStateType>,
) =>
  action$.pipe(
    filter(isOfType(CHECK_SURRENDER)),
    withLatestFrom(state$),
    concatMap(([action, state]) => {
      // it borrows `checkCardUseDiscard` function and relavant types in ai/ folder
      const cardList: AiCardListItemType[] = checkCardUseDiscard(
        state,
        'player',
      ).filter((card) => card.canuse || card.candiscard)

      if (cardList.length === 0) {
        return of<RootActionType>({
          type: SCREEN_END,
          payload: { type: 'lose', surrender: true },
        }).pipe(takeUntil(action$.ofType(ABORT_ALL)))
      } else {
        return EMPTY
      }
    }),
  )
