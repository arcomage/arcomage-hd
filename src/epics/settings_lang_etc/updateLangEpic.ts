import { ofType, StateObservable } from 'redux-observable'
import { Observable, of } from 'rxjs'
import { filter, mergeMap, takeUntil } from 'rxjs/operators'
import { isOfType } from 'typesafe-actions'
import {
  UPDATE_LANG,
  UPDATE_LANG_MAIN,
  ABORT_ALL,
} from '@/constants/ActionTypes'
import { defaultBoldfont, defaultErathian } from '@/constants/defaultSettings'
import { RootActionType } from '@/types/actionObj'
import { RootStateType } from '@/types/state'
import { lsSet } from '@/utils/localstorage'

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
          draft.lang = {
            code: lang,
            boldfont: defaultBoldfont,
            erathian: defaultErathian,
          }
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
