import { RECEIVE, RECEIVE_WITH_LATENCY } from '../../constants/ActionTypes'
import { RootActionType } from '../../types/actionObj'
import { filter, mergeMap, delay } from 'rxjs/operators'
import { Observable, of } from 'rxjs'
import { isOfType } from 'typesafe-actions'
import { StateObservable } from 'redux-observable'
import { RootStateType } from '../../types/state'
import { noLatency, testLatency } from '../../constants/devSettings'
import { randomIntFrom } from '../../utils/random'
import devLog from '../../utils/devLog'

export default (
  action$: Observable<RootActionType>,
  state$: StateObservable<RootStateType>,
) =>
  action$.pipe(
    filter(isOfType(RECEIVE_WITH_LATENCY)),
    mergeMap((action) => {
      const latency = noLatency
        ? 0
        : randomIntFrom(testLatency[0], testLatency[1])
      devLog(`received before latency: ${action.data}`, 'note')
      devLog(`latency simulated: ${latency}`, 'note')
      const { type, ...rest } = action
      return of<RootActionType>({
        type: RECEIVE,
        ...rest,
      }).pipe(delay(latency))
    }),
  )

// this epic is for latency test
