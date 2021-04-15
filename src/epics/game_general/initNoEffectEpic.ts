import {
  INIT_NO_EFFECT,
  INIT_CARD,
  INIT_GAME,
  INIT_STATUS,
  DRAW_CARD,
  RESOURCE_PROD,
  ABORT_ALL,
} from '../../constants/ActionTypes'
import { RootActionType } from '../../types/actionObj'
import {
  withLatestFrom,
  filter,
  concatMap,
  delay,
  takeUntil,
} from 'rxjs/operators'
import { of, concat } from 'rxjs'
import { isOfType } from 'typesafe-actions'
import { ActionsObservable, StateObservable } from 'redux-observable'
import { CardStateType, RootStateType } from '../../types/state'
import { getStartState } from '../../utils/startWinState'

export default (
  action$: ActionsObservable<RootActionType>,
  state$: StateObservable<RootStateType>,
) =>
  action$.pipe(
    filter(isOfType(INIT_NO_EFFECT)),
    withLatestFrom(state$),
    concatMap(([action, state]) => {
      const { playersTurn, cardList } = action

      const total = state.settings.cardsInHand
      const cardStates: CardStateType = {
        total: { player: total, opponent: total },
        list: cardList,
        nextPos: { player: total, opponent: total },
      }

      return concat(
        of<RootActionType>({
          type: INIT_CARD,
          payload: cardStates,
        }),
        of<RootActionType>({
          type: INIT_GAME,
          playersTurn,
        }),
        of<RootActionType>({
          type: INIT_STATUS,
          payload: getStartState(state.settings),
        }),
        of<RootActionType>({
          type: RESOURCE_PROD,
          owner: playersTurn ? 'player' : 'opponent',
        }),
        of<RootActionType>({
          type: DRAW_CARD,
        }).pipe(delay(0)),
      ).pipe(takeUntil(action$.ofType(ABORT_ALL)))
    }),
  )
