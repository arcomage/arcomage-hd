import React, { memo, useContext } from 'react'
import { useAppSelector, useAppDispatch } from '../../utils/useAppDispatch'
import Window from './Window'

import { SCREEN_VOLUME_PREF, UPDATE_VOLUME } from '../../constants/ActionTypes'
import { I18nContext } from '../../i18n/I18nContext'

const VolumePref = () => {
  const volume: number = useAppSelector((state) => state.volume)
  const _ = useContext(I18nContext)
  const dispatch = useAppDispatch()

  return (
    <Window ScreenActionType={SCREEN_VOLUME_PREF}>
      <h3 className="text-center">{_.i18n('Volume')}</h3>
      <input
        type="range"
        min="0"
        max="10"
        value={volume.toString(10)}
        className="volumemeter mt-3"
        onChange={(e) => {
          dispatch({
            type: UPDATE_VOLUME,
            volume: parseInt(e.target.value, 10),
          })
        }}
      />
      <label className="justify-center">
        <input
          type="checkbox"
          checked={volume === 0}
          onChange={(e) => {
            dispatch({
              type: UPDATE_VOLUME,
              volume: e.target.checked ? 0 : 10,
            })
          }}
        />
        <span>{_.i18n('Mute')}</span>
      </label>
    </Window>
  )
}

export default memo(VolumePref)
