import { RootActionType } from '../types/actionObj'
import { combineEpics, Epic } from 'redux-observable'
import { RootStateType } from '../types/state'

import updateLangEpic from './updateLangEpic'
import updateErathianEpic from './updateErathianEpic'
import updateVolumeEpic from './updateVolumeEpic'
import updateSettingsEpic from './updateSettingsEpic'
import updateStatusEpic from './updateStatusEpic'
import execCardEpic from './execCardEpic'
import useCardEpic from './useCardEpic'
import discardCardEpic from './discardCardEpic'
import moveCardToTopEpic from './moveCardToTopEpic'
import changeSettingsAndInitEpic from './changeSettingsAndInitEpic'
import readlsUpdatestoreInitEpic from './readlsUpdatestoreInitEpic'
import initEpic from './initEpic'
import drawCardEpic from './drawCardEpic'
import nextRoundEpic from './nextRoundEpic'
import resourceProdEpic from './resourceProdEpic'
import clearCardEpic from './clearCardEpic'
import checkUnusableEpic from './checkUnusableEpic'
import checkVictoryEpic from './checkVictoryEpic'
import screenEndEpic from './screenEndEpic'
import aiUseCardEpic from './aiUseCardEpic'
import checkSurrenderEpic from './checkSurrenderEpic'
import switchMultiplayerModeEpic from './switchMultiplayerModeEpic'
import getAndSetYourIdEpic from './getAndSetYourIdEpic'
import connectToAndSetOpponentIdEpic from './connectToAndSetOpponentIdEpic'

export type MyEpic = Epic<RootActionType, RootActionType, RootStateType>

const rootEpic: MyEpic = combineEpics(
  updateLangEpic,
  updateErathianEpic,
  updateVolumeEpic,
  updateSettingsEpic,
  updateStatusEpic,
  execCardEpic,
  useCardEpic,
  discardCardEpic,
  moveCardToTopEpic,
  changeSettingsAndInitEpic,
  readlsUpdatestoreInitEpic,
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
  switchMultiplayerModeEpic,
  getAndSetYourIdEpic,
  connectToAndSetOpponentIdEpic,
)

export default rootEpic
