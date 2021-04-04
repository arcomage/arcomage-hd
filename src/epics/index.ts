import { RootActionType } from '../types/actionObj'
import { combineEpics, Epic } from 'redux-observable'
import { RootStateType } from '../types/state'
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
import screenEndEpic from './screenEndEpic'
import aiUseCardEpic from './aiUseCardEpic'
import checkSurrenderEpic from './checkSurrenderEpic'

export type MyEpic = Epic<RootActionType, RootActionType, RootStateType>

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
  screenEndEpic,
  aiUseCardEpic,
  checkSurrenderEpic,
)

export default rootEpic
