import { ofType, StateObservable } from 'redux-observable'
import { Observable, of } from 'rxjs'
import { mergeMap, takeUntil } from 'rxjs/operators'
import {
  UPDATE_ERATHIAN,
  UPDATE_ERATHIAN_MAIN,
  ABORT_ALL,
} from '@/constants/ActionTypes'
import { defaultBoldfont } from '@/constants/defaultSettings'
import { defaultLang } from '@/i18n/langs'
import { RootActionType } from '@/types/actionObj'
import { RootStateType } from '@/types/state'
import { lsSet } from '@/utils/localstorage'

export default (
  action$: Observable<RootActionType>,
  state$: StateObservable<RootStateType>,
) =>
  action$.pipe(
    ofType(UPDATE_ERATHIAN),
    mergeMap((action) => {
      const { erathian } = action
      lsSet((draft) => {
        if (draft.lang === undefined) {
          draft.lang = {
            code: defaultLang,
            boldfont: defaultBoldfont,
            erathian,
          }
        } else {
          draft.lang.erathian = erathian
        }
      })
      return of<RootActionType>({
        type: UPDATE_ERATHIAN_MAIN,
        erathian,
      }).pipe(takeUntil(action$.pipe(ofType(ABORT_ALL))))
    }),
  )
