export const resNames = ['bricks', 'gems', 'recruits'] as const

export const resProds = ['brickProd', 'gemProd', 'recruitProd']

export const resProdMap = {
  brickProd: 'bricks',
  gemProd: 'gems',
  recruitProd: 'recruits',
} as const

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

export const resNameAllMap = {
  brick: ['bricks', 'brickProd'],
  gem: ['gems', 'gemProd'],
  recruit: ['recruits', 'recruitProd'],
} as const

export type ResNameType = 'brick' | 'gem' | 'recruit'
