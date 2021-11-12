import {
  isEnabled,
  isFullscreen,
  requestFs,
  exitFs,
} from '../../src/utils/fullscreen'

it('isEnabled is boolean (false)', () => {
  expect(isEnabled).toBe(false)
})

it('isFullscreen is executable', () => {
  expect(typeof isFullscreen).toBe('function')
  expect(isFullscreen()).toBe(false)
})

it('requestFs is executable', () => {
  expect(typeof requestFs).toBe('function')
  expect(requestFs()).toBeUndefined()
})

it('exitFs is executable', () => {
  expect(typeof exitFs).toBe('function')
  expect(exitFs()).toBeUndefined()
})
