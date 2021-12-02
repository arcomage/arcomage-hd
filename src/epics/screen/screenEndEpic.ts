import {
  ABORT_ALL,
  SCREEN_END,
  SCREEN_END_MAIN,
} from '../../constants/ActionTypes'
import { RootActionType } from '../../types/actionObj'
import { withLatestFrom, filter, mergeMap } from 'rxjs/operators'
import { isOfType } from 'typesafe-actions'
import { StateObservable } from 'redux-observable'
import { isEndScreenNoCloseState, RootStateType } from '../../types/state'
import { concat, Observable, of } from 'rxjs'
import { Sound } from '../../utils/Sound'

const soundMap = { lose: 'defeat', tie: 'victory', win: 'victory' } as const

export default (
  action$: Observable<RootActionType>,
  state$: StateObservable<RootStateType>,
) =>
  action$.pipe(
    filter(isOfType(SCREEN_END)),
    withLatestFrom(state$),
    mergeMap(([action, state]) => {
      const { payload } = action
      if (isEndScreenNoCloseState(payload)) {
        Sound.play(soundMap[payload.type])
      }
      return concat(
        of<RootActionType>({
          type: ABORT_ALL,
        }),
        of<RootActionType>({
          type: SCREEN_END_MAIN,
          payload,
        }),
      )
    }),
  )
