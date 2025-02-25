import { combineEpics, Epic } from 'redux-observable'
import { RootActionType } from '@/types/actionObj'
import { RootStateType } from '@/types/state'
import aiPlayCardEpic from './cards/aiPlayCardEpic'
import checkUnusableEpic from './cards/checkUnusableEpic'
import clearCardEpic from './cards/clearCardEpic'
import discardCardCoreEpic from './cards/discardCardCoreEpic'
import discardCardEpic from './cards/discardCardEpic'
import drawCardCoreEpic from './cards/drawCardCoreEpic'
import drawCardEpic from './cards/drawCardEpic'
import drawCardFromQueueEpic from './cards/drawCardFromQueueEpic'
import drawCardToQueueEpic from './cards/drawCardToQueueEpic'
import execCardEpic from './cards/execCardEpic'
import initFromQueueEpic from './cards/initFromQueueEpic'
import initToQueueEpic from './cards/initToQueueEpic'
import moveCardToTopEpic from './cards/moveCardToTopEpic'
import playCardCoreGuardedEpic from './cards/playCardCoreGuardedEpic'
import playCardFromQueueEpic from './cards/playCardFromQueueEpic'
import playCardToQueueEpic from './cards/playCardToQueueEpic'
import useCardCoreEpic from './cards/useCardCoreEpic'
import useCardEpic from './cards/useCardEpic'
import checkSurrenderEpic from './game_general/checkSurrenderEpic'
import checkVictoryEpic from './game_general/checkVictoryEpic'
import initCoreEpic from './game_general/initCoreEpic'
import initEpic from './game_general/initEpic'
import nextRoundEpic from './game_general/nextRoundEpic'
import connectionListenEpic from './multiplayer/connectionListenEpic'
import connectToIdEpic from './multiplayer/connectToIdEpic'
import connectToNetworkEpic from './multiplayer/connectToNetworkEpic'
import disconnectEpic from './multiplayer/disconnectEpic'
import peerListenEpic from './multiplayer/peerListenEpic'
import receiveEpic from './multiplayer/receiveEpic'
import receiveWithLatencyEpic from './multiplayer/receiveWithLatencyEpic'
import sendEpic from './multiplayer/sendEpic'
import sendNameEpic from './multiplayer/sendNameEpic'
import sendSettingsEpic from './multiplayer/sendSettingsEpic'
import sendTempSettingsEpic from './multiplayer/sendTempSettingsEpic'
import switchMultiplayerModeEpic from './multiplayer/switchMultiplayerModeEpic'
import closeScreenEndInitEpic from './screen/closeScreenEndInitEpic'
import screenEndEpic from './screen/screenEndEpic'
import readlsUpdatestoreInitEpic from './settings_lang_etc/readlsUpdatestoreInitEpic'
import updateAiEpic from './settings_lang_etc/updateAiEpic'
import updateBoldfontEpic from './settings_lang_etc/updateBoldfontEpic'
import updateErathianEpic from './settings_lang_etc/updateErathianEpic'
import updateLangEpic from './settings_lang_etc/updateLangEpic'
import updateNoanimEpic from './settings_lang_etc/updateNoanimEpic'
import updatePixelationEpic from './settings_lang_etc/updatePixelationEpic'
import updateSettingsEpic from './settings_lang_etc/updateSettingsEpic'
import updateSettingsInitEpic from './settings_lang_etc/updateSettingsInitEpic'
import updateStereoEpic from './settings_lang_etc/updateStereoEpic'
import updateVisualvaluesEpic from './settings_lang_etc/updateVisualvaluesEpic'
import updateVolumeEpic from './settings_lang_etc/updateVolumeEpic'
import resourceProdEpic from './status/resourceProdEpic'
import updateStatusEpic from './status/updateStatusEpic'

export type MyEpic = Epic<RootActionType, RootActionType, RootStateType>

const rootEpic: MyEpic = combineEpics(
  updateLangEpic,
  updateBoldfontEpic,
  updateErathianEpic,
  updateVolumeEpic,
  updateStereoEpic,
  updateNoanimEpic,
  updatePixelationEpic,
  updateVisualvaluesEpic,
  updateAiEpic,
  updateSettingsEpic,
  updateStatusEpic,
  execCardEpic,
  useCardEpic,
  playCardToQueueEpic,
  playCardFromQueueEpic,
  playCardCoreGuardedEpic,
  useCardCoreEpic,
  discardCardEpic,
  discardCardCoreEpic,
  moveCardToTopEpic,
  updateSettingsInitEpic,
  readlsUpdatestoreInitEpic,
  initEpic,
  initCoreEpic,
  initToQueueEpic,
  initFromQueueEpic,
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
  closeScreenEndInitEpic,
  aiPlayCardEpic,
  checkSurrenderEpic,
  switchMultiplayerModeEpic,
  connectToNetworkEpic,
  disconnectEpic,
  connectToIdEpic,
  connectionListenEpic,
  peerListenEpic,
  sendEpic,
  sendNameEpic,
  sendSettingsEpic,
  sendTempSettingsEpic,
  receiveWithLatencyEpic,
  receiveEpic,
)

export default rootEpic
