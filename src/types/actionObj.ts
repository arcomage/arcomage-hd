import {
  UPDATE_LANG,
  UPDATE_LANG_MAIN,
  UPDATE_ERATHIAN,
  UPDATE_ERATHIAN_MAIN,
  UPDATE_VOLUME,
  UPDATE_VOLUME_MAIN,
  UPDATE_STATUS,
  UPDATE_STATUS_MAIN,
  EXEC_CARD,
  USE_CARD,
  PLAY_CARD_TO_QUEUE,
  PLAY_CARD_FROM_QUEUE,
  PLAY_CARD_CORE_GUARDED,
  USE_CARD_CORE,
  MOVE_CARD_TO_CENTER,
  MOVE_CARD_TO_TOP,
  MOVE_CARD_TO_TOP_MAIN,
  CLEAR_CARD,
  DELETE_CARD,
  NEXT_ROUND,
  SWITCH_LOCK,
  REMOVE_CARD,
  DISCARD_CARD,
  DISCARD_CARD_CORE,
  ADD_DISCARDED_TAG,
  UPDATE_SETTINGS,
  UPDATE_SETTINGS_MAIN,
  INIT,
  INIT_CORE,
  INIT_TO_QUEUE,
  INIT_FROM_QUEUE,
  UPDATE_SETTINGS_INIT,
  READLS_UPDATESTORE_INIT,
  INIT_CARD,
  INIT_GAME,
  INIT_STATUS,
  DRAW_CARD,
  DRAW_CARD_TO_QUEUE,
  DRAW_CARD_FROM_QUEUE,
  DRAW_CARD_CORE,
  SWITCH_TURN,
  DRAW_CARD_MAIN,
  DRAW_CARD_PRE,
  RESOURCE_PROD,
  SWITCH_DISCARD_MODE,
  MOVE_CARD_TO_STACK,
  SET_ZERO_OPACITY,
  CHECK_UNUSABLE,
  SET_UNUSABLE,
  SWITCH_NEW_TURN,
  SCREEN_PREF,
  SCREEN_LANG_PREF,
  SCREEN_VOLUME_PREF,
  SCREEN_END,
  SCREEN_END_MAIN,
  CLOSE_SCREEN_END_INIT,
  SCREEN_HELP,
  SCREEN_LANDSCAPE,
  SCREEN_DISCONNECT_NOTICE,
  CHECK_VICTORY,
  AI_PLAY_CARD,
  CHECK_SURRENDER,
  ABORT_ALL,
  ABORT_CONNECTION,
  SWITCH_MULTIPLAYER_MODE,
  SWITCH_MULTIPLAYER_MODE_MAIN,
  CONNECT_TO_NETWORK,
  SET_YOUR_ID,
  DISCONNECT,
  CONNECT_TO_ID,
  SET_OPPONENT_ID,
  MULTIPLAYER_STATUS,
  SET_TEMP_SETTINGS,
  SET_TEMP_PLAYER_NAME,
  SET_TEMP_OPPONENT_NAME,
  SET_MULTI_GAME_NUMBER,
  CONNECTION_LISTEN,
  PEER_LISTEN,
  SEND,
  SEND_SETTINGS,
  SEND_NAME,
  SEND_TEMP_SETTINGS,
  ABORT_SEND_TEMP_SETTINGS,
  RECEIVE_WITH_LATENCY,
  RECEIVE,
} from '../constants/ActionTypes'
import { AvailableLangType } from '../i18n/types'
import {
  CardListItemAllType,
  CardStateType,
  EndScreenStateType,
  MultiplayerStatusType,
  ownerType2,
  PersonStatusType,
  SettingsStateType,
  SettingsStateAllPartialType,
  SettingsType,
} from '../types/state'
import { InstructionConnDataType } from './connData'
import { FormFieldsAllPartialType, FormFieldsType } from './formFields'

export type UpdateLangActionType = {
  type: typeof UPDATE_LANG
  lang: AvailableLangType
}

export type UpdateLangMainActionType = {
  type: typeof UPDATE_LANG_MAIN
  lang: AvailableLangType
}

export type UpdateErathianActionType = {
  type: typeof UPDATE_ERATHIAN
  erathian: boolean
}

export type UpdateErathianMainActionType = {
  type: typeof UPDATE_ERATHIAN_MAIN
  erathian: boolean
}

