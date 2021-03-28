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
  isflipped: boolean // this one is for visual effect. use n: -1 for stable cardback state
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
  locked: boolean
  discardMode: boolean
  isNewTurn: boolean
}

export type WinSettingsType = {
  tower: number
  resource: number
}

export type SettingsBaseType = {
  start: PersonStatusType
  win: WinSettingsType
  cardsInHand: number
  aiType?: number
}

export type SettingsType = SettingsBaseType & {
  tavern?: string
  location?: string
}

export type SettingsStateType = SettingsBaseType & {
  playerName: string
  opponentName: string
}

export type ScreenStateType = {
  pref: boolean
  langPref: boolean
  volumePref: boolean
  help: boolean
  end: 1 | 0 | -1 | null // win | draw | lose | close screen
}

export type LangStateType = {
  code: AvailableLangType
  erathian: boolean
}

export type RootStateType = {
  lang: LangStateType
  status: StatusType
  cards: CardStateType
  game: GameStateType
  settings: SettingsStateType
  screen: ScreenStateType
  volume: number
}
