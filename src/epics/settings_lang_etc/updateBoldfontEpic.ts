import {
  UPDATE_BOLDFONT,
  UPDATE_BOLDFONT_MAIN,
  ABORT_ALL,
} from '../../constants/ActionTypes'
import { RootActionType } from '../../types/actionObj'
import { filter, mergeMap, takeUntil } from 'rxjs/operators'
import { Observable, of } from 'rxjs'
import { isOfType } from 'typesafe-actions'
import { ofType, StateObservable } from 'redux-observable'
import { RootStateType } from '../../types/state'
import { lsSet } from '../../utils/localstorage'
import { defaultLang } from '../../i18n/langs'
import { defaultErathian } from '../../constants/defaultSettings'

export default (
  action$: Observable<RootActionType>,
  state$: StateObservable<RootStateType>,
) =>
  action$.pipe(
    filter(isOfType(UPDATE_BOLDFONT)),
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
