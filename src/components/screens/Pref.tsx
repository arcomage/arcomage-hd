import React, {
  ChangeEvent,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react'
import { produce } from 'immer'
import { copy } from '../../utils/textediting/copy'
import {
  useAppSelector,
  useAppDispatch,
} from '../../utils/hooks/useAppDispatch'
import Window from './Window'

import {
  UPDATE_SETTINGS_INIT,
  SCREEN_PREF,
  SWITCH_MULTIPLAYER_MODE,
  CONNECT_TO_ID,
  SEND_TEMP_SETTINGS,
  SEND_NAME,
  SET_TEMP_PLAYER_NAME,
  UPDATE_AILEVEL,
} from '../../constants/ActionTypes'
import { I18nContext } from '../../i18n/I18nContext'
import { upper1st } from '../../utils/upper1st'
import { preSettings, continents } from '../../data/preSettings'
import {
  defaultPlayerNameList,
  defaultOpponentNameList,
  defaultSettings,
  defaultAiLevel,
} from '../../constants/defaultSettings'
import { hasOwnProperty } from '../../utils/typeHelpers'
import {
  copiedDuration,
  shorterIdStartEndLength,
} from '../../constants/visuals'
import {
  allStatusNames,
  otherSettingNames,
  poNames,
} from '../../constants/resourceNames'
import {
  FormFieldsType,
  FormFieldsAllPartialType,
} from '../../types/formFields'
import {
  allCondAndOtherSettingsEqual,
  getAllCondAndOtherSettingsArray,
} from '../../utils/startWinState'
import { sample } from '../../utils/random'
import isEmoji from '../../utils/isEmoji'
import { maxCardsInHand, minGeneratorIsOne } from '../../constants/ranges'
import { variousLengthChunk } from '../../utils/variousLengthChunk'
import NumberInput from '../special/NumberInput'
import CheckBox from '../special/CheckBox'
import { tooltipAttrs } from '../../utils/tooltip'

const Pref = () => {
  const _ = useContext(I18nContext)
  const dispatch = useAppDispatch()

  const yourIdInputRef = useRef<HTMLInputElement>(null)
  const copiedTimer = useRef<NodeJS.Timeout>(null)
  const [copied, setCopied] = useState<boolean>(false)

  const isMultiplayer = useAppSelector((state) => state.multiplayer.on)
  const yourId = useAppSelector((state) => state.multiplayer.yourId)
  const multiplayerStatus = useAppSelector((state) => state.multiplayer.status)

  const tempSettingsStore = useAppSelector(
    (state) => state.multiplayer.tempSettings,
  )
  const tempPlayerName = useAppSelector(
    (state) => state.multiplayer.tempPlayerName,
  )
  const tempOpponentName = useAppSelector(
    (state) => state.multiplayer.tempOpponentName,
  )

  const multiGameNumber = useAppSelector(
    (state) => state.multiplayer.gameNumber,
  )

  const aiLevel = useAppSelector((state) => state.ai.aiLevel)

  const settingStore = {
    playerName: useAppSelector((state) => state.settings.playerName),
    opponentName: useAppSelector((state) => state.settings.opponentName),

    tower: useAppSelector((state) => state.settings.tower),
    wall: useAppSelector((state) => state.settings.wall),
    bricks: useAppSelector((state) => state.settings.bricks),
    gems: useAppSelector((state) => state.settings.gems),
    recruits: useAppSelector((state) => state.settings.recruits),
    brickProd: useAppSelector((state) => state.settings.brickProd),
    gemProd: useAppSelector((state) => state.settings.gemProd),
    recruitProd: useAppSelector((state) => state.settings.recruitProd),

    winTower: useAppSelector((state) => state.settings.winTower),
    winResource: useAppSelector((state) => state.settings.winResource),

    cardsInHand: useAppSelector((state) => state.settings.cardsInHand),

    opponentId: useAppSelector((state) => state.multiplayer.opponentId),
  }

  const [formFields, setFormFields] = useState<FormFieldsType>(settingStore)

  const [aiLevelFormField, setAiLevelFormField] = useState<number>(aiLevel)

  const applyAndNewGame = () => {
    dispatch({
      type: SCREEN_PREF,
      show: false,
    })

    dispatch({
      type: UPDATE_AILEVEL,
      aiLevel: aiLevelFormField,
    })

    const { opponentId, ...rest } = formFields

    dispatch({
      type: UPDATE_SETTINGS_INIT,
      payload: rest,
    })
  }

  const checkPreset = (o: FormFieldsType | FormFieldsAllPartialType) => {
    const indexMatched = preSettings
      .concat(defaultSettings)
      .findIndex((settings) => allCondAndOtherSettingsEqual(o, settings))
    if (indexMatched === preSettings.length) {
      return -2
    } else {
      return indexMatched
    }
  }
  const [preset, setPreset] = useState<number>(-10)

  const [notification, setNotification] = useState<string>('')
  const [isGuest, setIsGuest] = useState<boolean>(false)
  const [isHost, setIsHost] = useState<boolean>(false)

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

    if (isHost) {
      const { playerName, opponentName, opponentId, ...rest } = formFields
      dispatch({
        type: SEND_TEMP_SETTINGS,
        payload: rest,
      })
    }
  }, getAllCondAndOtherSettingsArray(formFields))

  const [tempPreset, setTempPreset] = useState<number>(-10)

  useEffect(() => {
    setTempPreset(checkPreset(tempSettingsStore))
  }, getAllCondAndOtherSettingsArray(tempSettingsStore))

  const prevMultiplayerStatus = useRef('')
  useEffect(() => {
    if (
      (prevMultiplayerStatus.current === 'connecting_to_id' ||
        prevMultiplayerStatus.current === 'connected_net') &&
      multiplayerStatus === 'connected_to_id'
    ) {
      // has just become host
      const { playerName, opponentName, opponentId, ...rest } = formFields
      dispatch({
        type: SEND_TEMP_SETTINGS,
        payload: rest,
      })
      dispatch({
        type: SEND_NAME,
        name: playerName,
      })
      dispatch({
        type: SET_TEMP_PLAYER_NAME,
        name: playerName,
      })
    } else if (
      prevMultiplayerStatus.current !== '' &&
      multiplayerStatus === 'connected_by_id'
    ) {
      // has just become guest
      const { playerName } = formFields
      dispatch({
        type: SEND_NAME,
        name: playerName,
      })
      dispatch({
        type: SET_TEMP_PLAYER_NAME,
        name: playerName,
      })
    }

    prevMultiplayerStatus.current = multiplayerStatus
  }, [multiplayerStatus, settingStore.opponentId])

  useEffect(() => {
    setFormFields((prev) =>
      produce(prev, (draft) => {
        draft.opponentId = settingStore.opponentId
      }),
    )
  }, [settingStore.opponentId])

  // only `formFields`-controlled fields use `handleChange`
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, type, inputMode } = e.target
    let { value } = e.target
    setFormFields((prev) =>
      produce(prev, (draft) => {
        if (hasOwnProperty(draft, name)) {
          if (inputMode === 'numeric') {
            draft[name] = parseInt(value, 10)
          } else if (type === 'text') {
            draft[name] = value
          }
        }
      }),
    )
  }

  const handleChangeMultiName = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    if (name === poNames[0]) {
      // (player)
      dispatch({
        type: SEND_NAME,
        name: value,
      })
      dispatch({
        type: SET_TEMP_PLAYER_NAME,
        name: value,
      })
    } // else { // poNames[1] {opponent}
    //}
  }

  const setFFPreset = (index: number) => {
    const _index = index === -2 ? preSettings.length : index
    if (_index >= 0) {
      const targetSettings = preSettings.concat(defaultSettings)[_index]

      setFormFields((prev) => ({ ...prev, ...targetSettings }))
    }
  }

  useEffect(() => {
    switch (multiplayerStatus) {
      case 'connecting_net':
        setNotification(_.i18n('Connecting to the network ⌛'))
        break

      case 'connected_net':
        setNotification(
          _.i18n('Connected to the network (but not to anyone) 🟡'),
        )
        break

      case 'connecting_to_id': {
        const id = formFields.opponentId
        const shorterId =
          id.length > 10
            ? `${id.substring(0, shorterIdStartEndLength)}...${id.substring(
                id.length - shorterIdStartEndLength,
              )}`
            : id
        setNotification(
          _.i18n('Connecting to ID %s ⌛').replace('%s', shorterId),
        )
        break
      }

      case 'connected_to_id': {
        const id = formFields.opponentId
        const shorterId = `${id.substring(
          0,
          shorterIdStartEndLength,
        )}...${id.substring(id.length - shorterIdStartEndLength)}`
        setNotification(
          _.i18n("Connected to ID %s ✅ You're the host 🏠").replace(
            '%s',
            shorterId,
          ),
        )
        break
      }

      case 'connected_by_id': {
        const id = settingStore.opponentId
        const shorterId = `${id.substring(
          0,
          shorterIdStartEndLength,
        )}...${id.substring(id.length - shorterIdStartEndLength)}`
        setNotification(
          _.i18n("Connected by ID %s ✅ You're the guest 💼").replace(
            '%s',
            shorterId,
          ),
        )
        break
      }

      case 'failed':
        setNotification(_.i18n('Connection failed ❌'))
        break

      case 'disconnected':
        setNotification(_.i18n('Disconnected 🔌'))
        break

      default:
        break
    }
  }, [multiplayerStatus, _])

  useEffect(() => {
    setIsGuest(isMultiplayer && multiplayerStatus === 'connected_by_id')
    setIsHost(isMultiplayer && multiplayerStatus === 'connected_to_id')
  }, [multiplayerStatus])

  return (
    <Window
      screenActionType={SCREEN_PREF}
      onCancel={() => {
        if (isHost) {
          const { playerName, opponentName, opponentId, ...rest } = settingStore
          dispatch({
            type: SEND_TEMP_SETTINGS,
            payload: rest,
          })
        }
      }}
    >
      <div className="flex justify-between">
        <h3 className="preferences">
          {_.i18n('Preferences')}
          {_.i18n(': ')}
        </h3>
        <span id="against-human-or-ai">
          {multiGameNumber > 0
            ? _.i18n('You are playing against human')
            : _.i18n('You are playing against computer AI')}
        </span>
      </div>
      <div className="two-column half">
        <label htmlFor={poNames[0]}>
          <span>
            {_.i18n('Your Name')}
            {_.i18n(': ')}
          </span>
          <input
            type="text"
            name={poNames[0]}
            id={poNames[0]}
            className="emoji"
            value={isGuest || isHost ? tempPlayerName : formFields.playerName}
            onChange={isGuest || isHost ? handleChangeMultiName : handleChange}
            onFocus={(e) => {
              if (isEmoji(e.target.value)) {
                e.target.select()
              }
            }}
          />
        </label>
        <label htmlFor={poNames[1]}>
          <span>
            {_.i18n("Opponent's Name")}
            {_.i18n(': ')}
          </span>
          <input
            type="text"
            name={poNames[1]}
            id={poNames[1]}
            className="emoji"
            disabled={isGuest || isHost}
            value={
              isGuest || isHost ? tempOpponentName : formFields.opponentName
            }
            onChange={isGuest || isHost ? handleChangeMultiName : handleChange}
            onFocus={(e) => {
              if (isEmoji(e.target.value)) {
                e.target.select()
              }
            }}
          />
        </label>
      </div>

      <label htmlFor="tavern" className="one-colume">
        <span>
          {_.i18n('Choose a Tavern (Preset Preferences)')}
          {_.i18n(': ')}
        </span>
        <select
          name="tavern"
          id="tavern"
          value={isGuest ? tempPreset : preset}
          disabled={isGuest}
          onChange={(e) => {
            setFFPreset(parseInt(e.target.value, 10))
          }}
        >
          <option value={-2}>{_.i18n('Default')}</option>
          {continents.map((part, ci) => (
            <optgroup
              className="font-light not-italic"
              label={`${_.i18n(
                ['Castle in Enroth', 'Antagarich', 'Jadame'][part.c - 6],
              )} ${['🏰', '🍺', '🍺'][part.c - 6]}`}
              key={ci}
            >
              {
                variousLengthChunk<JSX.Element>(
                  preSettings.map((s, i) => (
                    <option value={i} key={i}>
                      {_.taverns(i, 'name')} - {_.taverns(i, 'location')}
                    </option>
                  )),
                  continents.map((c) => c.count),
                )[ci]
              }
            </optgroup>
          ))}
          {(preset === -1 || isGuest) && (
            <option value={-1}>{_.i18n('Customized')}</option>
          )}
        </select>
      </label>

      <h4>
        {_.i18n('Starting Conditions')}
        {_.i18n(': ')}
      </h4>

      <div className="four-column">
        <label htmlFor={allStatusNames[0]}>
          <span>{upper1st(_.i18n('tower'))}</span>
          <NumberInput
            name={allStatusNames[0]}
            id={allStatusNames[0]}
            min="1"
            disabled={isGuest}
            value={
              isGuest && tempSettingsStore !== null
                ? tempSettingsStore.tower
                : formFields.tower
            }
            onChange={handleChange}
          />
        </label>
        <label htmlFor={allStatusNames[2]}>
          <span>{upper1st(_.i18n('bricks'))}</span>
          <NumberInput
            name={allStatusNames[2]}
            id={allStatusNames[2]}
            min="0"
            disabled={isGuest}
            value={
              isGuest && tempSettingsStore !== null
                ? tempSettingsStore.bricks
                : formFields.bricks
            }
            onChange={handleChange}
          />
        </label>
        <label htmlFor={allStatusNames[3]}>
          <span>{upper1st(_.i18n('gems'))}</span>
          <NumberInput
            name={allStatusNames[3]}
            id={allStatusNames[3]}
            min="0"
            disabled={isGuest}
            value={
              isGuest && tempSettingsStore !== null
                ? tempSettingsStore.gems
                : formFields.gems
            }
            onChange={handleChange}
          />
        </label>
        <label htmlFor={allStatusNames[4]}>
          <span>{upper1st(_.i18n('recruits'))}</span>
          <NumberInput
            name={allStatusNames[4]}
            id={allStatusNames[4]}
            min="0"
            disabled={isGuest}
            value={
              isGuest && tempSettingsStore !== null
                ? tempSettingsStore.recruits
                : formFields.recruits
            }
            onChange={handleChange}
          />
        </label>
      </div>

      <div className="four-column">
        <label htmlFor={allStatusNames[1]}>
          <span>{upper1st(_.i18n('wall'))}</span>
          <NumberInput
            name={allStatusNames[1]}
            id={allStatusNames[1]}
            min="0"
            disabled={isGuest}
            value={
              isGuest && tempSettingsStore !== null
                ? tempSettingsStore.wall
                : formFields.wall
            }
            onChange={handleChange}
          />
        </label>
        <label htmlFor={allStatusNames[5]}>
          <span>{upper1st(_.i18n('quarry'))}</span>
          <NumberInput
            name={allStatusNames[5]}
            id={allStatusNames[5]}
            min={minGeneratorIsOne ? 1 : 0}
            disabled={isGuest}
            value={
              isGuest && tempSettingsStore !== null
                ? tempSettingsStore.brickProd
                : formFields.brickProd
            }
            onChange={handleChange}
          />
        </label>
        <label htmlFor={allStatusNames[6]}>
          <span>{upper1st(_.i18n('magic'))}</span>
          <NumberInput
            name={allStatusNames[6]}
            id={allStatusNames[6]}
            min={minGeneratorIsOne ? 1 : 0}
            disabled={isGuest}
            value={
              isGuest && tempSettingsStore !== null
                ? tempSettingsStore.gemProd
                : formFields.gemProd
            }
            onChange={handleChange}
          />
        </label>
        <label htmlFor={allStatusNames[7]}>
          <span>{upper1st(_.i18n('dungeon'))}</span>
          <NumberInput
            name={allStatusNames[7]}
            id={allStatusNames[7]}
            min={minGeneratorIsOne ? 1 : 0}
            disabled={isGuest}
            value={
              isGuest && tempSettingsStore !== null
                ? tempSettingsStore.recruitProd
                : formFields.recruitProd
            }
            onChange={handleChange}
          />
        </label>
      </div>

      <h4>
        {_.i18n('Victory Conditions')}
        {_.i18n(': ')}
      </h4>
      <div className="two-column">
        <label htmlFor={otherSettingNames[0]}>
          <span>{upper1st(_.i18n('tower'))}</span>
          <NumberInput
            name={otherSettingNames[0]}
            id={otherSettingNames[0]}
            min={formFields.tower + 1}
            disabled={isGuest}
            value={
              isGuest && tempSettingsStore !== null
                ? tempSettingsStore.winTower
                : formFields.winTower
            }
            onChange={handleChange}
            {...tooltipAttrs(
              _.i18n('Minimum is starting %s1 + 1 = %s0')
                .replace('%s1', upper1st(_.i18n('tower')))
                .replace('%s0', (formFields.tower + 1).toString()),
              'bottom',
            )}
          />
        </label>
        <label htmlFor={otherSettingNames[1]}>
          <span>{upper1st(_.i18n('resource'))}</span>
          <NumberInput
            name={otherSettingNames[1]}
            id={otherSettingNames[1]}
            min={
              Math.max(
                formFields.bricks + formFields.brickProd,
                formFields.gems + formFields.gemProd,
                formFields.recruits + formFields.recruitProd,
              ) + 1
            }
            disabled={isGuest}
            value={
              isGuest && tempSettingsStore !== null
                ? tempSettingsStore.winResource
                : formFields.winResource
            }
            onChange={handleChange}
            {...tooltipAttrs(
              _.i18n('Minimum is MAX(%s1+%s2, %s3+%s4, %s5+%s6) + 1 = %s0')
                .replace('%s1', upper1st(_.i18n('bricks')))
                .replace('%s2', upper1st(_.i18n('quarry')))
                .replace('%s3', upper1st(_.i18n('gems')))
                .replace('%s4', upper1st(_.i18n('magic')))
                .replace('%s5', upper1st(_.i18n('recruits')))
                .replace('%s6', upper1st(_.i18n('dungeon')))
                .replace(
                  '%s0',
                  (
                    Math.max(
                      formFields.bricks + formFields.brickProd,
                      formFields.gems + formFields.gemProd,
                      formFields.recruits + formFields.recruitProd,
                    ) + 1
                  ).toString(),
                ),
              'bottom',
            )}
          />
        </label>
      </div>

      <h4>
        {_.i18n('Other Preferences')}
        {_.i18n(': ')}
      </h4>

      <div className="two-column">
        <label htmlFor={otherSettingNames[2]}>
          <span>{_.i18n('Cards in Hand')}</span>
          <NumberInput
            name={otherSettingNames[2]}
            id={otherSettingNames[2]}
            min="0"
            max={maxCardsInHand}
            disabled={isGuest}
            value={
              isGuest && tempSettingsStore !== null
                ? tempSettingsStore.cardsInHand
                : formFields.cardsInHand
            }
            onChange={handleChange}
          />
        </label>
        <label htmlFor={otherSettingNames[3]}>
          <span className="onethird">{_.i18n('AI Level')}</span>
          <select
            name={otherSettingNames[3]}
            id={otherSettingNames[3]}
            className="twothird"
            value={aiLevelFormField}
            disabled={multiGameNumber > 0}
            onChange={(e) => {
              setAiLevelFormField(parseInt(e.target.value, 10))
            }}
          >
            <option className="emoji" value={0}>
              {_.i18n('Genius')} 💡
            </option>
            <option className="emoji" value={1}>
              {_.i18n('Smart')} 📚
            </option>
            <option className="emoji" value={2}>
              {_.i18n('Mediocre')} 😐
            </option>
            <option className="emoji" value={3}>
              {_.i18n('Stupid')} 👹
            </option>
            <option className="emoji" value={4}>
              {_.i18n('Idiotic')} 🤡
            </option>
          </select>
        </label>
      </div>

      <div className="flex justify-between multiplayer">
        <h4>
          <label htmlFor="isMultiplayer">
            <CheckBox
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
              <span
                className="emoji"
                {...tooltipAttrs(
                  _.i18n(
                    'Multiplayer Mode is experimental and works only for users behind non-symmetric NAT',
                  ),
                )}
              >
                🧪
              </span>

              {_.i18n(': ')}
              {(isMultiplayer ? _.i18n('on') : _.i18n('off')).toUpperCase()}
            </span>
          </label>
        </h4>
        <span id="multiplayerNotification" className="emoji">
          {notification}
        </span>
      </div>
      <div className="multiplayer">
        <label htmlFor="yourId">
          <span>
            {_.i18n('Your ID')}
            {_.i18n(': ')}
          </span>
          <input
            ref={yourIdInputRef}
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
                  .then(() => {
                    setCopied(true)
                    if (copiedTimer.current !== null) {
                      clearTimeout(copiedTimer.current)
                    }
                    copiedTimer.current = setTimeout(() => {
                      setCopied(false)
                    }, copiedDuration)
                  })
                  .catch((error) => {
                    console.error('Failed to copy text: ', error)
                  })
              }
            }}
          />
          <button
            disabled={!isMultiplayer}
            onClick={() => {
              yourIdInputRef.current?.click()
            }}
          >
            {copied ? _.i18n('Copied 📋✅') : _.i18n('Copy')}
          </button>
        </label>
      </div>
      <div className="multiplayer">
        <label htmlFor="opponentId">
          <span>
            {_.i18n("Enter your opponent's ID")}
            {_.i18n(': ')}
          </span>
          <input
            disabled={
              !isMultiplayer ||
              multiplayerStatus === 'connecting_net' ||
              multiplayerStatus === 'connecting_to_id' ||
              multiplayerStatus === 'connected_to_id' ||
              multiplayerStatus === 'connected_by_id'
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
            multiplayerStatus === 'connecting_to_id' ||
            multiplayerStatus === 'connected_to_id' ||
            multiplayerStatus === 'connected_by_id' ||
            formFields.opponentId === ''
          }
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
          accessKey="r"
          disabled={isGuest}
          onClick={(e) => {
            setFormFields(({ opponentId }) => ({
              playerName: sample(defaultPlayerNameList),
              opponentName: sample(defaultOpponentNameList),
              ...defaultSettings,
              isMultiplayer, // unchanged
              yourId, // unchanged
              opponentId, // unchanged
            }))
            if (multiGameNumber <= 0) {
              setAiLevelFormField(defaultAiLevel)
            }
          }}
        >
          {_.i18n('Reset')}
        </button>
        <button
          accessKey="a"
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

export default Pref
