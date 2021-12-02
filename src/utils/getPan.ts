import { stereoPanValue } from '../constants/visuals'

const getPan = (n: number, position: number): number =>
  -stereoPanValue + ((stereoPanValue * 2) / (n - 1)) * position

export default getPan