export type UpdateVolumeActionType = {
  type: typeof UPDATE_VOLUME
  volume: number
}

export type UpdateVolumeMainActionType = {
  type: typeof UPDATE_VOLUME_MAIN
  volume: number
}

export type UpdateStatusActionTypeSingle = {
  isPlayer: boolean
  statusProp: keyof PersonStatusType
  noSound?: boolean
} & (
  | {
      to: number
    }
  | {
      diff: number
    }
)

export type UpdateStatusMainActionTypeSingle = {
  isPlayer: boolean
  statusProp: keyof PersonStatusType
} & (
  | {
      to: number
    }
  | {
      diff: number
    }
)

export type UpdateStatusActionType = {
  type: typeof UPDATE_STATUS
  payload: UpdateStatusActionTypeSingle[]
}

export type UpdateStatusMainActionType = {
  type: typeof UPDATE_STATUS_MAIN
  payload: UpdateStatusMainActionTypeSingle[]
}

export type ExecCardActionType = {
  type: typeof EXEC_CARD
  n: number
  owner: ownerType2
}

export type UseCardActionType = {
  type: typeof USE_CARD
  n: number
  index: number
  position: number
  owner: ownerType2
}

export type PlayCardToQueueActionType = {
  type: typeof PLAY_CARD_TO_QUEUE
  payload: UseCardCoreActionType | DiscardCardCoreActionType
  gameNumber?: number
}

export type PlayCardFromQueueActionType = {
  type: typeof PLAY_CARD_FROM_QUEUE
}

export type PlayCardCoreGuardedActionType = {
  type: typeof PLAY_CARD_CORE_GUARDED
  payload: UseCardCoreActionType | DiscardCardCoreActionType
}

export type UseCardCoreActionType = {
  type: typeof USE_CARD_CORE
  n: number
  index: number
  position: number
  owner: ownerType2
}

export type DrawCardActionType = {
  type: typeof DRAW_CARD
}

export type DrawCardToQueueActionType = {
  type: typeof DRAW_CARD_TO_QUEUE
  n: number
  gameNumber?: number
}

export type DrawCardFromQueueActionType = {
  type: typeof DRAW_CARD_FROM_QUEUE
}

export type DrawCardCoreActionType = {
  type: typeof DRAW_CARD_CORE
  n: number
}

export type DrawCardPreActionType = {
  type: typeof DRAW_CARD_PRE
  n: number
}

export type DrawCardMainActionType = {
  type: typeof DRAW_CARD_MAIN
  owner: ownerType2
}

export type ClearCardActionType = {
  type: typeof CLEAR_CARD
}

export type MoveCardToStackActionType = {
  type: typeof MOVE_CARD_TO_STACK
  index: number
}

export type SetZeroOpacityActionType = {
  type: typeof SET_ZERO_OPACITY
  index: number
}

export type MoveCardToCenterActionType = {
  type: typeof MOVE_CARD_TO_CENTER
  index: number
}

export type MoveCardToTopActionType = {
  type: typeof MOVE_CARD_TO_TOP
  index: number
}

export type MoveCardToTopMainActionType = {
  type: typeof MOVE_CARD_TO_TOP_MAIN
  index: number
  toPosition: number
}

export type DiscardCardActionType = {
  type: typeof DISCARD_CARD
  index: number
  position: number
  owner: ownerType2
}

export type DiscardCardCoreActionType = {
  type: typeof DISCARD_CARD_CORE
  index: number
  position: number
  owner: ownerType2
}

export type AddDiscardedTagActionType = {
  type: typeof ADD_DISCARDED_TAG
  index: number
}

export type RemoveCardActionType = {
  type: typeof REMOVE_CARD
  index: number
  position: number
  owner: ownerType2
}

export type DeleteCardInStackActionType = {
  type: typeof DELETE_CARD
  index: number
}

export type NextRoundActionType = {
  type: typeof NEXT_ROUND
}

export type ResourceProdActionType = {
  type: typeof RESOURCE_PROD
  owner: ownerType2
}

export type SwitchTurnActionType = {
  type: typeof SWITCH_TURN
}

export type SwitchLockActionType = {
  type: typeof SWITCH_LOCK
  on: boolean
  locknumber?: 0 | 1
}

