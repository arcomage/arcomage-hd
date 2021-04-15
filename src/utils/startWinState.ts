import {
  PersonStatusType,
  SettingsStateType,
  SettingsType,
  WinSettingsType,
} from '../types/state'

export const getStartState = (
  state: SettingsType | SettingsStateType,
): PersonStatusType => {
  const {
    tower,
    wall,
    brickProd,
    gemProd,
    recruitProd,
    bricks,
    gems,
    recruits,
  } = state
  return {
    tower,
    wall,
    brickProd,
    gemProd,
    recruitProd,
    bricks,
    gems,
    recruits,
  }
}

export const getWinState = (
  state: SettingsType | SettingsStateType,
): WinSettingsType => {
  const { winTower, winResource } = state
  return {
    winTower,
    winResource,
  }
}
