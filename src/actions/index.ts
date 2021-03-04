import * as types from '../constants/ActionTypes'

export const changeLang = (lang: string) => ({ type: types.CHANGE_LANG, lang })

export const changeResource = (
  isPlayer: boolean,
  increase: boolean,
  amount: number,
  resourceType: 0 | 1 | 2,
  visual?: boolean,
  sound?: boolean,
) => ({
  type: types.CHANGE_RESOURCE,
  increase,
  isPlayer,
  resourceType,
  amount,
  visual,
  sound,
})

export const changeProd = (
  isPlayer: boolean,
  increase: boolean,
  amount: number,
  resourceType: 0 | 1 | 2,
  visual: boolean = false,
  sound: boolean = false,
) => ({
  type: types.CHANGE_PROD,
  increase,
  isPlayer,
  resourceType,
  amount,
  visual,
  sound,
})

export const changeTower = (
  isPlayer: boolean,
  increase: boolean,
  amount: number,
  visual: boolean = false,
  sound: boolean = false,
) => ({ type: types.CHANGE_TOWER, increase, isPlayer, amount, visual, sound })

export const changeWall = (
  isPlayer: boolean,
  increase: boolean,
  amount: number,
  visual: boolean = false,
  sound: boolean = false,
) => ({ type: types.CHANGE_WALL, increase, isPlayer, amount, visual, sound })

export type ChangeStatusActionType = {
  type: string
  increase: boolean
  isPlayer: boolean
  resourceType: 0 | 1 | 2
  amount: number
  visual?: boolean
  sound?: boolean
}
