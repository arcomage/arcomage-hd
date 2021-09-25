import { FormFieldsAllPartialType, FormFieldsType } from '../types/formFields'
import {
  PersonStatusType,
  SettingsStateAllPartialType,
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

export const getAllCondAndOtherSettingsArray = (
  settings: SettingsType | SettingsStateType | Partial<FormFieldsType>,
) => {
  return [
    settings.tower,
    settings.wall,
    settings.bricks,
    settings.gems,
    settings.recruits,
    settings.brickProd,
    settings.gemProd,
    settings.recruitProd,
    settings.winTower,
    settings.winResource,
    settings.cardsInHand,
  ]
}

export const allCondAndOtherSettingsEqual = (
  settings1: SettingsStateAllPartialType | FormFieldsAllPartialType,
  settings2: SettingsStateAllPartialType | FormFieldsAllPartialType,
): boolean =>
  settings1.tower === settings2.tower &&
  settings1.wall === settings2.wall &&
  settings1.brickProd === settings2.brickProd &&
  settings1.gemProd === settings2.gemProd &&
  settings1.recruitProd === settings2.recruitProd &&
  settings1.bricks === settings2.bricks &&
  settings1.gems === settings2.gems &&
  settings1.recruits === settings2.recruits &&
  settings1.winTower === settings2.winTower &&
  settings1.winResource === settings2.winResource &&
  settings1.cardsInHand === settings2.cardsInHand
