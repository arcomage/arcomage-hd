import React, { useContext } from 'react'
import cx from 'clsx'
import {
  useAppSelector,
  useAppDispatch,
} from '../../utils/hooks/useAppDispatch'

import { SCREEN_LANG_PREF } from '../../constants/ActionTypes'
import { I18nContext } from '../../i18n/I18nContext'
import { tooltipAttrs } from '../../utils/tooltip'
import styles from './ButtonLangPref.module.scss'

const ButtonLangPref = () => {
  const _ = useContext(I18nContext)

  const langPref = useAppSelector((state) => state.screen.langPref)
  const isEndScreen = useAppSelector((state) => !!state.screen.end.type)

  const dispatch = useAppDispatch()

  const clickFunc = () => {
    dispatch({
      type: SCREEN_LANG_PREF,
      show: true,
    })
  }

  return (
    <button
      {...(isEndScreen ? { tabIndex: -1 } : {})}
      accessKey="l"
      className={cx('topbutton', styles.langPrefButton, {
        [styles.windowactive]: langPref,
      })}
      onClick={clickFunc}
      onAuxClick={clickFunc}
      {...tooltipAttrs(_.i18n('Language'), 'bottom')}
      aria-label={_.i18n('Language')}
    >
      <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <clipPath id="cp">
          <path d="m0.35579 8.7757v-7.824h1.764v6.336h3.096v1.488z" />
          <path d="m7.3323 4.8159-0.192 0.72h1.668l-0.18-0.72q-0.168-0.58802-0.324-1.248t-0.312-1.272h-0.048q-0.144 0.624-0.3 1.284-0.144 0.648-0.312 1.236zm-2.832 3.9602 2.448-7.824h2.124l2.448 7.824h-1.872l-0.48-1.86h-2.388l-0.48 1.86z" />
          <path d="m11.364 8.7757v-7.824h1.812l2.04 3.888 0.768 1.728h0.048q-0.06-0.624-0.144-1.392-0.072-0.768-0.072-1.464v-2.76h1.68v7.824h-1.812l-2.04-3.9001-0.768-1.704h-0.048q0.06 0.648 0.132 1.392 0.084 0.744 0.084 1.44v2.772z" />
          <path d="m21.228 8.9197q-0.80398 0-1.512-0.252-0.696-0.264-1.212-0.768t-0.816-1.248q-0.288-0.75598-0.288-1.74 0-0.97202 0.3-1.728 0.3-0.768 0.816-1.296 0.528-0.528 1.224-0.80398t1.476-0.276q0.85198 0 1.464 0.312t0.99598 0.70798l-0.92402 1.128q-0.3-0.264-0.63602-0.44402t-0.84-0.18q-0.456 0-0.84 0.18-0.372 0.168-0.648 0.49202t-0.432 0.792q-0.144 0.46798-0.144 1.056 0 1.212 0.54002 1.884 0.552 0.65998 1.656 0.65998 0.24 0 0.46798-0.06t0.372-0.18v-1.344h-1.296v-1.44h2.856v3.6q-0.408 0.39602-1.08 0.672t-1.5 0.276z" />
          <path d="m10.71 12.09h-2.82l1.095-0.615c-0.24-0.54002-0.705-1.335-1.11-1.95l-1.095 0.54002c0.40501 0.615 0.855 1.47 1.08 2.025h-2.715v1.11h5.565zm-0.52502 1.995h-4.4251v1.095h4.4251zm-4.4251 3.06h4.4251v-1.065h-4.4251z" />
          <path d="m9.0749 19.215v2.145h-2.13v-2.145zm1.215-1.125h-4.5449v5.0699h1.2v-0.67498h3.345z" />
          <path d="m16.23 13.83v1.995h-2.46c0.12-0.585 0.255-1.275 0.39001-1.995zm1.29 1.995v-3.135h-3.135c0.06-0.44999 0.15-0.91499 0.225-1.335h3.9148v-1.17h-7.6199v1.17h2.325c-0.06 0.41998-0.135 0.88502-0.225 1.335h-1.74v1.14h1.545c-0.135 0.72-0.27 1.41-0.40501 1.995h-1.89v1.155h8.3399v-1.155z" />
          <path d="m16.65 19.11v2.43h-4.035v-2.43zm-5.325 4.2452h1.29v-0.6h4.035v0.54002h1.35v-5.4002h-6.675z" />
        </clipPath>
        <g className="all" fill="none" clipPath="url(#cp)">
          <g strokeWidth="1.8">
            <path className="el-1" d="m1.2434 0.86587v7.0859h3.7569" />
            <path className="el-2" d="m7.8843 0.55085-2.5518 8.6879" />
            <path className="el-3" d="m8.1109 0.42864 2.6089 8.7857" />
            <path className="el-4" d="m6.5286 6.256h2.9355" />
            <path className="el-5" d="m12.224 0.92869v7.8919" />
            <path className="el-7" d="m16.598 0.92753v7.8606" />
            <path className="el-6" d="m12.59 1.1549 3.8596 7.4297" />
          </g>
          <path
            className="el-8"
            d="m20.865 5.0947h2.0403v2.455c-0.47429 0.27351-1.1606 0.36295-1.6744 0.40493s-0.79875-0.061202-1.1568-0.19281-0.66411-0.33053-0.92731-0.5876-0.47436-0.57229-0.62433-0.95486-0.22035-0.83243-0.22035-1.3313c0-0.49886 0.0765-0.93344 0.22953-1.3221 0.15303-0.38867 0.35807-0.72226 0.62433-0.99158s0.58148-0.47436 0.93649-0.61513 0.71308-0.21116 1.1293-0.21117c0.41622-5.2e-6 0.80794 0.079571 1.1201 0.23871 0.31217 0.15914 0.67667 0.41704 0.87252 0.61902"
            strokeWidth="2"
          />
          <g strokeWidth="1.5">
            <path className="el-9" d="m7.3906 9.7344 1.0781 2.1562" />
            <path className="el-10" d="m5.812 12.672h4.5169" />
            <path className="el-11" d="m5.7185 14.688h4.4849" />
            <path className="el-12" d="m5.7341 16.578h4.5005" />
            <path className="el-14" d="m5.7341 18.688h3.9069v3.8432" />
            <path className="el-15" d="m6.3982 21.828h3.2974" />
            <path className="el-13" d="m6.375 18.141v5.1406" />
            <path className="el-16" d="m10.812 10.75h7.7818" />
            <path className="el-19" d="m11.265 16.359h7.204" />
            <path className="el-18" d="m11.23 13.211h5.7506v2.6089" />
            <path className="el-22" d="m11.988 22.055h5.3599" />
            <path className="el-20" d="m11.936 18.031v4.7391" />
            <path className="el-17" d="m13.953 10.984-0.92138 4.8281" />
            <path className="el-21" d="m11.965 18.586h5.3288v4.8432" />
          </g>
        </g>
      </svg>
    </button>
  )
}

export default ButtonLangPref
