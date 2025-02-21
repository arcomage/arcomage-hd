import { it, expect } from 'bun:test'
import { upper1st } from '../../src/utils/upper1st'

it('upper1st is good', () => {
  expect(upper1st('hello')).toBe('Hello')
  expect(upper1st('Dog')).toBe('Dog')
  expect(upper1st('的a')).toBe('的a')
  expect(upper1st('существа')).toBe('Существа')
  expect(upper1st('кирпич')).toBe('Кирпич')
  expect(upper1st('θξ')).toBe('Θξ')
  expect(upper1st('řu')).toBe('Řu')
  expect(upper1st('ło')).toBe('Ło')
  expect(upper1st('العربية')).toBe('العربية')
  expect(upper1st('')).toBe('')
})