export type UpdateSettingsActionType = {
  type: typeof UPDATE_SETTINGS
  payload: SettingsStateAllPartialType
}

export type UpdateSettingsMainActionType = {
  type: typeof UPDATE_SETTINGS_MAIN
  payload: SettingsStateAllPartialType
}

export type InitActionType = {
  type: typeof INIT
  forceGuestInit?: boolean
}

export type InitCoreActionType = {
  type: typeof INIT_CORE
  playersTurn: boolean
  cardList: CardListItemAllType[]
  gameNumber: number | null
}

export type InitToQueueActionType = {
  type: typeof INIT_TO_QUEUE
  playersTurn: boolean
  cardList: CardListItemAllType[]
  gameNumber: number | null
}

export type InitFromQueueActionType = {
  type: typeof INIT_FROM_QUEUE
}

export type InitCardActionType = {
  type: typeof INIT_CARD
  payload: CardStateType
}

export type InitGameActionType = {
  type: typeof INIT_GAME
  playersTurn: boolean
}

export type InitStatusActionType = {
  type: typeof INIT_STATUS
  payload: PersonStatusType
}

export type UpdateSettingsInitActionType = {
  type: typeof UPDATE_SETTINGS_INIT
  payload: SettingsStateType
}

export type ReadlsUpdatestoreInitActionType = {
  type: typeof READLS_UPDATESTORE_INIT
}

export type SwitchDiscardModeActionType = {
  type: typeof SWITCH_DISCARD_MODE
  on: boolean
}

export type CheckUnusableActionType = {
  type: typeof CHECK_UNUSABLE
  lastOnly?: boolean // if true then only check last card, if false or not present then check all card
}

export type SetUnusableActionType = {
  type: typeof SET_UNUSABLE
  unusables: number[]
  usables: number[]
}

export type SwitchNewTurnActionType = {
  type: typeof SWITCH_NEW_TURN
  on: boolean
}

export type CheckVictoryActionType = {
  type: typeof CHECK_VICTORY
}

export type ScreenPrefActionType = {
  type: typeof SCREEN_PREF
  show: boolean
}

export type ScreenLangPrefActionType = {
  type: typeof SCREEN_LANG_PREF
  show: boolean
}

export type ScreenVolumePrefActionType = {
  type: typeof SCREEN_VOLUME_PREF
  show: boolean
}

export type ScreenHelpActionType = {
  type: typeof SCREEN_HELP
  show: boolean
}

export type ScreenLandscapeActionType = {
  type: typeof SCREEN_LANDSCAPE
  show: boolean
}

export type ScreenDisconnectNoticeActionType = {
  type: typeof SCREEN_DISCONNECT_NOTICE
  show: boolean
}

export type ScreenEndActionType = {
  type: typeof SCREEN_END
  payload: EndScreenStateType
}

export type ScreenEndMainActionType = {
  type: typeof SCREEN_END_MAIN
  payload: EndScreenStateType
}

export type CloseScreenEndInitMainActionType = {
  type: typeof CLOSE_SCREEN_END_INIT
}

export type AiPlayCardActionType = {
  type: typeof AI_PLAY_CARD
}

export type CheckSurrenderActionType = {
  type: typeof CHECK_SURRENDER
}

export type AbortAllActionType = {
  type: typeof ABORT_ALL
}

export type AbortConnectionActionType = {
  type: typeof ABORT_CONNECTION
}

export type SwitchMultiplayerModeActionType = {
  type: typeof SWITCH_MULTIPLAYER_MODE
  on: boolean
}

export type SwitchMultiplayerModeMainActionType = {
  type: typeof SWITCH_MULTIPLAYER_MODE_MAIN
  on: boolean
}

export type ConnectToNetworkActionType = {
  type: typeof CONNECT_TO_NETWORK
}

export type ConnectToIdActionType = {
  type: typeof CONNECT_TO_ID
  id: string
}

export type SetYourIdActionType = {
  type: typeof SET_YOUR_ID
  id: string
}

export type DisconnectActionType = {
  type: typeof DISCONNECT
}

export type SetOpponentIdActionType = {
  type: typeof SET_OPPONENT_ID
  id: string
}

export type SetMultiplayerStatusActionType = {
  type: typeof MULTIPLAYER_STATUS
  status: MultiplayerStatusType
}

export type SetTempSettingsActionType = {
  type: typeof SET_TEMP_SETTINGS
  payload: SettingsType
}

