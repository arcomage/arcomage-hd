import produce from 'immer'
import { UPDATE_PIXELATED_MAIN } from '../constants/ActionTypes'
import { defaultPixelated } from '../constants/defaultSettings'
import { RootActionType } from '../types/actionObj'
import { VisualStateType } from '../types/state'

const defaultVisualState: VisualStateType = {
  pixelated: defaultPixelated,
}

export default produce((draft: VisualStateType, action: RootActionType) => {
  switch (action.type) {
    case UPDATE_PIXELATED_MAIN: {
      draft.pixelated = action.pixelated
      break
    }
  }
}, defaultVisualState)
