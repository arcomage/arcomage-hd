import { SEND, SEND_STATE } from '../../constants/ActionTypes'
import { RootActionType } from '../../types/actionObj'
import { filter, withLatestFrom, map } from 'rxjs/operators'
import { isOfType } from 'typesafe-actions'
import { ActionsObservable, StateObservable } from 'redux-observable'
import { ExchangeStateType, RootStateType } from '../../types/state'
import reverseState from '../../utils/reverseState'

export default (
  action$: ActionsObservable<RootActionType>,
  state$: StateObservable<RootStateType>,
) =>
  action$.pipe(
    filter(isOfType(SEND_STATE)),
    withLatestFrom(state$),
    map(([action, state]) => {
      const { status, cards, game, settings } = state
      const exchangeState: ExchangeStateType = reverseState({
        status,
        cards,
        game,
        settings,
      })

      return {
        type: SEND,
        data: {
          type: 'INST_UPDATE_SETTINGS',
          payload: exchangeState,
        },
      }
    }),
  )
