import { ActionType } from '../types/actionObj'
import { combineEpics, Epic } from 'redux-observable'
import { StateType } from '../types/state'
import updateStatusEpic from './updateStatusEpic'
import execCardEpic from './execCardEpic'
import useCardEpic from './useCardEpic'
import discardCardEpic from './discardCardEpic'
import moveCardToTopEpic from './moveCardToTopEpic'
import changeSettingsAndInitEpic from './changeSettingsAndInitEpic'
import initEpic from './initEpic'
import nextRoundEpic from './nextRoundEpic'
import drawCardEpic from './drawCardEpic'
import resourceProdEpic from './resourceProdEpic'
import clearCardEpic from './clearCardEpic'
import checkUnusableEpic from './checkUnusableEpic'
import checkVictoryEpic from './checkVictoryEpic'

export type MyEpic = Epic<ActionType, ActionType, StateType>

const rootEpic: MyEpic = combineEpics(
  updateStatusEpic,
  execCardEpic,
  useCardEpic,
  discardCardEpic,
  moveCardToTopEpic,
  changeSettingsAndInitEpic,
  initEpic,
  drawCardEpic,
  nextRoundEpic,
  resourceProdEpic,
  clearCardEpic,
  checkUnusableEpic,
  checkVictoryEpic,
)

export default rootEpic
