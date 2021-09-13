import { renderHook } from '@testing-library/react-hooks'
import useWindowLoad from '../../src/utils/useWindowLoad'

it('useWindowLoad is OK', () => {
  global.addEventListener = jest.fn()
  renderHook(() => useWindowLoad(() => {}))
  expect(global.addEventListener).toHaveBeenCalled()
})
