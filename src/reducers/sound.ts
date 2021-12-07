import produce from 'immer'
import {
  UPDATE_VOLUME_MAIN,
  UPDATE_STEREO_MAIN,
} from '../constants/ActionTypes'
import { defaultVolume, defaultStereo } from '../constants/defaultSettings'
import { RootActionType } from '../types/actionObj'
import { SoundStateType } from '../types/state'

const defaultSoundState: SoundStateType = {
  volume: defaultVolume,
  stereo: defaultStereo,
}

export default produce((draft: SoundStateType, action: RootActionType) => {
  switch (action.type) {
    case UPDATE_VOLUME_MAIN: {
      draft.volume = action.volume
      break
    }
    case UPDATE_STEREO_MAIN: {
      draft.stereo = action.stereo
      break
    }
  }
}, defaultSoundState)
