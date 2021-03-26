import React, {
  ChangeEvent,
  memo,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react'
import produce from 'immer'
import cx from 'classnames'
import { createUseStyles } from 'react-jss'
import { useAppSelector, useAppDispatch } from '../utils/useAppDispatch'

import { I18nContext, upper1st } from '../i18n/I18nContext'

import logo from '../../assets/logo/logo.svg'
import { preSettings } from '../constants/preSettings'
import {
  defaultOpponentName,
  defaultPlayerName,
  defaultSettings,
} from '../constants/defaultSettings'
import { hasOwnProperty } from '../utils/typeHelpers'
import { CHANGE_SETTINGS_AND_INIT, SCREEN_PREF } from '../constants/ActionTypes'
import useClickOutside from '../utils/useClickOutside'

const useStyles = createUseStyles({
  logo: {
    'background-image': `url(${logo})`,
    width: '134.5px',
    height: '46.5px',
  },
})

// type PropType = { }
const Pref = () => {
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
    setPreset(checkPreset(formFields))
  }, [formFields])

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
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

  const trans = useContext(I18nContext)
  const classes = useStyles()

  const prefRef = useRef(null)
  useClickOutside(prefRef, () => {
    dispatch({
      type: SCREEN_PREF,
      show: false,
    })
  })

  return (
    <div className={cx('window-bg')}>
      <div className={cx('window-outerwrapper')}>
        <div ref={prefRef} className={cx('window-wrapper')}>
          <div
            className={cx(
              classes.logo,
              'm-auto bg-no-repeat bg-center bg-contain',
            )}
          ></div>

          <h3>{trans.i18n?.['Preferences']}</h3>

          <div className="two-column half">
            <label>
              <span>{trans.i18n?.['Your Name:']}</span>
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
              <span>{trans.i18n?.["Opponent's Name:"]}</span>
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

          <label>
            <span>{trans.i18n?.['Choose a Tavern (Preset Preferences):']}</span>
            <select
              name="tavern"
              id="tavern"
              value={preset}
              onChange={(e) => {
                usePreset(parseInt(e.target.value, 10))
              }}
            >
              <option value={-2}>{trans.i18n?.['Default']}</option>
              {preSettings.map(({ tavern, location }, i) => (
                <option value={i} key={i}>
                  {tavern} - {location}
                </option>
              ))}
              {preset === -1 && (
                <option value={-1}>{trans.i18n?.['Customized']}</option>
              )}
            </select>
          </label>

          <h4>{trans.i18n?.['Starting Conditions']}</h4>

          <div className="two-column">
            <label>
              <span>{upper1st(trans.i18n?.['tower'])}</span>
              <input
                type="number"
                name="tower"
                id="tower"
                value={formFields.tower}
                onChange={handleChange}
              />
            </label>
            <label>
              <span>{upper1st(trans.i18n?.['wall'])}</span>
              <input
                type="number"
                name="wall"
                id="wall"
                value={formFields.wall}
                onChange={handleChange}
              />
            </label>
          </div>

          <div className="two-column">
            <label>
              <span>{upper1st(trans.i18n?.['bricks'])}</span>
              <input
                type="number"
                name="bricks"
                id="bricks"
                value={formFields.bricks}
                onChange={handleChange}
              />
            </label>
            <label>
              <span>{upper1st(trans.i18n?.['quarry'])}</span>
              <input
                type="number"
                name="brickProd"
                id="brickProd"
                value={formFields.brickProd}
                onChange={handleChange}
              />
            </label>
          </div>

          <div className="two-column">
            <label>
              <span>{upper1st(trans.i18n?.['gems'])}</span>
              <input
                type="number"
                name="gems"
                id="gems"
                value={formFields.gems}
                onChange={handleChange}
              />
            </label>
            <label>
              <span>{upper1st(trans.i18n?.['magic'])}</span>
              <input
                type="number"
                name="gemProd"
                id="gemProd"
                value={formFields.gemProd}
                onChange={handleChange}
              />
            </label>
          </div>

          <div className="two-column">
            <label>
              <span>{upper1st(trans.i18n?.['recruits'])}</span>
              <input
                type="number"
                name="recruits"
                id="recruits"
                value={formFields.recruits}
                onChange={handleChange}
              />
            </label>
            <label>
              <span>{upper1st(trans.i18n?.['dungeon'])}</span>
              <input
                type="number"
                name="recruitProd"
                id="recruitProd"
                value={formFields.recruitProd}
                onChange={handleChange}
              />
            </label>
          </div>

          <h4>{trans.i18n?.['Victory Conditions']}</h4>
          <div className="two-column">
            <label>
              <span>{upper1st(trans.i18n?.['tower'])}</span>
              <input
                type="number"
                name="winTower"
                id="winTower"
                value={formFields.winTower}
                onChange={handleChange}
              />
            </label>
            <label>
              <span>{upper1st(trans.i18n?.['resource'])}</span>
              <input
                type="number"
                name="winResource"
                id="winResource"
                value={formFields.winResource}
                onChange={handleChange}
              />
            </label>
          </div>

          <h4>{trans.i18n?.['Other Preferences']}</h4>
          <label>
            <span>{trans.i18n?.['Cards in Hand']}</span>
            <input
              type="number"
              name="cardsInHand"
              id="cardsInHand"
              value={formFields.cardsInHand}
              onChange={handleChange}
            />
          </label>
          {/* <label>
          <span>{trans.i18n?.['AI Type']}</span>
          <select name="aiType" id="aiType">
            <option value={0}>111</option>
            <option value={1}>222</option>
          </select>
        </label> */}

          <div className="button-wrapper">
            <button className="warning" onClick={applyAndNewGame}>
              {trans.i18n?.['Apply & New Game']}
            </button>
            <button
              className="cancel"
              title={trans.i18n?.['Cancel']}
              onClick={() => {
                dispatch({
                  type: SCREEN_PREF,
                  show: false,
                })
              }}
            >
              ✖
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default memo(Pref)
