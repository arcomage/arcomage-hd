import { ActionType } from '../types/actionObj'
import { catchError } from 'rxjs/operators'
import { Action } from 'redux'
import { combineEpics, Epic } from 'redux-observable'
import updateStatusEpic from './updateStatusEpic'
import execCardEpic from './execCardEpic'
import useCardEpic from './useCardEpic'
import discardCardEpic from './discardCardEpic'
import changeSettingsAndInitEpic from './changeSettingsAndInitEpic'
import initEpic from './initEpic'
import switchTurnEpic from './switchTurnEpic'
import drawCardEpic from './drawCardEpic'

export type MyEpic = Epic<Action<ActionType>, Action<ActionType>>

const rootEpic: MyEpic = (action$, store$, dependencies) =>
  combineEpics(
    updateStatusEpic,
    execCardEpic,
    useCardEpic,
    discardCardEpic,
    changeSettingsAndInitEpic,
    initEpic,
    drawCardEpic,
    switchTurnEpic,
  )(action$, store$, dependencies).pipe(
    catchError((error, source) => {
      console.error(error)
      return source
    }),
  )

export default rootEpic
