import { SettingsStateType, SettingsType, StatusType } from '../types/state'
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
  // aiType: 'Random',
}

export const defaultStatus: StatusType = {
  player: getStartState(defaultSettings),
  opponent: getStartState(defaultSettings),
}

export const defaultPlayerName = '🧝'
export const defaultOpponentName = '👾'

export const defaultVolume = 10

export const defaultErathian = false

export const defaultSettingState: SettingsStateType = {
  playerName: defaultPlayerName,
  opponentName: defaultOpponentName,
  ...defaultSettings,
  cardsInHand: defaultSettings.cardsInHand,
  // aiType: defaultSettings.aiType,
}
