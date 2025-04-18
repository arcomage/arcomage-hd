import cl from 'clarr'
import React, { useContext, useEffect, useState } from 'react'
import CheckBox from '@/components/special/CheckBox'
import {
  SCREEN_VOLUME_PREF,
  UPDATE_VOLUME,
  UPDATE_STEREO,
  UPDATE_NOANIM,
  UPDATE_PIXELATION,
  UPDATE_VISUALVALUES,
} from '@/constants/ActionTypes'
import {
  defaultVolume,
  defaultStereo,
  defaultNoanim,
  defaultPixelation,
  defaultVisualvalues,
} from '@/constants/defaultSettings'
import {
  minVolume,
  maxVolume,
  stepVolume,
  minPixelation,
  maxPixelation,
  stepPixelation,
  rangeVisualvalues,
} from '@/constants/ranges'
import {
  dataVisualvalues,
  DataVisualvaluesFilterType,
  DataVisualvaluesMainType,
  visualPresets,
} from '@/data/visualvalues'
import { I18nContext } from '@/i18n/I18nContext'
import { useAppSelector, useAppDispatch } from '@/utils/hooks/useAppDispatch'
import { shallowCompare } from '@/utils/shallowCompare'
import { tooltipAttrs } from '@/utils/tooltip'
import Window from './Window'
import styles from './Window.module.scss'

const SgPref = () => {
  const volume = useAppSelector((state) => state.sound.volume)
  const stereo = useAppSelector((state) => state.sound.stereo)
  const noanim = useAppSelector((state) => state.visual.noanim)
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
      {/* no lint reason: though deeply nested, text is in the label */}
      {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
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
      <div className="flex justify-evenly">
        <label className="flex">
          <CheckBox
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
        <label className="flex">
          <CheckBox
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
      <div className="flex justify-between">
        <h3>
          {_.i18n('Graphics')}
          {_.i18n(': ')}
        </h3>
        <label className="shrink-0">
          <CheckBox
            checked={noanim}
            onChange={(e) => {
              dispatch({
                type: UPDATE_NOANIM,
                noanim: e.target.checked,
              })
            }}
          />
          <span>{_.i18n('Disable animation')}</span>
        </label>
      </div>
      {/* no lint reason: though deeply nested, text is in the label */}
      {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
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
      <label htmlFor="visual-preset" className="flex">
        <span>
          {_.i18n('Visual Preset')}{' '}
          <span
            className="emoji !p-0"
            {...tooltipAttrs(`${_.i18n('Reset')}${_.i18n(': ')}Alt + O`)}
          >
            💡
          </span>
        </span>
        <select
          id="visual-preset"
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
              // no lint reason: though deeply nested, text is in the label
              // eslint-disable-next-line jsx-a11y/label-has-associated-control
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
        <div className="flex flex-wrap justify-center">
          <span className="px-3 py-0.5">
            {_.i18n('Filters')}
            {_.i18n(': ')}
            <span
              className="emoji !p-0"
              {...tooltipAttrs(_.i18n('Filter may slow down the game'))}
            >
              🧪
            </span>
          </span>
          {dataVisualvalues
            .filter((d): d is DataVisualvaluesFilterType => d.type === 'filter')
            .map((d) => (
              <label key={d.term} className="mx-1" htmlFor={`filter-${d.term}`}>
                <CheckBox
                  id={`filter-${d.term}`}
                  checked={visualvalues[d.term]}
                  onChange={(e) => {
                    dispatch({
                      type: UPDATE_VISUALVALUES,
                      payload: { [d.term]: e.target.checked },
                    })
                  }}
                />
                <span>{_.i18n(d.en)}</span>
              </label>
            ))}
        </div>
      </div>
      <div className={cl(styles.buttonwrapper)}>
        <button
          accessKey="r"
          onClick={(_e) => {
            dispatch({
              type: UPDATE_VOLUME,
              volume: defaultVolume,
            })
            dispatch({
              type: UPDATE_STEREO,
              stereo: defaultStereo,
            })
            dispatch({
              type: UPDATE_NOANIM,
              noanim: defaultNoanim,
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
export default SgPref
