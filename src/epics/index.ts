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
import nextRoundEpic from './nextRoundEpic'
import drawCardEpic from './drawCardEpic'
import resourceProdEpic from './resourceProdEpic'
import moveCenterCardToTopEpic from './moveCenterCardToTopEpic'
import clearCardEpic from './clearCardEpic'
import { StateType } from '../types/state'

export type MyEpic = Epic<ActionType, ActionType, StateType>

const rootEpic: MyEpic = combineEpics(
  updateStatusEpic,
  execCardEpic,
  useCardEpic,
  discardCardEpic,
  changeSettingsAndInitEpic,
  initEpic,
  drawCardEpic,
  nextRoundEpic,
  resourceProdEpic,
  moveCenterCardToTopEpic,
  clearCardEpic,
)

export default rootEpic
