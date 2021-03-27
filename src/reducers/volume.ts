import produce from 'immer'
import { UPDATE_VOLUME } from '../constants/ActionTypes'
import { defaultVolume } from '../constants/defaultSettings'
import { ActionType } from '../types/actionObj'

const volume = produce((draft: number, action: ActionType) => {
  switch (action.type) {
    case UPDATE_VOLUME: {
      return action.volume
    }
  }
}, defaultVolume)

export default volume
