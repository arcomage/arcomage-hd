import {
  SettingsStateType,
  SettingsType,
  StatusType,
  VisualValuesType,
} from '../types/state'
import { getStartState } from '../utils/startWinState'

export const defaultSettings: SettingsType = {
  // name: 'default',
  tower: 20,
  wall: 10,
  brickProd: 2,
  gemProd: 2,
  recruitProd: 2,
  bricks: 5,
  gems: 5,
  recruits: 5,
  winTower: 50,
  winResource: 100,
  cardsInHand: 5,
}

export const defaultStatus: StatusType = {
  player: getStartState(defaultSettings),
  opponent: getStartState(defaultSettings),
}

// prettier-ignore
export const defaultPlayerNameList = [
  '😎', '🤣', '😃', '😂', '🧐', '🤓', '🦄', '🧝', '🧙', '🧚', '👶', '💂', '🤴', '👸', '👨', '👩', '🚶', '🦸', '😺', '🐶', '🐼',
]
// prettier-ignore
export const defaultOpponentNameList = [
  '😈', '💀', '🤬', '💩', '🤡', '👹', '👺', '👻', '👽', '👾', '🧛', '🦹', '🤖', '💻', '📱', '🧟', '🧞', '🎃', '🦁', '🐯', '🐍',
]

// Usage:
// sample(defaultPlayerNameList)
// sample(defaultOpponentNameList)

const defaultPlayerName = ''
const defaultOpponentName = ''

export const defaultErathian = false

export const defaultVolume = 5
export const defaultStereo = true

export const defaultPixelation = 0

export const defaultVisualvalues: VisualValuesType = {
  brightness: 1,
  contrast: 1,
  grayscale: 0,
  sepia: 0,
  saturate: 1,
  hue: 0,
  invert: 0,
  opacity: 1,
  twist: false,
  grain: false,
}

export const defaultAiLevel = 0 // 0 to 4; 0 is the smartest, 4 is the easiest

export const defaultSettingState: SettingsStateType = {
  playerName: defaultPlayerName,
  opponentName: defaultOpponentName,
  ...defaultSettings,
  cardsInHand: defaultSettings.cardsInHand,
}
