import { RootActionType } from '../types/actionObj'
import { combineEpics, Epic } from 'redux-observable'
import { RootStateType } from '../types/state'

import updateLangEpic from './settings_lang_etc/updateLangEpic'
import updateErathianEpic from './settings_lang_etc/updateErathianEpic'
import updateVolumeEpic from './settings_lang_etc/updateVolumeEpic'
import updateSettingsEpic from './settings_lang_etc/updateSettingsEpic'
import updateStatusEpic from './status/updateStatusEpic'
import execCardEpic from './cards/execCardEpic'
import useCardEpic from './cards/useCardEpic'
import discardCardEpic from './cards/discardCardEpic'
import moveCardToTopEpic from './cards/moveCardToTopEpic'
import changeSettingsAndInitEpic from './settings_lang_etc/changeSettingsAndInitEpic'
import readlsUpdatestoreInitEpic from './settings_lang_etc/readlsUpdatestoreInitEpic'
import initEpic from './game_general/initEpic'
import drawCardEpic from './cards/drawCardEpic'
import nextRoundEpic from './game_general/nextRoundEpic'
import resourceProdEpic from './status/resourceProdEpic'
import clearCardEpic from './cards/clearCardEpic'
import checkUnusableEpic from './cards/checkUnusableEpic'
import checkVictoryEpic from './game_general/checkVictoryEpic'
import screenEndEpic from './screen/screenEndEpic'
import aiUseCardEpic from './cards/aiUseCardEpic'
import checkSurrenderEpic from './game_general/checkSurrenderEpic'
import switchMultiplayerModeEpic from './multiplayer/switchMultiplayerModeEpic'
import getAndSetYourIdEpic from './multiplayer/getAndSetYourIdEpic'
import connectToAndSetOpponentIdEpic from './multiplayer/connectToAndSetOpponentIdEpic'

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
