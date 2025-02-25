import { ofType, StateObservable } from 'redux-observable'
import { of, concat, EMPTY, Observable } from 'rxjs'
import { filter, mergeMap, takeUntil } from 'rxjs/operators'
import { isOfType } from 'typesafe-actions'
import {
  READLS_UPDATESTORE_INIT,
  UPDATE_SETTINGS_MAIN,
  ABORT_ALL,
  INIT,
  UPDATE_BOLDFONT_MAIN,
  UPDATE_ERATHIAN_MAIN,
  UPDATE_LANG_MAIN,
  UPDATE_VOLUME_MAIN,
  UPDATE_STEREO_MAIN,
  UPDATE_NOANIM_MAIN,
  UPDATE_PIXELATION_MAIN,
  UPDATE_VISUALVALUES_MAIN,
  UPDATE_AILEVEL_MAIN,
} from '@/constants/ActionTypes'
import {
  defaultOpponentNameList,
  defaultPlayerNameList,
} from '@/constants/defaultSettings'
import { AvailableLangType } from '@/i18n/types'
import { RootActionType } from '@/types/actionObj'
import {
  RootStateType,
  SettingsStateType,
  VisualValuesType,
} from '@/types/state'
import { lsGet, lsVersion } from '@/utils/localstorage'
import { sample } from '@/utils/random'

export default (
  action$: Observable<RootActionType>,
  state$: StateObservable<RootStateType>,
) =>
  action$.pipe(
    filter(isOfType(READLS_UPDATESTORE_INIT)),
    mergeMap((action) => {
      lsVersion()
      const lang = lsGet<AvailableLangType>(['lang', 'code'])
      const boldfont = lsGet<boolean>(['lang', 'boldfont'])
      const erathian = lsGet<boolean>(['lang', 'erathian'])
      const settings = lsGet<Partial<SettingsStateType>>(['settings'])
      const volume = lsGet<number>(['sound', 'volume'])
      const stereo = lsGet<boolean>(['sound', 'stereo'])
      const noanim = lsGet<boolean>(['visual', 'noanim'])
      const pixelation = lsGet<number>(['visual', 'pixelation'])
      const visualvalues = lsGet<Partial<VisualValuesType>>([
        'visual',
        'visualvalues',
      ])
      const aiLevel = lsGet<number>(['ai', 'aiLevel'])

      return concat(
        settings !== null
          ? of<RootActionType>({
              type: UPDATE_SETTINGS_MAIN,
              payload: settings,
            })
          : of<RootActionType>({
              type: UPDATE_SETTINGS_MAIN,
              payload: {
                playerName: sample(defaultPlayerNameList),
                opponentName: sample(defaultOpponentNameList),
              },
            }),
        lang !== null
          ? of<RootActionType>({
              type: UPDATE_LANG_MAIN,
              lang,
            })
          : EMPTY,
        boldfont !== null
          ? of<RootActionType>({
              type: UPDATE_BOLDFONT_MAIN,
              boldfont,
            })
          : EMPTY,
        erathian !== null
          ? of<RootActionType>({
              type: UPDATE_ERATHIAN_MAIN,
              erathian,
            })
          : EMPTY,
        volume !== null
          ? of<RootActionType>({
              type: UPDATE_VOLUME_MAIN,
              volume,
            })
          : EMPTY,
        stereo !== null
          ? of<RootActionType>({
              type: UPDATE_STEREO_MAIN,
              stereo,
            })
          : EMPTY,
        noanim !== null
          ? of<RootActionType>({
              type: UPDATE_NOANIM_MAIN,
              noanim,
            })
          : EMPTY,
        pixelation !== null
          ? of<RootActionType>({
              type: UPDATE_PIXELATION_MAIN,
              pixelation,
            })
          : EMPTY,
        visualvalues !== null
          ? of<RootActionType>({
              type: UPDATE_VISUALVALUES_MAIN,
              payload: visualvalues,
            })
          : EMPTY,
        aiLevel !== null
          ? of<RootActionType>({
              type: UPDATE_AILEVEL_MAIN,
              aiLevel,
            })
          : EMPTY,
        of<RootActionType>({
          type: INIT,
        }),
      ).pipe(takeUntil(action$.pipe(ofType(ABORT_ALL))))
    }),
  )
