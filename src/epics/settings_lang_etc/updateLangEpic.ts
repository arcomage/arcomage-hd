import {
  UPDATE_LANG,
  UPDATE_LANG_MAIN,
  ABORT_ALL,
} from '../../constants/ActionTypes'
import { RootActionType } from '../../types/actionObj'
import { filter, concatMap, takeUntil } from 'rxjs/operators'
import { of, concat } from 'rxjs'
import { isOfType } from 'typesafe-actions'
import { ActionsObservable, StateObservable } from 'redux-observable'
import { RootStateType } from '../../types/state'
import { lsSet } from '../../utils/localstorage'
import { defaultErathian } from '../../constants/defaultSettings'

export default (
  action$: ActionsObservable<RootActionType>,
  state$: StateObservable<RootStateType>,
) =>
  action$.pipe(
    filter(isOfType(UPDATE_LANG)),
    concatMap((action) => {
      const { lang } = action
      lsSet((draft) => {
        if (draft.lang === undefined) {
          draft.lang = { code: lang, erathian: defaultErathian }
        } else {
          draft.lang.code = lang
        }
      })
      return concat(
        of<RootActionType>({
          type: UPDATE_LANG_MAIN,
          lang,
        }),
      ).pipe(takeUntil(action$.ofType(ABORT_ALL)))
    }),
  )
