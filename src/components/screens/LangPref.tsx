import React, { memo } from 'react'
import cx from 'classnames'
import { useAppSelector, useAppDispatch } from '../../utils/useAppDispatch'
import Window from './Window'

import { langs } from '../../i18n/langs'
import { entries } from '../../utils/typeHelpers'
import { AvailableLangType } from '../../i18n/types'
import { SCREEN_LANG_PREF, UPDATE_LANG } from '../../constants/ActionTypes'

const LangPref = () => {
  const lang: AvailableLangType = useAppSelector((state) => state.lang)

  const dispatch = useAppDispatch()

  return (
    <Window ScreenActionType={SCREEN_LANG_PREF}>
      <div className="my-5 grid grid-cols-2 sm:grid-cols-4 gap-1 sm:gap-4 justify-items-center no-erathian">
        {entries(langs)
          .sort(([codeA], [codeB]) => codeA.localeCompare(codeB))
          .map(([code, name]) => (
            <button
              key={code}
              className={cx({ active: code === lang })}
              onClick={() => {
                dispatch({
                  type: UPDATE_LANG,
                  lang: code,
                })
              }}
            >
              {name}
            </button>
          ))}
      </div>
      <label className="justify-center">
        <input
          type="checkbox"
          // checked={volume === 0}
          onChange={(e) => {
            // dispatch({
            //   type: UPDATE_VOLUME,
            //   volume: e.target.checked ? 0 : 10,
            // })
          }}
        />
        <span className="no-erathian">
          Use Erathian [<span className="erathian text-2xl p-0">Erathian</span>]
          (for latin letter based languages only)
        </span>
      </label>
    </Window>
  )
}

export default memo(LangPref)
