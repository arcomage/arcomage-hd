import {
  READLS_UPDATESTORE_INIT,
  UPDATE_SETTINGS_MAIN,
  ABORT_ALL,
  INIT,
  UPDATE_ERATHIAN_MAIN,
  UPDATE_LANG_MAIN,
  UPDATE_VOLUME_MAIN,
} from '../../constants/ActionTypes'
import { RootActionType } from '../../types/actionObj'
import { filter, concatMap, takeUntil } from 'rxjs/operators'
import { of, concat, EMPTY } from 'rxjs'
import { isOfType } from 'typesafe-actions'
import { ActionsObservable, StateObservable } from 'redux-observable'
import { RootStateType } from '../../types/state'
import { lsGet, lsVersion } from '../../utils/localstorage'

export default (
  action$: ActionsObservable<RootActionType>,
  state$: StateObservable<RootStateType>,
) =>
  action$.pipe(
    filter(isOfType(READLS_UPDATESTORE_INIT)),
    concatMap((action) => {
      lsVersion()
      const lang = lsGet(['lang', 'code'])
      const erathian = lsGet(['lang', 'erathian'])
      const settings = lsGet(['settings'])
      const volume = lsGet(['volume'])
      return concat(
        settings !== null
          ? of<RootActionType>({
              type: UPDATE_SETTINGS_MAIN,
              payload: settings,
            })
          : EMPTY,
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
        of<RootActionType>({
          type: INIT,
        }),
      ).pipe(takeUntil(action$.ofType(ABORT_ALL)))
    }),
  )
