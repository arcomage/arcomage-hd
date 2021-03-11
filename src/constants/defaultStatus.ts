import { StatusType } from '../types/state'

export const defaultStatus: StatusType = {
  player: {
    bricks: 12,
    gems: 15,
    recruits: 4,
    brickProd: 0,
    gemProd: 9,
    recruitProd: 7,
    tower: 59,
    wall: 12,
  },
  opponent: {
    bricks: 16,
    gems: 0,
    recruits: 27,
    brickProd: 3,
    gemProd: 5,
    recruitProd: 8,
    tower: 23,
    wall: 157,
  },
}
