import { ofType, StateObservable } from 'redux-observable'
import { Observable, of } from 'rxjs'
import { mergeMap, takeUntil } from 'rxjs/operators'
import {
  UPDATE_BOLDFONT,
  UPDATE_BOLDFONT_MAIN,
  ABORT_ALL,
} from '@/constants/ActionTypes'
import { defaultErathian } from '@/constants/defaultSettings'
import { defaultLang } from '@/i18n/langs'
import { RootActionType } from '@/types/actionObj'
import { RootStateType } from '@/types/state'
import { lsSet } from '@/utils/localstorage'

export default (
  action$: Observable<RootActionType>,
  _state$: StateObservable<RootStateType>,
) =>
  action$.pipe(
    ofType(UPDATE_BOLDFONT),
    mergeMap((action) => {
      const { boldfont } = action
      lsSet((draft) => {
        if (draft.lang === undefined) {
          draft.lang = {
            code: defaultLang,
            boldfont,
            erathian: defaultErathian,
          }
        } else {
          draft.lang.boldfont = boldfont
        }
      })
      return of<RootActionType>({
        type: UPDATE_BOLDFONT_MAIN,
        boldfont,
      }).pipe(takeUntil(action$.pipe(ofType(ABORT_ALL))))
    }),
  )
