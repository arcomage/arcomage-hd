import {
  USE_CARD,
  USE_CARD_CORE,
  ABORT_ALL,
  SEND,
} from '../../constants/ActionTypes'
import { RootActionType } from '../../types/actionObj'
import { filter, concatMap, withLatestFrom, takeUntil } from 'rxjs/operators'
import { isOfType } from 'typesafe-actions'
import { ActionsObservable, StateObservable } from 'redux-observable'
import { RootStateType } from '../../types/state'
import { concat, EMPTY, of } from 'rxjs'
import { INST } from '../../constants/connDataKind'
import { reverseOwnerStr } from '../../utils/reverseState'

export default (
  action$: ActionsObservable<RootActionType>,
  state$: StateObservable<RootStateType>,
) =>
  action$.pipe(
    filter(isOfType(USE_CARD)),
    withLatestFrom(state$),
    concatMap(([action, state]) => {
      const { n, index, position, owner } = action
      const multiGameStarted = state.multiplayer.gameStarted

      return concat(
        of<RootActionType>({
          type: USE_CARD_CORE,
          n,
          index,
          position,
          owner,
        }),
        multiGameStarted
          ? of<RootActionType>({
              type: SEND,
              kind: INST,
              data: {
                type: USE_CARD_CORE,
                n,
                index,
                position,
                owner: reverseOwnerStr(owner),
              },
            })
          : EMPTY,
      ).pipe(takeUntil(action$.ofType(ABORT_ALL)))
    }),
  )
