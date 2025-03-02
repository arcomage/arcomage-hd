export const resNames = ['bricks', 'gems', 'recruits'] as const

export const resProds = ['brickProd', 'gemProd', 'recruitProd'] as const

export type allResType = (typeof resNames)[number] | (typeof resProds)[number]

export const resProdMap = {
  brickProd: 'bricks',
  gemProd: 'gems',
  recruitProd: 'recruits',
} as const

export const poNames = ['playerName', 'opponentName'] as const

export const allStatusNames = [
  'tower',
  'wall',
  'bricks',
  'gems',
  'recruits',
  'brickProd',
  'gemProd',
  'recruitProd',
] as const

export const otherSettingNames = [
  'winTower',
  'winResource',
  'cardsInHand',
  'aiLevel',
] as const

export const nonNameSettingNames = [
  ...allStatusNames,
  ...otherSettingNames,
] as const

export const resNameAllMap = {
  brick: ['bricks', 'brickProd'],
  gem: ['gems', 'gemProd'],
  recruit: ['recruits', 'recruitProd'],
} as const

export type ResNameType = 'brick' | 'gem' | 'recruit'
