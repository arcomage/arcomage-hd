import {
  DRAW_CARD_CORE,
  DRAW_CARD_PRE,
  DRAW_CARD_MAIN,
  CHECK_UNUSABLE,
  AI_PLAY_CARD,
  PLAY_CARD_FROM_QUEUE,
  ABORT_ALL,
  CHECK_SURRENDER,
  SWITCH_LOCK,
} from '../../constants/ActionTypes'
import { RootActionType } from '../../types/actionObj'
import {
  withLatestFrom,
  filter,
  mergeMap,
  delay,
  takeUntil,
} from 'rxjs/operators'
import { isOfType } from 'typesafe-actions'
import { ofType, StateObservable } from 'redux-observable'
import { RootStateType } from '../../types/state'
import { concat, EMPTY, Observable, of } from 'rxjs'
import playSound from '../../utils/playSound'
import {
  drawCardPre,
  cardTransitionDuration,
  aiDelay,
  humanDelay,
} from '../../constants/visuals'
import {
  aiExtraDelay,
  noAiExtraDelay,
  useAi,
} from '../../constants/devSettings'
import devLog from '../../utils/devLog'

export default (
  action$: Observable<RootActionType>,
  state$: StateObservable<RootStateType>,
) =>
  action$.pipe(
    filter(isOfType(DRAW_CARD_CORE)),
    withLatestFrom(state$),
    mergeMap(([action, state]) => {
      const { n } = action
      const owner = state.game.playersTurn ? 'player' : 'opponent'
      const multiGameNumber = state.multiplayer.gameNumber
      playSound('deal', state.volume)

      devLog(`${owner} draws card ${n}`, 'info')

      return concat(
        of<RootActionType>({
          type: DRAW_CARD_PRE,
          n,
        }),
        of<RootActionType>({
          type: CHECK_UNUSABLE,
          lastOnly: true,
        }),
        of<RootActionType>({
          type: DRAW_CARD_MAIN,
          owner,
        }).pipe(delay(drawCardPre)),
        of<RootActionType>({
          type: SWITCH_LOCK,
          on: false,
          locknumber: 1,
        }).pipe(delay(0)),
        owner === 'opponent' && useAi && multiGameNumber === -1
          ? of<RootActionType>({
              type: AI_PLAY_CARD,
            }).pipe(
              delay(
                cardTransitionDuration +
                  aiDelay +
                  (noAiExtraDelay ? 0 : aiExtraDelay),
              ),
            )
          : EMPTY,
        owner === 'opponent' && multiGameNumber > 0
          ? of<RootActionType>({
              type: PLAY_CARD_FROM_QUEUE,
            }).pipe(delay(cardTransitionDuration + humanDelay))
          : EMPTY,
        owner === 'player'
          ? of<RootActionType>({
              type: CHECK_SURRENDER,
            }).pipe(delay(0))
          : EMPTY,
      ).pipe(takeUntil(action$.pipe(ofType(ABORT_ALL))))
    }),
  )
