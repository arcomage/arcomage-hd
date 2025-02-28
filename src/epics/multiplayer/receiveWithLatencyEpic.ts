import { ofType, StateObservable } from 'redux-observable'
import { Observable, of } from 'rxjs'
import { mergeMap, delay } from 'rxjs/operators'
import { RECEIVE, RECEIVE_WITH_LATENCY } from '@/constants/ActionTypes'
import { noLatency, testLatency } from '@/constants/devSettings'
import { RootActionType } from '@/types/actionObj'
import { RootStateType } from '@/types/state'
import devLog from '@/utils/devLog'
import { randomIntFrom } from '@/utils/random'

export default (
  action$: Observable<RootActionType>,
  state$: StateObservable<RootStateType>,
) =>
  action$.pipe(
    ofType(RECEIVE_WITH_LATENCY),
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
