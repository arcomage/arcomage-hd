import getPan from '../../src/utils/getPan'
import { stereoPanValue } from '../../src/constants/visuals'

it('getPan is OK when n = 1', () => {
  const n = 1
  expect(getPan(n, 0)).toBe(0)
})

it('getPan is OK when n = 2', () => {
  const n = 2
  expect(getPan(n, 0)).toBe(-stereoPanValue)
  expect(getPan(n, 1)).toBe(stereoPanValue)
})

it('getPan is OK when n = 5', () => {
  const n = 5
  expect(getPan(n, 0)).toBe(-stereoPanValue)
  expect(getPan(n, 1)).toBeCloseTo(-stereoPanValue / 2)
  expect(getPan(n, 2)).toBe(0)
  expect(getPan(n, 3)).toBeCloseTo(stereoPanValue / 2)
  expect(getPan(n, 4)).toBe(stereoPanValue)
})

it('getPan is OK when n = 6', () => {
  const n = 6
  expect(getPan(n, 0)).toBe(-stereoPanValue)
  expect(getPan(n, 1)).toBeCloseTo(-stereoPanValue + (stereoPanValue * 2) / 5)
  expect(getPan(n, 2)).toBeCloseTo(
    -stereoPanValue + ((stereoPanValue * 2) / 5) * 2,
  )
  expect(getPan(n, 3)).toBeCloseTo(
    -stereoPanValue + ((stereoPanValue * 2) / 5) * 3,
  )
  expect(getPan(n, 4)).toBeCloseTo(
    -stereoPanValue + ((stereoPanValue * 2) / 5) * 4,
  )
  expect(getPan(n, 5)).toBe(stereoPanValue)
})
