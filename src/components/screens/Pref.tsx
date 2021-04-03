import React, {
  ChangeEvent,
  memo,
  useContext,
  useEffect,
  useState,
} from 'react'
import produce from 'immer'
import { useAppSelector, useAppDispatch } from '../../utils/useAppDispatch'
import Window from './Window'

import {
  CHANGE_SETTINGS_AND_INIT,
  SCREEN_PREF,
} from '../../constants/ActionTypes'
import { I18nContext, upper1st } from '../../i18n/I18nContext'
import { preSettings } from '../../constants/preSettings'
import {
  defaultOpponentName,
  defaultPlayerName,
  defaultSettings,
} from '../../constants/defaultSettings'
import { hasOwnProperty } from '../../utils/typeHelpers'

const Pref = () => {
  const _ = useContext(I18nContext)
  const dispatch = useAppDispatch()

  const [formFields, setFormFields] = useState({
    playerName: useAppSelector((state) => state.settings.playerName),
    opponentName: useAppSelector((state) => state.settings.opponentName),

    tower: useAppSelector((state) => state.settings.start.tower),
    wall: useAppSelector((state) => state.settings.start.wall),
    bricks: useAppSelector((state) => state.settings.start.bricks),
    gems: useAppSelector((state) => state.settings.start.gems),
    recruits: useAppSelector((state) => state.settings.start.recruits),
    brickProd: useAppSelector((state) => state.settings.start.brickProd),
    gemProd: useAppSelector((state) => state.settings.start.gemProd),
    recruitProd: useAppSelector((state) => state.settings.start.recruitProd),

    winTower: useAppSelector((state) => state.settings.win.tower),
    winResource: useAppSelector((state) => state.settings.win.resource),

    cardsInHand: useAppSelector((state) => state.settings.cardsInHand),
  })

  const checkPreset = (o: typeof formFields) => {
    const indexMatched = preSettings.concat(defaultSettings).findIndex(
      ({ start, win, cardsInHand }) =>
        o.tower === start.tower &&
        o.wall === start.wall &&
        o.brickProd === start.brickProd &&
        o.gemProd === start.gemProd &&
        o.recruitProd === start.recruitProd &&
        o.bricks === start.bricks &&
        o.gems === start.gems &&
        o.recruits === start.recruits &&
        o.winTower === win.tower &&
        o.winResource === win.resource &&
        o.cardsInHand === cardsInHand,
      // aiType
    )
    if (indexMatched === preSettings.length) {
      return -2
    } else {
      return indexMatched
    }
  }

  const applyAndNewGame = () => {
    const {
      playerName,
      opponentName,
      tower,
      wall,
      brickProd,
      gemProd,
      recruitProd,
      bricks,
      gems,
      recruits,
      winTower,
      winResource,
      cardsInHand,
    } = formFields

    const payload = {
      playerName,
      opponentName,
      start: {
        bricks,
        gems,
        recruits,
        brickProd,
        gemProd,
        recruitProd,
        tower,
        wall,
      },
      win: {
        tower: winTower,
        resource: winResource,
      },
      cardsInHand,
      // aiType,
    }

    dispatch({
      type: SCREEN_PREF,
      show: false,
    })

    dispatch({
      type: CHANGE_SETTINGS_AND_INIT,
      payload,
    })
  }

  const [preset, setPreset] = useState<number>(-10)

  useEffect(() => {
    const winTowerMin = formFields.tower + 1
    const winResourceMin =
      Math.max(
        formFields.bricks + formFields.brickProd,
        formFields.gems + formFields.gemProd,
        formFields.recruits + formFields.recruitProd,
      ) + 1

    if (formFields.winTower < winTowerMin) {
      setFormFields((prev) =>
        produce(prev, (draft) => {
          draft.winTower = winTowerMin
        }),
      )
    } else if (formFields.winResource < winResourceMin) {
      setFormFields((prev) =>
        produce(prev, (draft) => {
          draft.winResource = winResourceMin
        }),
      )
    }

    setPreset(checkPreset(formFields))
  }, [formFields])

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (
      e.target.value === '' &&
      e.target.name !== 'playerName' &&
      e.target.name !== 'opponentName'
    ) {
      e.target.value = '0'
    }

    if (parseInt(e.target.value, 10) < parseInt(e.target.min, 10)) {
      e.target.value = e.target.min
    }

    if (parseInt(e.target.value, 10) > parseInt(e.target.max, 10)) {
      e.target.value = e.target.max
    }

    const { name, value } = e.target
    setFormFields((prev) =>
      produce(prev, (draft) => {
        if (hasOwnProperty(draft, name)) {
          draft[name] =
            name === 'playerName' || name === 'opponentName'
              ? value
              : parseInt(value, 10)
        }
      }),
    )
  }

  const usePreset = (index: number) => {
    const _index = index === -2 ? preSettings.length : index
    if (_index >= 0) {
      const { start, win, cardsInHand } = preSettings.concat(defaultSettings)[
        _index
      ]

      setFormFields((prev) =>
        produce(prev, (draft) => {
          draft.tower = start.tower
          draft.wall = start.wall
          draft.brickProd = start.brickProd
          draft.gemProd = start.gemProd
          draft.recruitProd = start.recruitProd
          draft.bricks = start.bricks
          draft.gems = start.gems
          draft.recruits = start.recruits
          draft.winTower = win.tower
          draft.winResource = win.resource
          draft.cardsInHand = cardsInHand
          // aiType
        }),
      )
    }
  }

  return (
    <Window ScreenActionType={SCREEN_PREF}>
      <h3>{_.i18n('Preferences')}</h3>

      <div className="two-column half">
        <label>
          <span>{_.i18n('Your Name:')}</span>
          <input
            type="text"
            name="playerName"
            id="playerName"
            value={formFields.playerName}
            onChange={handleChange}
            onFocus={(e) => {
              if (e.target.value === defaultPlayerName) {
                e.target.select()
              }
            }}
          />
        </label>
        <label>
          <span>{_.i18n("Opponent's Name:")}</span>
          <input
            type="text"
            name="opponentName"
            id="opponentName"
            value={formFields.opponentName}
            onChange={handleChange}
            onFocus={(e) => {
              if (e.target.value === defaultOpponentName) {
                e.target.select()
              }
            }}
          />
        </label>
      </div>

      <label className="one-colume">
        <span>{_.i18n('Choose a Tavern (Preset Preferences):')}</span>
        <select
          name="tavern"
          id="tavern"
          value={preset}
          onChange={(e) => {
            usePreset(parseInt(e.target.value, 10))
          }}
        >
          <option value={-2}>{_.i18n('Default')}</option>
          {preSettings.map((s, i) => (
            <option value={i} key={i}>
              {_.taverns(i, 'name')} - {_.taverns(i, 'location')}
            </option>
          ))}
          {preset === -1 && <option value={-1}>{_.i18n('Customized')}</option>}
        </select>
      </label>

      <h4>{_.i18n('Starting Conditions')}</h4>

      <div className="two-column">
        <label>
          <span>{upper1st(_.i18n('tower'))}</span>
          <input
            type="number"
            name="tower"
            id="tower"
            min="1"
            value={formFields.tower}
            onChange={handleChange}
          />
        </label>
        <label>
          <span>{upper1st(_.i18n('wall'))}</span>
          <input
            type="number"
            name="wall"
            id="wall"
            min="0"
            value={formFields.wall}
            onChange={handleChange}
          />
        </label>
      </div>

      <div className="two-column">
        <label>
          <span>{upper1st(_.i18n('bricks'))}</span>
          <input
            type="number"
            name="bricks"
            id="bricks"
            min="0"
            value={formFields.bricks}
            onChange={handleChange}
          />
        </label>
        <label>
          <span>{upper1st(_.i18n('quarry'))}</span>
          <input
            type="number"
            name="brickProd"
            id="brickProd"
            min="0"
            value={formFields.brickProd}
            onChange={handleChange}
          />
        </label>
      </div>

      <div className="two-column">
        <label>
          <span>{upper1st(_.i18n('gems'))}</span>
          <input
            type="number"
            name="gems"
            id="gems"
            min="0"
            value={formFields.gems}
            onChange={handleChange}
          />
        </label>
        <label>
          <span>{upper1st(_.i18n('magic'))}</span>
          <input
            type="number"
            name="gemProd"
            id="gemProd"
            min="0"
            value={formFields.gemProd}
            onChange={handleChange}
          />
        </label>
      </div>

      <div className="two-column">
        <label>
          <span>{upper1st(_.i18n('recruits'))}</span>
          <input
            type="number"
            name="recruits"
            id="recruits"
            min="0"
            value={formFields.recruits}
            onChange={handleChange}
          />
        </label>
        <label>
          <span>{upper1st(_.i18n('dungeon'))}</span>
          <input
            type="number"
            name="recruitProd"
            id="recruitProd"
            min="0"
            value={formFields.recruitProd}
            onChange={handleChange}
          />
        </label>
      </div>

      <h4>{_.i18n('Victory Conditions')}</h4>
      <div className="two-column">
        <label>
          <span>{upper1st(_.i18n('tower'))}</span>
          <input
            type="number"
            name="winTower"
            id="winTower"
            min={(formFields.tower + 1).toString(10)}
            value={formFields.winTower}
            onChange={handleChange}
          />
        </label>
        <label>
          <span>{upper1st(_.i18n('resource'))}</span>
          <input
            type="number"
            name="winResource"
            id="winResource"
            min={(
              Math.max(
                formFields.bricks + formFields.brickProd,
                formFields.gems + formFields.gemProd,
                formFields.recruits + formFields.recruitProd,
              ) + 1
            ).toString(10)}
            value={formFields.winResource}
            onChange={handleChange}
          />
        </label>
      </div>

      <h4>{_.i18n('Other Preferences')}</h4>
      <label className="one-colume">
        <span>{_.i18n('Cards in Hand')}</span>
        <input
          type="number"
          name="cardsInHand"
          id="cardsInHand"
          min="0"
          max="15"
          value={formFields.cardsInHand}
          onChange={handleChange}
        />
      </label>
      {/* <label className="one-colume">
          <span>{_.i18n('AI Type')}</span>
          <select name="aiType" id="aiType">
            <option value={0}>111</option>
            <option value={1}>222</option>
          </select>
          </label> */}

      <div className="button-wrapper">
        <button className="warning" onClick={applyAndNewGame}>
          {_.i18n('Apply & New Game')}
        </button>
      </div>
    </Window>
  )
}

export default memo(Pref)
