import { SettingsType } from '../types/state'

export const defaultSettings: SettingsType = {
  // name: 'default',
  start: {
    tower: 20,
    wall: 10,
    brickProd: 2,
    gemProd: 2,
    recruitProd: 2,
    bricks: 5,
    gems: 5,
    recruits: 5,
  },
  win: {
    tower: 50,
    resource: 100,
  },
  cardsInHand: 5,
  // aiType: 'Random',
}
