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
import playCardToQueueEpic from './cards/playCardToQueueEpic'
import playCardFromQueueEpic from './cards/playCardFromQueueEpic'
import useCardCoreEpic from './cards/useCardCoreEpic'
import discardCardEpic from './cards/discardCardEpic'
import discardCardCoreEpic from './cards/discardCardCoreEpic'
import moveCardToTopEpic from './cards/moveCardToTopEpic'
import updateSettingsInitEpic from './settings_lang_etc/updateSettingsInitEpic'
import readlsUpdatestoreInitEpic from './settings_lang_etc/readlsUpdatestoreInitEpic'
import initEpic from './game_general/initEpic'
import initCoreEpic from './game_general/initCoreEpic'
import drawCardEpic from './cards/drawCardEpic'
import drawCardToQueueEpic from './cards/drawCardToQueueEpic'
import drawCardFromQueueEpic from './cards/drawCardFromQueueEpic'
import drawCardCoreEpic from './cards/drawCardCoreEpic'
import nextRoundEpic from './game_general/nextRoundEpic'
import resourceProdEpic from './status/resourceProdEpic'
import clearCardEpic from './cards/clearCardEpic'
import checkUnusableEpic from './cards/checkUnusableEpic'
import checkVictoryEpic from './game_general/checkVictoryEpic'
import screenEndEpic from './screen/screenEndEpic'
import aiPlayCardEpic from './cards/aiPlayCardEpic'
import checkSurrenderEpic from './game_general/checkSurrenderEpic'
import switchMultiplayerModeEpic from './multiplayer/switchMultiplayerModeEpic'
import connectToNetworkEpic from './multiplayer/connectToNetworkEpic'
import disconnectEpic from './multiplayer/disconnectEpic'
import connectToIdEpic from './multiplayer/connectToIdEpic'
import connectionListenEpic from './multiplayer/connectionListenEpic'
import peerListenEpic from './multiplayer/peerListenEpic'
import sendEpic from './multiplayer/sendEpic'
import sendSettingsEpic from './multiplayer/sendSettingsEpic'
import sendFormFieldsEpic from './multiplayer/sendFormFieldsEpic'
import receiveWithLatencyEpic from './multiplayer/receiveWithLatencyEpic'
import receiveEpic from './multiplayer/receiveEpic'

export type MyEpic = Epic<RootActionType, RootActionType, RootStateType>

const rootEpic: MyEpic = combineEpics(
  updateLangEpic,
  updateErathianEpic,
  updateVolumeEpic,
  updateSettingsEpic,
  updateStatusEpic,
  execCardEpic,
  useCardEpic,
  playCardToQueueEpic,
  playCardFromQueueEpic,
  useCardCoreEpic,
  discardCardEpic,
  discardCardCoreEpic,
  moveCardToTopEpic,
  updateSettingsInitEpic,
  readlsUpdatestoreInitEpic,
  initEpic,
  initCoreEpic,
  drawCardEpic,
  drawCardToQueueEpic,
  drawCardFromQueueEpic,
  drawCardCoreEpic,
  nextRoundEpic,
  resourceProdEpic,
  clearCardEpic,
  checkUnusableEpic,
  checkVictoryEpic,
  screenEndEpic,
  aiPlayCardEpic,
  checkSurrenderEpic,
  switchMultiplayerModeEpic,
  connectToNetworkEpic,
  disconnectEpic,
  connectToIdEpic,
  connectionListenEpic,
  peerListenEpic,
  sendEpic,
  sendSettingsEpic,
  sendFormFieldsEpic,
  receiveWithLatencyEpic,
  receiveEpic,
)

export default rootEpic
