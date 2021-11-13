import {
  UPDATE_LANG,
  UPDATE_LANG_MAIN,
  ABORT_ALL,
} from '../../constants/ActionTypes'
import { RootActionType } from '../../types/actionObj'
import { filter, mergeMap, takeUntil } from 'rxjs/operators'
import { Observable, of } from 'rxjs'
import { isOfType } from 'typesafe-actions'
import { ofType, StateObservable } from 'redux-observable'
import { RootStateType } from '../../types/state'
import { lsSet } from '../../utils/localstorage'
import { defaultErathian } from '../../constants/defaultSettings'

export default (
  action$: Observable<RootActionType>,
  state$: StateObservable<RootStateType>,
) =>
  action$.pipe(
    filter(isOfType(UPDATE_LANG)),
    mergeMap((action) => {
      const { lang } = action
      lsSet((draft) => {
        if (draft.lang === undefined) {
          draft.lang = { code: lang, erathian: defaultErathian }
        } else {
          draft.lang.code = lang
        }
      })
      return of<RootActionType>({
        type: UPDATE_LANG_MAIN,
        lang,
      }).pipe(takeUntil(action$.pipe(ofType(ABORT_ALL))))
    }),
  )
