import { produce } from 'immer'
import {
  UPDATE_NOANIM_MAIN,
  UPDATE_PIXELATION_MAIN,
  UPDATE_VISUALVALUES_MAIN,
} from '@/constants/ActionTypes'
import {
  defaultNoanim,
  defaultPixelation,
  defaultVisualvalues,
} from '@/constants/defaultSettings'
import { RootActionType } from '@/types/actionObj'
import { VisualStateType } from '@/types/state'

const defaultVisualState: VisualStateType = {
  noanim: defaultNoanim,
  pixelation: defaultPixelation,
  visualvalues: defaultVisualvalues,
}

export default produce((draft: VisualStateType, action: RootActionType) => {
  switch (action.type) {
    case UPDATE_NOANIM_MAIN: {
      draft.noanim = action.noanim
      break
    }
    case UPDATE_PIXELATION_MAIN: {
      draft.pixelation = action.pixelation
      break
    }
    case UPDATE_VISUALVALUES_MAIN: {
      draft.visualvalues = {
        ...draft.visualvalues,
        ...action.payload,
      }
      break
    }
  }
}, defaultVisualState)
