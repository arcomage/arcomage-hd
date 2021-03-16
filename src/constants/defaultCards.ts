import { CardStateType } from '../types/state'

export const defaultCards: CardStateType = {
  total: 3,
  list: [
    {
      position: 0,
      n: 0,
      unusable: false,
      discarded: false,
      isflipped: false,
      owner: 'player',
    },
    {
      position: 1,
      n: 2,
      unusable: false,
      discarded: false,
      isflipped: false,
      owner: 'player',
    },
    {
      position: 2,
      n: 5,
      unusable: false,
      discarded: false,
      isflipped: false,
      owner: 'player',
    },
    {
      position: 0,
      n: 9,
      unusable: false,
      discarded: false,
      isflipped: false,
      owner: 'opponent',
    },
    {
      position: 1,
      n: 6,
      unusable: false,
      discarded: false,
      isflipped: false,
      owner: 'opponent',
    },
    {
      position: 2,
      n: 12,
      unusable: false,
      discarded: false,
      isflipped: false,
      owner: 'opponent',
    },
  ],
}
