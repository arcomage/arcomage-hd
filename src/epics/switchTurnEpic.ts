import {
  SWITCH_TURN_MAIN,
  SWITCH_LOCK,
  SWITCH_TURN,
  DRAW_CARD,
} from '../constants/ActionTypes'
import { ActionType } from '../types/actionObj'
import {
  map,
  withLatestFrom,
  filter,
  mergeMap,
  delay,
  concatMap,
} from 'rxjs/operators'
import { isOfType } from 'typesafe-actions'
import { ActionsObservable, StateObservable } from 'redux-observable'
import { StateType } from '../types/state'
import { entries } from '../utils/typeHelpers'
import dataCards from '../data/cards'
import { concat, interval, merge, Observable, of } from 'rxjs'
import playSound from '../utils/playSound'
import { randomWithProbs } from '../utils/randomWithProbs'

export const switchTurnEpic = (
  action$: ActionsObservable<ActionType>,
  state$: StateObservable<StateType>,
) =>
  action$.pipe(
    filter(isOfType(SWITCH_TURN)),
    withLatestFrom(state$),
    mergeMap(([action, state]) => {
      const newCardN = randomWithProbs()
      return merge(
        of({
          type: SWITCH_TURN_MAIN,
        }),
        of({
          type: SWITCH_LOCK,
        }),
        of({
          type: DRAW_CARD,
          n: newCardN,
          position:
            state.cards.nextPos[state.game.playersTurn ? 'opponent' : 'player'],
          owner: state.game.playersTurn ? 'opponent' : 'player',
        }),
      )
    }),
  )

export default switchTurnEpic
