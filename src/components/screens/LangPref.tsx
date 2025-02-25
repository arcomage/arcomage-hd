import React, { Fragment, useContext } from 'react'
import CheckBox from '@/components/special/CheckBox'
import {
  SCREEN_LANG_PREF,
  UPDATE_BOLDFONT,
  UPDATE_ERATHIAN,
  UPDATE_LANG,
} from '@/constants/ActionTypes'
import { I18nContext } from '@/i18n/I18nContext'
import { langs, langInfo } from '@/i18n/langs'
import { AvailableLangType } from '@/i18n/types'
import cl from '@/utils/clarr'
import { useAppSelector, useAppDispatch } from '@/utils/hooks/useAppDispatch'
import { tooltipAttrs } from '@/utils/tooltip'
import Window from './Window'

const LangPref = () => {
  const lang: AvailableLangType = useAppSelector((state) => state.lang.code)
  const boldfont: boolean = useAppSelector((state) => state.lang.boldfont)
  const erathian: boolean = useAppSelector((state) => state.lang.erathian)
  const _ = useContext(I18nContext)
  const dispatch = useAppDispatch()

  const erathianLabel = (() => {
    const er = _.i18n('ERATHIAN')
    if (er !== undefined) {
      const arr = er.split('%s')
      return [
        <Fragment key={0}>{arr[0]}</Fragment>,
        <span aria-hidden={true} key={1} className="!px-0">
          [<span className={cl('text-2xl p-0', 'erathian')}>Erathian</span>]
        </span>,
        <Fragment key={2}>{arr[1]}</Fragment>,
      ]
    }
    return null
  })()

  return (
    <Window screenActionType={SCREEN_LANG_PREF}>
      <div className="my-5 flex flex-wrap justify-center">
        {[...langs]
          .sort((codeA, codeB) => codeA.localeCompare(codeB))
          .map((code) => (
            <button
              key={code}
              lang={code}
              className={cl('m-2', code === lang && 'active')}
              onClick={() => {
                dispatch({
                  type: UPDATE_LANG,
                  lang: code,
                })
              }}
              {...tooltipAttrs(langInfo[code].en, 'bottom')}
              aria-label={`${langInfo[code].local} [${langInfo[code].en}]`}
            >
              {langInfo[code].local}
            </button>
          ))}
      </div>

      <label className="flex w-full justify-center">
        <CheckBox
          checked={boldfont}
          onChange={(e) => {
            dispatch({
              type: UPDATE_BOLDFONT,
              boldfont: e.target.checked,
            })
          }}
        />
        <span>{_.i18n('Bold font')}</span>
      </label>
      <label className="flex w-full justify-center">
        <CheckBox
          checked={langInfo[lang].isLatinScript ? erathian : false}
          disabled={!langInfo[lang].isLatinScript}
          onChange={(e) => {
            dispatch({
              type: UPDATE_ERATHIAN,
              erathian: e.target.checked,
            })
          }}
        />
        <span>{erathianLabel}</span>
      </label>
    </Window>
  )
}

export default LangPref
