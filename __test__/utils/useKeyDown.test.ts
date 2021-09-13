import { renderHook, act } from '@testing-library/react-hooks'
import { fireEvent } from '@testing-library/react'
import useKeyDown from '../../src/utils/useKeyDown'

it('useKeyDown (specified key) is OK', () => {
  jest.useFakeTimers()
  const myMock = jest.fn()
  renderHook(() =>
    useKeyDown('Enter', () => {
      myMock()
    }),
  )
  jest.runOnlyPendingTimers()
  act(() => {
    fireEvent.keyDown(window, { key: 'Enter', code: 'Enter' })
  })
  expect(myMock.mock.calls.length).toBe(1)
})

it('useKeyDown (any key) is OK', () => {
  jest.useFakeTimers()
  const myMock = jest.fn()
  renderHook(() =>
    useKeyDown(null, () => {
      myMock()
    }),
  )
  jest.runOnlyPendingTimers()
  act(() => {
    fireEvent.keyDown(window, { key: 'Escape', code: 'Escape' })
  })
  expect(myMock.mock.calls.length).toBe(1)
})
