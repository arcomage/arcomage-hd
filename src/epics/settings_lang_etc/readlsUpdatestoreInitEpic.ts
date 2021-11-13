import {
  READLS_UPDATESTORE_INIT,
  UPDATE_SETTINGS_MAIN,
  ABORT_ALL,
  INIT,
  UPDATE_ERATHIAN_MAIN,
  UPDATE_LANG_MAIN,
  UPDATE_VOLUME_MAIN,
  UPDATE_PIXELATION_MAIN,
  UPDATE_AILEVEL_MAIN,
} from '../../constants/ActionTypes'
import { RootActionType } from '../../types/actionObj'
import { filter, mergeMap, takeUntil } from 'rxjs/operators'
import { of, concat, EMPTY, Observable } from 'rxjs'
import { isOfType } from 'typesafe-actions'
import { ofType, StateObservable } from 'redux-observable'
import { RootStateType } from '../../types/state'
import { lsGet, lsVersion } from '../../utils/localstorage'
import { sample } from '../../utils/random'
import {
  defaultOpponentNameList,
  defaultPlayerNameList,
} from '../../constants/defaultSettings'

export default (
  action$: Observable<RootActionType>,
  state$: StateObservable<RootStateType>,
) =>
  action$.pipe(
    filter(isOfType(READLS_UPDATESTORE_INIT)),
    mergeMap((action) => {
      lsVersion()
      const lang = lsGet(['lang', 'code'])
      const erathian = lsGet(['lang', 'erathian'])
      const settings = lsGet(['settings'])
      const volume = lsGet(['volume'])
      const pixelation = lsGet(['visual', 'pixelation'])
      const aiLevel = lsGet(['ai', 'aiLevel'])
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
        pixelation !== null
          ? of<RootActionType>({
              type: UPDATE_PIXELATION_MAIN,
              pixelation,
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
