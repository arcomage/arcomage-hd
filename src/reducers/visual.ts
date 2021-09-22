import produce from 'immer'
import { UPDATE_PIXELATION_MAIN } from '../constants/ActionTypes'
import { defaultPixelation } from '../constants/defaultSettings'
import { RootActionType } from '../types/actionObj'
import { VisualStateType } from '../types/state'

const defaultVisualState: VisualStateType = {
  pixelation: defaultPixelation,
}

export default produce((draft: VisualStateType, action: RootActionType) => {
  switch (action.type) {
    case UPDATE_PIXELATION_MAIN: {
      draft.pixelation = action.pixelation
      break
    }
  }
}, defaultVisualState)
