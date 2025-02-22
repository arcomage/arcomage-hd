import React, { useContext } from 'react'
import Window from './Window'
import MultilineText from '../special/MultilineText'

import { SCREEN_HELP } from '../../constants/ActionTypes'
import { I18nContext } from '../../i18n/I18nContext'
import {
  authorUrl,
  appVersion,
  githubUrl,
  tutorialImageUrl,
} from '../../constants/devSettings'

const Help = () => {
  const _ = useContext(I18nContext)

  const str1 = _.i18n(
    'Please go to %s to view more information (including %s1), star the repo and follow %s2 there.',
  )

  const arr1: React.ReactNode[] = str1.split(/(%s\d?)/g)

  arr1.forEach((item, i) => {
    if (typeof item === 'string' && item.match(/^%s\d?$/)) {
      switch (item) {
        case '%s':
          arr1[i] = (
            <a
              key={item}
              href={githubUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              {_.i18n('the GitHub project page')}
            </a>
          )
          break
        case '%s1':
          arr1[i] = (
            <a
              key={item}
              href={tutorialImageUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              {_.i18n('an informative tutorial image in English')}
            </a>
          )
          break
        case '%s2':
          arr1[i] = (
            <a
              key={item}
              href={authorUrl}
              target="_blank"
              rel="noopener noreferrer"
              dir="ltr"
            >
              @tomchen
            </a>
          )
          break
        default:
          break
      }
    }
  })

  return (
    <Window screenActionType={SCREEN_HELP}>
      <small className="version select-all">v{appVersion}</small>
      <p className="description select-text">
        {_.i18n('ArcoMage HD') !== 'ArcoMage HD' && (
          <>
            <strong>{_.i18n('ArcoMage HD')}</strong>
            <> - </>
          </>
        )}
        {_.i18n('DESC')}
      </p>
      <p className="help-text select-text">
        <strong>{arr1}</strong>
      </p>
      <p className="help-text select-text">
        <strong>
          {_.i18n('Game rules')}
          {_.i18n(': ')}
        </strong>
      </p>
      <div className="help-text select-text">
        {<MultilineText>{_.i18n('GAMERULES')}</MultilineText>}
      </div>
    </Window>
  )
}

export default Help
