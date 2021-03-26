import React, { memo, useContext, useRef } from 'react'
import cx from 'classnames'
import { createUseStyles } from 'react-jss'
import { useAppSelector, useAppDispatch } from '../utils/useAppDispatch'

import { I18nContext } from '../i18n/I18nContext'

import logo from '../../assets/logo/logo.svg'
import { langs } from '../i18n/langs'
import { entries } from '../utils/typeHelpers'
import { AvailableLangType } from '../i18n/types'
import useClickOutside from '../utils/useClickOutside'
import { SCREEN_LANG_PREF } from '../constants/ActionTypes'

const useStyles = createUseStyles({
  logo: {
    'background-image': `url(${logo})`,
    width: '134.5px',
    height: '46.5px',
  },
})

// type PropType = { }
const LangPref = () => {
  const lang: AvailableLangType = useAppSelector((state) => state.lang)

  const dispatch = useAppDispatch()

  const prefRef = useRef(null)
  useClickOutside(prefRef, () => {
    dispatch({
      type: SCREEN_LANG_PREF,
      show: false,
    })
  })

  const trans = useContext(I18nContext)
  const classes = useStyles()
  return (
    <div className={cx('window-bg')}>
      <div className={cx('window-outerwrapper')}>
        <div ref={prefRef} className={cx('window-wrapper')}>
          <div
            className={cx(
              classes.logo,
              'm-auto bg-no-repeat bg-center bg-contain',
            )}
          ></div>

          <div className="my-5 grid grid-cols-2 sm:grid-cols-4 gap-1 sm:gap-4 justify-items-center">
            {entries(langs)
              .sort(([codeA], [codeB]) => codeA.localeCompare(codeB))
              .map(([code, name]) => (
                <button
                  key={code}
                  className={cx({ active: code === lang })}
                  onClick={() => {
                    dispatch({
                      type: 'UPDATE_LANG',
                      lang: code,
                    })
                  }}
                >
                  {name}
                </button>
              ))}
          </div>
          <button
            className="cancel"
            title={trans.i18n?.['Cancel']}
            onClick={() => {
              dispatch({
                type: SCREEN_LANG_PREF,
                show: false,
              })
            }}
          >
            ✖
          </button>
        </div>
      </div>
    </div>
  )
}

export default memo(LangPref)
