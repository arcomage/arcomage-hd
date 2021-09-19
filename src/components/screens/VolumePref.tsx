import React, { memo, useContext } from 'react'
import { useAppSelector, useAppDispatch } from '../../utils/useAppDispatch'
import Window from './Window'

import {
  SCREEN_VOLUME_PREF,
  UPDATE_VOLUME,
  UPDATE_PIXELATED,
} from '../../constants/ActionTypes'
import { I18nContext } from '../../i18n/I18nContext'
import {
  defaultVolume,
  defaultEnabledPixelated,
} from '../../constants/defaultSettings'

const VolumePref = () => {
  const volume: number = useAppSelector((state) => state.volume)
  const pixelated: number = useAppSelector((state) => state.visual.pixelated)
  const _ = useContext(I18nContext)
  const dispatch = useAppDispatch()

  return (
    <Window screenActionType={SCREEN_VOLUME_PREF}>
      <div className="flex">
        <div>
          <h3 className="text-center">{_.i18n('Volume')}</h3>
          <input
            type="range"
            min="0"
            max="10"
            value={volume.toString(10)}
            className="mt-3"
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
                  volume: e.target.checked ? 0 : defaultVolume,
                })
              }}
            />
            <span>{_.i18n('Mute')}</span>
          </label>
        </div>
        <div>
          <h3 className="text-center">{_.i18n('Pixelation')}</h3>
          <input
            type="range"
            min="0"
            max="16"
            step="2"
            value={pixelated.toString(10)}
            className="mt-3"
            onChange={(e) => {
              dispatch({
                type: UPDATE_PIXELATED,
                pixelated: parseInt(e.target.value, 10),
              })
            }}
          />
          <label className="justify-center">
            <input
              type="checkbox"
              checked={pixelated === 0}
              onChange={(e) => {
                dispatch({
                  type: UPDATE_PIXELATED,
                  pixelated: e.target.checked ? 0 : defaultEnabledPixelated,
                })
              }}
            />
            <span>{_.i18n('Disable')}</span>
          </label>
        </div>
      </div>
    </Window>
  )
}

export default memo(VolumePref)
