import { setVolume, play } from '../../src/utils/Sound'
// import { Howl, Howler } from 'howler'

const mockVolumeFn = jest.fn()
const mockStereoFn = jest.fn()
const mockPlayFn = jest.fn()

jest.mock('howler', () => {
  return {
    Howler: { volume: () => mockVolumeFn() },
    Howl: jest.fn().mockImplementation(() => {
      return { stereo: () => mockStereoFn(), play: () => mockPlayFn() }
    }),
  }
})

beforeEach(() => {
  mockVolumeFn.mockClear()
  mockStereoFn.mockClear()
  mockPlayFn.mockClear()
})

it('setVolume(0.5) is OK', () => {
  setVolume(0.5)
  expect(mockVolumeFn).toBeCalledTimes(1)
})

it('play(`victory`) is OK', () => {
  play('victory')
  expect(mockStereoFn).toBeCalledTimes(1)
  expect(mockPlayFn).toBeCalledTimes(1)
})

it('play(`deal`, null, 0.8) is OK', () => {
  play('deal', null, 0.8)
  expect(mockStereoFn).toBeCalledTimes(1)
  expect(mockPlayFn).toBeCalledTimes(1)
})

it('play(`brickProd`, true, true) is OK', () => {
  play('brickProd', true, true)
  expect(mockStereoFn).toBeCalledTimes(1)
  expect(mockPlayFn).toBeCalledTimes(1)
})

it('play(`gems`, false, false) is OK', () => {
  play('gems', false, false)
  expect(mockStereoFn).toBeCalledTimes(1)
  expect(mockPlayFn).toBeCalledTimes(1)
})
