import { ofType, StateObservable } from 'redux-observable'
import { EMPTY, Observable, of } from 'rxjs'
import { withLatestFrom, filter, mergeMap, takeUntil } from 'rxjs/operators'
import { isOfType } from 'typesafe-actions'
import checkCardUseDiscard from '@/ai/checkCardUseDiscard'
import { ABORT_ALL, SCREEN_END, CHECK_SURRENDER } from '@/constants/ActionTypes'
import { RootActionType } from '@/types/actionObj'
import { AiCardListItemType } from '@/types/ai'
import { RootStateType } from '@/types/state'

export default (
  action$: Observable<RootActionType>,
  state$: StateObservable<RootStateType>,
) =>
  action$.pipe(
    filter(isOfType(CHECK_SURRENDER)),
    withLatestFrom(state$),
    mergeMap(([action, state]) => {
      // if multiplayer mode, don't check surrender, user should manually start a new game
      // this is to temporarily fix https://github.com/arcomage/arcomage-hd/issues/94
      if (state.multiplayer.on) {
        return EMPTY
      }

      // it borrows `checkCardUseDiscard` function and relavant types in ai/ folder
      const cardList: AiCardListItemType[] = checkCardUseDiscard(
        state,
        'player',
      ).filter((card) => card.canuse || card.candiscard)

      if (cardList.length === 0) {
        return of<RootActionType>({
          type: SCREEN_END,
          payload: { type: 'lose', surrender: true },
        }).pipe(takeUntil(action$.pipe(ofType(ABORT_ALL))))
      } else {
        return EMPTY
      }
    }),
  )
// TODO: fix: multiplayer mode, opponent surrenders, game freezes
