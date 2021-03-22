import {
  DRAW_CARD,
  DRAW_CARD_PRE,
  DRAW_CARD_MAIN,
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
    filter(isOfType(DRAW_CARD)),
    mergeMap((action) => {
      const { n, position, owner } = action
      return merge(
        new Observable(() => {
          setTimeout(() => {
            playSound('deal')
          }, 10)
        }),
        of({
          type: DRAW_CARD_PRE,
          n,
        }),
        of({
          type: DRAW_CARD_MAIN,
          position,
          owner,
        }).pipe(delay(10)),
      )
    }),
  )

export default switchTurnEpic
