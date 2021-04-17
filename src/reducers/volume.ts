import produce from 'immer'
import { UPDATE_VOLUME_MAIN } from '../constants/ActionTypes'
import { defaultVolume } from '../constants/defaultSettings'
import { RootActionType } from '../types/actionObj'

export default produce((draft: number, action: RootActionType) => {
  switch (action.type) {
    case UPDATE_VOLUME_MAIN: {
      return action.volume
    }
  }
}, defaultVolume)