export type SetTempPlayerNameActionType = {
  type: typeof SET_TEMP_PLAYER_NAME
  name: string
}

export type SetTempOpponentNameActionType = {
  type: typeof SET_TEMP_OPPONENT_NAME
  name: string
}

export type SetMultiGameNumberActionType = {
  type: typeof SET_MULTI_GAME_NUMBER
  n: number
}

export type ConnectionListenActionType = {
  type: typeof CONNECTION_LISTEN
  host: boolean
}

export type PeerListenActionType = {
  type: typeof PEER_LISTEN
}

export type SendActionType = {
  type: typeof SEND
} & InstructionConnDataType

export type SendSettingsActionType = {
  type: typeof SEND_SETTINGS
  payload: SettingsType
}

export type SendNameActionType = {
  type: typeof SEND_NAME
  name: string
}

export type SendTempSettingsActionType = {
  type: typeof SEND_TEMP_SETTINGS
  payload: SettingsType
}

export type AbortSendTempSettingsActionType = {
  type: typeof ABORT_SEND_TEMP_SETTINGS
}

export type ReceiveWithLatencyActionType = {
  type: typeof RECEIVE_WITH_LATENCY
  data: string
}

export type ReceiveActionType = {
  type: typeof RECEIVE
  data: string
}

export type RootActionType =
  | UpdateLangActionType
  | UpdateLangMainActionType
  | UpdateErathianActionType
  | UpdateErathianMainActionType
  | UpdateVolumeActionType
  | UpdateVolumeMainActionType
  | UpdateStatusActionType
  | UpdateStatusMainActionType
  | ExecCardActionType
  | UseCardActionType
  | PlayCardToQueueActionType
  | PlayCardFromQueueActionType
  | PlayCardCoreGuardedActionType
  | UseCardCoreActionType
  | DrawCardActionType
  | DrawCardToQueueActionType
  | DrawCardFromQueueActionType
  | DrawCardCoreActionType
  | DrawCardPreActionType
  | DrawCardMainActionType
  | ClearCardActionType
  | MoveCardToStackActionType
  | SetZeroOpacityActionType
  | MoveCardToCenterActionType
  | MoveCardToTopActionType
  | MoveCardToTopMainActionType
  | DiscardCardActionType
  | DiscardCardCoreActionType
  | AddDiscardedTagActionType
  | RemoveCardActionType
  | DeleteCardInStackActionType
  | NextRoundActionType
  | ResourceProdActionType
  | SwitchTurnActionType
  | SwitchLockActionType
  | UpdateSettingsActionType
  | UpdateSettingsMainActionType
  | InitActionType
  | InitCoreActionType
  | InitToQueueActionType
  | InitFromQueueActionType
  | InitCardActionType
  | InitGameActionType
  | InitStatusActionType
  | UpdateSettingsInitActionType
  | ReadlsUpdatestoreInitActionType
  | SwitchDiscardModeActionType
  | CheckUnusableActionType
  | SetUnusableActionType
  | SwitchNewTurnActionType
  | CheckVictoryActionType
  | ScreenPrefActionType
  | ScreenLangPrefActionType
  | ScreenVolumePrefActionType
  | ScreenHelpActionType
  | ScreenLandscapeActionType
  | ScreenDisconnectNoticeActionType
  | ScreenEndActionType
  | ScreenEndMainActionType
  | CloseScreenEndInitMainActionType
  | AiPlayCardActionType
  | CheckSurrenderActionType
  | AbortAllActionType
  | AbortConnectionActionType
  | SwitchMultiplayerModeActionType
  | SwitchMultiplayerModeMainActionType
  | ConnectToNetworkActionType
  | ConnectToIdActionType
  | SetYourIdActionType
  | DisconnectActionType
  | SetOpponentIdActionType
  | SetMultiplayerStatusActionType
  | SetTempSettingsActionType
  | SetTempPlayerNameActionType
  | SetTempOpponentNameActionType
  | SetMultiGameNumberActionType
  | ConnectionListenActionType
  | PeerListenActionType
  | SendActionType
  | SendSettingsActionType
  | SendNameActionType
  | SendTempSettingsActionType
  | AbortSendTempSettingsActionType
  | ReceiveWithLatencyActionType
  | ReceiveActionType
