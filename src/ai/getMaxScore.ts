import { ScoreObjType } from '../types/ai'
import { weightedRandom, sample } from '../utils/random'

export const getMaxScore = (
  allScores: ScoreObjType[],
  aiLevel: number, // 0 | 1 | 2 | 3 | 4
): ScoreObjType => {
  let result: ScoreObjType
  switch (aiLevel) {
    case 1: {
      const allScoresTemp = allScores.map(
        ({ scoreAll }) => (scoreAll * weightedRandom(100, 8)) / 50,
      )
      const indexOfMax = allScoresTemp.reduce(
        (iMax, x, i, arr) => (x > arr[iMax] ? i : iMax),
        0,
      )
      result = allScores[indexOfMax]
      break
    }
    case 2: {
      const allScoresTemp = allScores.map(
        ({ scoreAll }) => (scoreAll * weightedRandom(100, 2)) / 50,
      )
      const indexOfMax = allScoresTemp.reduce(
        (iMax, x, i, arr) => (x > arr[iMax] ? i : iMax),
        0,
      )
      result = allScores[indexOfMax]
      break
    }
    case 3: {
      const allScoresTemp = allScores.map(({ scoreAll }) => scoreAll)
      const max = Math.max(...allScoresTemp)
      const min = Math.min(...allScoresTemp)
      const allScoresTemp2 = allScoresTemp.map(
        (scoreAll) =>
          scoreAll + ((max - min) * (weightedRandom(100, 2) - 50)) / 50,
      )
      const indexOfMax = allScoresTemp2.reduce(
        (iMax, x, i, arr) => (x > arr[iMax] ? i : iMax),
        0,
      )
      result = allScores[indexOfMax]
      break
    }
    case 4: {
      result = sample(allScores)
      break
    }
    default: {
      result = allScores.reduce((prev, current) =>
        prev.scoreAll > current.scoreAll ? prev : current,
      )
      break
    }
  }
  return result
}
