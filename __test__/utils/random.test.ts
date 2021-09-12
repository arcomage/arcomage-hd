import { weightedRandom, sample, randomIntFrom } from '../../src/utils/random'

it('weightedRandom is OK', () => {
  const max = 83
  const dice = 10
  const i = weightedRandom(max, dice)
  expect(i >= 0).toBeTruthy()
  expect(i <= max).toBeTruthy()
})

it('sample is OK', () => {
  const s1 = 'abcd'
  const s2 = 834
  const sArr = [s1, s2]
  const s = sample(sArr)
  expect(sArr.includes(s)).toBeTruthy()
})

it('randomIntFrom is OK', () => {
  const min = 4357
  const max = 4358
  const i = randomIntFrom(min, max)
  expect(i >= min).toBeTruthy()
  expect(i <= max).toBeTruthy()
})
