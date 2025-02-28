import { ofType, StateObservable } from 'redux-observable'
import { of, concat, Observable } from 'rxjs'
import { withLatestFrom, mergeMap, delay } from 'rxjs/operators'
import {
  INIT_CORE,
  INIT_CARD,
  INIT_GAME,
  INIT_STATUS,
  DRAW_CARD,
  RESOURCE_PROD,
  ABORT_ALL,
  SET_MULTI_GAME_NUMBER,
  SCREEN_END,
} from '@/constants/ActionTypes'
import { RootActionType } from '@/types/actionObj'
import { CardStateType, RootStateType } from '@/types/state'
import { getStartState } from '@/utils/startWinState'

export default (
  action$: Observable<RootActionType>,
  state$: StateObservable<RootStateType>,
) =>
  action$.pipe(
    ofType(INIT_CORE),
    withLatestFrom(state$),
    mergeMap(([action, state]) => {
      // const isHost =
      //   state.multiplayer.on && state.multiplayer.status === 'connected_to_id'
      // const isGuest =
      //   state.multiplayer.on && state.multiplayer.status === 'connected_by_id'

      const { playersTurn, cardList, gameNumber } = action

      const total = state.settings.cardsInHand
      const cardStates: CardStateType = {
        total: { player: total, opponent: total },
        list: cardList,
        nextPos: { player: total, opponent: total },
      }

      return concat(
        of<RootActionType>({
          type: SCREEN_END,
          payload: { type: null },
        }),
        of<RootActionType>({
          type: ABORT_ALL,
        }),
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
          type: SET_MULTI_GAME_NUMBER,
          n: gameNumber,
        }),
        of<RootActionType>({
          type: RESOURCE_PROD,
          owner: playersTurn ? 'player' : 'opponent',
        }),
        of<RootActionType>({
          type: DRAW_CARD,
        }).pipe(delay(0)),
      )
    }),
  )
