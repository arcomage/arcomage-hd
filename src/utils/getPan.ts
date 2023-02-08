import { stereoPanValue } from '../constants/visuals'

/**
 * Get pan value for a card
 * @param n number of cards (should >= 1)
 * @param position target card position (should >= 0 and < n)
 * @returns pan value
 */
const getPan = (n: number, position: number): number => {
  if (n === 1) {
    return 0
  }
  return -stereoPanValue + ((stereoPanValue * 2) / (n - 1)) * position
}

export default getPan
