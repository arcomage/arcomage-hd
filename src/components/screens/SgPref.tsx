import React, { memo, useContext, useEffect, useState } from 'react'
import { useAppSelector, useAppDispatch } from '../../utils/useAppDispatch'
import Window from './Window'

import {
  SCREEN_VOLUME_PREF,
  UPDATE_VOLUME,
  UPDATE_STEREO,
  UPDATE_PIXELATION,
  UPDATE_VISUALVALUES,
} from '../../constants/ActionTypes'
import { I18nContext } from '../../i18n/I18nContext'
import {
  defaultVolume,
  defaultStereo,
  defaultPixelation,
  defaultVisualvalues,
} from '../../constants/defaultSettings'
import {
  minVolume,
  maxVolume,
  stepVolume,
  minPixelation,
  maxPixelation,
  stepPixelation,
  rangeVisualvalues,
} from '../../constants/ranges'
import {
  dataVisualvalues,
  DataVisualvaluesFilterType,
  DataVisualvaluesMainType,
  visualPresets,
} from '../../data/visualvalues'
import { shallowCompare } from '../../utils/shallowCompare'
import TooltipAll from '../special/TooltipAll'

const SgPref = () => {
  const volume = useAppSelector((state) => state.sound.volume)
  const stereo = useAppSelector((state) => state.sound.stereo)
  const pixelation = useAppSelector((state) => state.visual.pixelation)
  const visualvalues = useAppSelector((state) => state.visual.visualvalues)
  const _ = useContext(I18nContext)
  const dispatch = useAppDispatch()

  const [visualPresetIndex, setVisualPresetIndex] = useState(0)
  useEffect(() => {
    setVisualPresetIndex(
      visualPresets.findIndex((visualPreset) =>
        shallowCompare(visualvalues, {
          ...defaultVisualvalues,
          ...visualPreset.values,
        }),
      ),
    )
  }, [visualvalues])

  return (
    <Window screenActionType={SCREEN_VOLUME_PREF}>
      <h3>
        {_.i18n('Sound')}
        {_.i18n(': ')}
      </h3>
      <label>
        <div className="flex justify-between">
          <span>{_.i18n('Volume')}</span>
          <span>{volume}</span>
        </div>
        <input
          type="range"
          min={minVolume}
          max={maxVolume}
          step={stepVolume}
          value={volume}
          onChange={(e) => {
            dispatch({
              type: UPDATE_VOLUME,
              volume: parseFloat(e.target.value),
            })
          }}
        />
      </label>
      <div className="flex">
        <label className="flex w-1/2">
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
        <label className="flex w-1/2">
          <input
            type="checkbox"
            checked={stereo}
            onChange={(e) => {
              dispatch({
                type: UPDATE_STEREO,
                stereo: e.target.checked,
              })
            }}
          />
          <span>{_.i18n('Stereo Sound')}</span>
        </label>
      </div>
      <h3>
        {_.i18n('Graphics')}
        {_.i18n(': ')}
      </h3>
      <label>
        <div className="flex justify-between">
          <span className="!p-0">
            <span>{_.i18n('Pixelation')}</span>
          </span>
          <span>{pixelation}</span>
        </div>
        <input
          type="range"
          min={minPixelation}
          max={maxPixelation}
          step={stepPixelation}
          value={pixelation}
          onChange={(e) => {
            dispatch({
              type: UPDATE_PIXELATION,
              pixelation: parseInt(e.target.value, 10),
            })
          }}
        />
      </label>
      <label className="flex">
        <span>
          {_.i18n('Visual Preset')}{' '}
          <TooltipAll
            title={_.i18n(
              'Visual effect may slow the game. Press Alt + R to reset it',
            )}
            placement="top"
          >
            <span className="emoji !p-0">🧪</span>
          </TooltipAll>
        </span>
        <select
          className="flex-grow"
          value={visualPresetIndex}
          onChange={(e) => {
            if (e.target.value === '-1') {
              return
            }
            dispatch({
              type: UPDATE_VISUALVALUES,
              payload: {
                ...defaultVisualvalues,
                ...visualPresets[parseInt(e.target.value, 10)].values,
              },
            })
          }}
        >
          {visualPresets.map((visualPreset, i) => (
            <option key={i} value={i}>
              {_.i18n(visualPreset.en)}
            </option>
          ))}
          {visualPresetIndex === -1 && (
            <option key={-1} value={-1}>
              {_.i18n('Customized')}
            </option>
          )}
        </select>
      </label>
      <div className="text-sm">
        <div className="flex flex-wrap">
          {dataVisualvalues
            .filter((d): d is DataVisualvaluesMainType => d.type === 'main')
            .map((d) => (
              <label key={d.term} className="w-1/4 px-1">
                <div className="flex justify-between">
                  <span>{_.i18n(d.en)}</span>
                  <span>{visualvalues[d.term]}</span>
                </div>
                <input
                  type="range"
                  min={rangeVisualvalues[d.term].min}
                  max={rangeVisualvalues[d.term].max}
                  step={rangeVisualvalues[d.term].step}
                  value={visualvalues[d.term]}
                  onChange={(e) => {
                    dispatch({
                      type: UPDATE_VISUALVALUES,
                      payload: { [d.term]: parseFloat(e.target.value) },
                    })
                  }}
                />
              </label>
            ))}
        </div>
        <div className="flex flex-wrap">
          <span className="flex-grow px-3 py-0.5">
            {_.i18n('Filters')}
            {_.i18n(': ')}
          </span>
          {dataVisualvalues
            .filter((d): d is DataVisualvaluesFilterType => d.type === 'filter')
            .map((d) => (
              <label key={d.term}>
                <input
                  type="checkbox"
                  checked={visualvalues[d.term]}
                  onChange={(e) => {
                    dispatch({
                      type: UPDATE_VISUALVALUES,
                      payload: { [d.term]: e.target.checked },
                    })
                  }}
                />
                <span className="!pl-1">{_.i18n(d.en)}</span>
              </label>
            ))}
        </div>
      </div>
      <div className="button-wrapper">
        <button
          onClick={(e) => {
            dispatch({
              type: UPDATE_VOLUME,
              volume: defaultVolume,
            })
            dispatch({
              type: UPDATE_STEREO,
              stereo: defaultStereo,
            })
            dispatch({
              type: UPDATE_PIXELATION,
              pixelation: defaultPixelation,
            })
            dispatch({
              type: UPDATE_VISUALVALUES,
              payload: defaultVisualvalues,
            })
          }}
        >
          {_.i18n('Reset')}
        </button>
      </div>
    </Window>
  )
}

export default memo(SgPref)
