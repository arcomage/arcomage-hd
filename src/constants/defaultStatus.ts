
import { StatusType } from '../types/statetype'

export const defaultStatus: StatusType = {
  player: {
    resources: [12, 15, 4],
    prods: [0, 9, 7],
    tower: 59,
    wall: 12,
    cards: [0, 2, 5, 45, 36, 84],
  },
  opponent: {
    resources: [16, 0, 27],
    prods: [3, 5, 8],
    tower: 23,
    wall: 157,
    cards: [0, 3, 5, 14, 36],
  },
}
