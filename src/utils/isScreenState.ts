import { RootState } from '@/store'
import { ScreenStateType } from '@/types/state'

/**
 * Any screen (window) is active
 */
const isScreenState = (state: RootState): boolean => {
  const screenState = state.screen
  for (const screen in screenState) {
    if (screen === 'end') {
      if (screenState.end.type) {
        return true
      }
    } else {
      if (screenState[screen as keyof ScreenStateType]) {
        return true
      }
    }
  }
  return false
}

export default isScreenState
