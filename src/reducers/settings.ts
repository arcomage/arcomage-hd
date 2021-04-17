import produce from 'immer'
import { UPDATE_SETTINGS_MAIN } from '../constants/ActionTypes'
import { SettingsStateType } from '../types/state'
import { RootActionType } from '../types/actionObj'
import { defaultSettingState } from '../constants/defaultSettings'

export default produce((draft: SettingsStateType, action: RootActionType) => {
  switch (action.type) {
    case UPDATE_SETTINGS_MAIN: {
      return { ...draft, ...action.payload }
    }
  }
}, defaultSettingState)
