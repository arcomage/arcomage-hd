import dataCards from '../data/cards'

const numbersWithProbs = dataCards
  .map((card) => card.prob)
  .reduce(
    (acc: number[], n: number, i: number): number[] =>
      acc.concat(Array(n).fill(i)),
    [],
  )

export const randomWithProbs = (): number =>
  numbersWithProbs[Math.floor(Math.random() * numbersWithProbs.length)]
