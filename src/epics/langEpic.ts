import { UPDATE_LANG } from '../constants/ActionTypes'
import { LangActionType } from '../types/actionObj'
import { mapTo } from 'rxjs/operators'
import { ofType, ActionsObservable } from 'redux-observable'

export const langEpic = (action$: ActionsObservable<LangActionType>) =>
  action$.pipe(ofType(UPDATE_LANG), mapTo({ type: UPDATE_LANG }))

export default langEpic
