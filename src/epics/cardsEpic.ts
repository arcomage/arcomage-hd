import produce from 'immer'
import { UPDATE_LANG } from '../constants/ActionTypes'
// import {  } from '../types/actionObj'
import { StatusType } from '../types/state'
import { defaultCards } from '../constants/defaultCards'
import dataCards from '../data/cards'
import { mapTo } from 'rxjs/operators'
import { ofType, ActionsObservable } from 'redux-observable'

export const cardsEpic = (action$: ActionsObservable<any>) =>
  action$.pipe(ofType(UPDATE_LANG), mapTo({ type: UPDATE_LANG }))

export default cardsEpic
