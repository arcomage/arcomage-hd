import { RECEIVE } from '../../constants/ActionTypes'
import { RootActionType } from '../../types/actionObj'
import { filter, concatMap } from 'rxjs/operators'
import { EMPTY } from 'rxjs'
import { isOfType } from 'typesafe-actions'
import { ActionsObservable, StateObservable } from 'redux-observable'
import { RootStateType } from '../../types/state'

export default (
  action$: ActionsObservable<RootActionType>,
  state$: StateObservable<RootStateType>,
) =>
  action$.pipe(
    filter(isOfType(RECEIVE)),
    concatMap((action) => {
      const { data } = action
      const dataObj = JSON.parse(data)
      return EMPTY
    }),
  )
