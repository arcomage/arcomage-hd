import React, { memo, useContext } from 'react'
import { useAppSelector, useAppDispatch } from '../../utils/useAppDispatch'
import Window from './Window'

import {
  SCREEN_VOLUME_PREF,
  UPDATE_VOLUME,
  UPDATE_PIXELATION,
} from '../../constants/ActionTypes'
import { I18nContext } from '../../i18n/I18nContext'
import {
  defaultVolume,
  defaultEnabledPixelation,
} from '../../constants/defaultSettings'
import {
  minVolume,
  maxVolume,
  stepVolume,
  minPixelation,
  maxPixelation,
  stepPixelation,
} from '../../constants/ranges'

const VolumePref = () => {
  const volume = useAppSelector((state) => state.volume)
  const pixelation = useAppSelector((state) => state.visual.pixelation)
  const _ = useContext(I18nContext)
  const dispatch = useAppDispatch()

  return (
    <Window screenActionType={SCREEN_VOLUME_PREF}>
      <div className="flex">
        <div>
          <h3 className="text-center">{_.i18n('Volume')}</h3>
          <input
            type="range"
            min={minVolume}
            max={maxVolume}
            step={stepVolume}
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
            min={minPixelation}
            max={maxPixelation}
            step={stepPixelation}
            value={pixelation.toString(10)}
            className="mt-3"
            onChange={(e) => {
              dispatch({
                type: UPDATE_PIXELATION,
                pixelation: parseInt(e.target.value, 10),
              })
            }}
          />
          <label className="justify-center">
            <input
              type="checkbox"
              checked={pixelation === 0}
              onChange={(e) => {
                dispatch({
                  type: UPDATE_PIXELATION,
                  pixelation: e.target.checked ? 0 : defaultEnabledPixelation,
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
