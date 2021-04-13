import React, {
  ChangeEvent,
  memo,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react'
import produce from 'immer'
import copy from 'copy-to-clipboard'
import { useAppSelector, useAppDispatch } from '../../utils/useAppDispatch'
import Window from './Window'

import {
  UPDATE_SETTINGS_AND_INIT,
  SCREEN_PREF,
  SWITCH_MULTIPLAYER_MODE,
  CONNECT_TO_ID,
} from '../../constants/ActionTypes'
import { I18nContext, upper1st } from '../../i18n/I18nContext'
import { preSettings } from '../../constants/preSettings'
import {
  defaultOpponentName,
  defaultPlayerName,
  defaultSettings,
} from '../../constants/defaultSettings'
import { hasOwnProperty } from '../../utils/typeHelpers'
import {
  copiedDuration,
  shorterIdStartEndLength,
} from '../../constants/visuals'

const Pref = () => {
  const _ = useContext(I18nContext)
  const dispatch = useAppDispatch()

  const copied = useRef<HTMLDivElement | null>(null)
  const copiedTimer = useRef<NodeJS.Timeout | null>(null)

  const isMultiplayer = useAppSelector((state) => state.multiplayer.on)
  const yourId = useAppSelector((state) => state.multiplayer.yourId)
  const multiplayerStatus = useAppSelector((state) => state.multiplayer.status)

  const opponentIdInStore = useAppSelector(
    (state) => state.multiplayer.opponentId,
  )

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

    opponentId: opponentIdInStore,
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
      type: UPDATE_SETTINGS_AND_INIT,
      payload,
    })
  }

  const [preset, setPreset] = useState<number>(-10)

  useEffect(() => {
    const winTowerMin = formFields.tower + 1
    // resource victory condition must be 1 higher than any (res + resProd)
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
  }, [
    formFields.tower,
    formFields.wall,
    formFields.bricks,
    formFields.gems,
    formFields.recruits,
    formFields.brickProd,
    formFields.gemProd,
    formFields.recruitProd,
    formFields.winTower,
    formFields.winResource,
    formFields.cardsInHand,
  ])

  useEffect(() => {
    setFormFields((prev) =>
      produce(prev, (draft) => {
        draft.opponentId = opponentIdInStore
      }),
    )
  }, [opponentIdInStore])

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.type === 'number') {
      if (e.target.value === '') {
        e.target.value = '0'
      }

      if (parseInt(e.target.value, 10) < parseInt(e.target.min, 10)) {
        e.target.value = e.target.min
      }

      if (parseInt(e.target.value, 10) > parseInt(e.target.max, 10)) {
        e.target.value = e.target.max
      }
    }

    const { name, value, checked } = e.target
    setFormFields((prev) =>
      produce(prev, (draft) => {
        if (hasOwnProperty(draft, name)) {
          switch (name) {
            case 'playerName':
            case 'opponentName':
            case 'opponentId':
              draft[name] = value
              break
            default:
              draft[name] = parseInt(value, 10)
              break
          }
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

  let notification: string = ''
  switch (multiplayerStatus) {
    case 'connecting_net':
      notification = _.i18n('Connecting to the network ⌛')
      break

    case 'connected_net':
      notification = _.i18n('Connected to the network ✔️')
      break

    case 'connecting_id': {
      const id = opponentIdInStore
      const shorterId = `${id.substring(
        0,
        shorterIdStartEndLength,
      )}...${id.substring(id.length - shorterIdStartEndLength)}`
      notification = _.i18n('Connecting to ID %s ⌛').replace('%s', shorterId)
      break
    }

    case 'connected_id': {
      const id = opponentIdInStore
      const shorterId = `${id.substring(
        0,
        shorterIdStartEndLength,
      )}...${id.substring(id.length - shorterIdStartEndLength)}`
      notification = _.i18n("Connected to ID %s ✔️ You're the host 🏠").replace(
        '%s',
        shorterId,
      )
      break
    }

    case 'connected_by': {
      const id = opponentIdInStore
      const shorterId = `${id.substring(
        0,
        shorterIdStartEndLength,
      )}...${id.substring(id.length - shorterIdStartEndLength)}`
      notification = _.i18n(
        "Connected by ID %s ✔️ You're the guest 💼",
      ).replace('%s', shorterId)
      break
    }

    case 'failed':
      notification = _.i18n('Connection failed ❌')
      break

    case 'disconnected':
      notification = _.i18n('Disconnected 🔌')
      break

    default:
      break
  }

  const isGuest = isMultiplayer && multiplayerStatus === 'connected_by'

  return (
    <Window ScreenActionType={SCREEN_PREF}>
      <h3>{_.i18n('Preferences')}</h3>

      <div className="two-column half">
        <label>
          <span>
            {_.i18n('Your Name')}
            {_.i18n(': ')}
          </span>
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
          <span>
            {_.i18n("Opponent's Name")}
            {_.i18n(': ')}
          </span>
          <input
            type="text"
            name="opponentName"
            id="opponentName"
            disabled={isGuest}
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
        <span>
          {_.i18n('Choose a Tavern (Preset Preferences)')}
          {_.i18n(': ')}
        </span>
        <select
          name="tavern"
          id="tavern"
          value={isGuest ? -2 : preset}
          disabled={isGuest}
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
            disabled={isGuest}
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
            disabled={isGuest}
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
            disabled={isGuest}
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
            min="1"
            disabled={isGuest}
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
            disabled={isGuest}
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
            min="1"
            disabled={isGuest}
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
            disabled={isGuest}
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
            min="1"
            disabled={isGuest}
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
            disabled={isGuest}
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
            disabled={isGuest}
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
          disabled={isGuest}
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

      <h4 className="multiplayer">
        <label>
          <input
            type="checkbox"
            name="isMultiplayer"
            id="isMultiplayer"
            checked={isMultiplayer}
            onChange={(e) => {
              dispatch({
                type: SWITCH_MULTIPLAYER_MODE,
                on: e.target.checked,
              })
            }}
          />
          <span>
            {_.i18n('Multiplayer')}
            {_.i18n(': ')}
            {(isMultiplayer ? _.i18n('on') : _.i18n('off')).toUpperCase()}
          </span>
        </label>
        <span id="multiplayerNotification">{notification}</span>
      </h4>
      <div className="multiplayer">
        <label>
          <span>
            {_.i18n('Your ID')}
            {_.i18n(': ')}
          </span>
          <input
            type="text"
            name="yourId"
            id="yourId"
            value={yourId}
            readOnly
            onClick={(e) => {
              const target = e.target as HTMLInputElement
              if (target.value !== '') {
                target.select()
                copy(target.value)
                if (copied.current !== null) {
                  copied.current.classList.add('copied-shown')
                  if (copiedTimer.current !== null) {
                    clearTimeout(copiedTimer.current)
                  }
                  copiedTimer.current = setTimeout(() => {
                    if (copied.current !== null) {
                      copied.current.classList.remove('copied-shown')
                    }
                  }, copiedDuration)
                }
              }
            }}
          />
          <span ref={copied} className="copied">
            {_.i18n('Copied 📋✔️')}
          </span>
        </label>
      </div>
      <div className="multiplayer">
        <label>
          <span>
            {_.i18n("Enter your opponent's ID")}
            {_.i18n(': ')}
          </span>
          <input
            disabled={
              !isMultiplayer ||
              multiplayerStatus === 'connecting_net' ||
              multiplayerStatus === 'connecting_id' ||
              multiplayerStatus === 'connected_id' ||
              multiplayerStatus === 'connected_by'
            }
            type="text"
            name="opponentId"
            id="opponentId"
            value={formFields.opponentId}
            onChange={handleChange}
          />
        </label>
        <button
          disabled={
            !isMultiplayer ||
            multiplayerStatus === 'connecting_net' ||
            multiplayerStatus === 'connecting_id' ||
            multiplayerStatus === 'connected_id' ||
            multiplayerStatus === 'connected_by'
          }
          className="highlight"
          onClick={(e) => {
            dispatch({
              type: CONNECT_TO_ID,
              id: formFields.opponentId,
            })
          }}
        >
          {_.i18n('Connect')}
        </button>
      </div>

      <div className="button-wrapper">
        <button
          disabled={isGuest}
          onClick={() => {
            const { start, win, cardsInHand } = defaultSettings
            setFormFields(({ opponentId }) => ({
              playerName: defaultPlayerName,
              opponentName: defaultOpponentName,
              ...start,
              winTower: win.tower,
              winResource: win.resource,
              cardsInHand: cardsInHand,
              isMultiplayer, // unchanged
              yourId, // unchanged
              opponentId, // unchanged
            }))
          }}
        >
          {_.i18n('Reset')}
        </button>
        <button
          disabled={isGuest}
          className="warning"
          onClick={applyAndNewGame}
        >
          {_.i18n('Apply & New Game')}
        </button>
      </div>
    </Window>
  )
}

export default memo(Pref)
