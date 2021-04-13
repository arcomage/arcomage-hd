import {
  UPDATE_ERATHIAN,
  UPDATE_ERATHIAN_MAIN,
  ABORT_ALL,
} from '../../constants/ActionTypes'
import { RootActionType } from '../../types/actionObj'
import { filter, concatMap, takeUntil } from 'rxjs/operators'
import { of, concat } from 'rxjs'
import { isOfType } from 'typesafe-actions'
import { ActionsObservable, StateObservable } from 'redux-observable'
import { RootStateType } from '../../types/state'
import { lsSet } from '../../utils/localstorage'
import { defaultLang } from '../../i18n/langs'

export default (
  action$: ActionsObservable<RootActionType>,
  state$: StateObservable<RootStateType>,
) =>
  action$.pipe(
    filter(isOfType(UPDATE_ERATHIAN)),
    concatMap((action) => {
      const { erathian } = action
      lsSet((draft) => {
        if (draft.lang === undefined) {
          draft.lang = { code: defaultLang, erathian }
        } else {
          draft.lang.erathian = erathian
        }
      })
      return concat(
        of<RootActionType>({
          type: UPDATE_ERATHIAN_MAIN,
          erathian,
        }),
      ).pipe(takeUntil(action$.ofType(ABORT_ALL)))
    }),
  )
