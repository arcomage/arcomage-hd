import { AvailableLangType } from '../i18n/types'

export type PersonStatusType = {
  bricks: number
  gems: number
  recruits: number
  brickProd: number
  gemProd: number
  recruitProd: number
  tower: number
  wall: number
}

export type StatusType = {
  player: PersonStatusType
  opponent: PersonStatusType
}

export type ownerType2 = 'player' | 'opponent'

export type ownerType = 'player' | 'opponent' | 'common'

export type CardListItemType = {
  position: number // 0, 1, ... at bottom; -5 at center; -1, -2, -3, -4 at top
  n: number // -1 is cardback, other number is No. of the card
  unusable: boolean // translucent
  discarded: boolean
  isFlipped: boolean // this one is for 3D visual effect. use n: -1 to represent non-flippable cardback state
  zeroOpacity: boolean // this one is only useful when the card is moved to the stack and about to be deleted
  owner: ownerType
}

export type CardListItemAllType = CardListItemType | null

export type CardTotalType = {
  player: number
  opponent: number
}

export type CardNextPosType = CardTotalType

export type CardStateType = {
  total: CardTotalType
  list: CardListItemAllType[]
  nextPos: CardNextPosType
}

export type GameStateType = {
  playersTurn: boolean
  locked: [boolean, boolean]
  discardMode: boolean
  isNewTurn: boolean
}

export type WinSettingsType = {
  winTower: number
  winResource: number
}

export type SettingsType = PersonStatusType &
  WinSettingsType & {
    cardsInHand: number
    // aiType?: number
  }

export type SettingsStateNameType = {
  playerName: string
  opponentName: string
}

export type SettingsStateType = SettingsType & SettingsStateNameType

export type SettingsStateAllPartialType = Partial<SettingsStateType>

export type EndScreenStateType = {
  type: 'win' | 'tie' | 'lose' | null // null = close screen
  surrender?: boolean
}

export type EndScreenNoCloseStateType = {
  type: 'win' | 'tie' | 'lose'
  surrender?: boolean
}

export const isEndScreenNoCloseState = (
  state: EndScreenStateType,
): state is EndScreenNoCloseStateType => state.type !== null

export type ScreenStateType = {
  pref: boolean
  langPref: boolean
  volumePref: boolean
  help: boolean
  landscape: boolean
  disconnectNotice: boolean
  end: EndScreenStateType
}

export type LangStateType = {
  code: AvailableLangType
  erathian: boolean
}

export type VisualStateType = {
  pixelated: number
}

export type AiStateType = {
  aiType: number // 0 - 4
}

export type MultiplayerStatusType =
  | 'disconnected'
  | 'connecting_net'
  | 'connected_net'
  | 'connecting_to_id'
  | 'connected_to_id'
  | 'connected_by_id'
  | 'failed'

export type MultiplayerStateType = {
  on: boolean
  yourId: string
  opponentId: string
  status: MultiplayerStatusType
  tempSettings: SettingsType
  tempPlayerName: string
  tempOpponentName: string
  gameNumber: number
}

export type RootStateType = {
  multiplayer: MultiplayerStateType
  lang: LangStateType
  status: StatusType
  cards: CardStateType
  game: GameStateType
  settings: SettingsStateType
  screen: ScreenStateType
  volume: number
  visual: VisualStateType
  ai: AiStateType
}

export type ExchangeStateType = {
  status: StatusType
  cards: CardStateType
  game: GameStateType
  settings: SettingsStateAllPartialType
}
