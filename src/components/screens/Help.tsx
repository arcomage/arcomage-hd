import React, { memo, useContext } from 'react'
import Window from './Window'
import MultilineText from '../special/MultilineText'

import { SCREEN_HELP } from '../../constants/ActionTypes'
import { I18nContext } from '../../i18n/I18nContext'
import { tutorialImageUrl } from '../../constants/devSettings'

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
              href="https://github.com/arcomage/arcomage-hd"
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
              href="https://github.com/tomchen"
              target="_blank"
              rel="noopener noreferrer"
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
    <Window ScreenActionType={SCREEN_HELP}>
      <small className="version">v{process.env.APPVERSION}</small>
      <p className="description">
        {_.i18n('ArcoMage HD') !== 'ArcoMage HD' && (
          <>
            <strong>{_.i18n('ArcoMage HD')}</strong>
            <> - </>
          </>
        )}
        {_.i18n('DESC')}
      </p>
      <p>
        <strong>{arr1}</strong>
      </p>
      <p>
        <strong>
          {_.i18n('Game rules')}
          {_.i18n(':')}
        </strong>
      </p>
      <div>{<MultilineText>{_.i18n('GAMERULES')}</MultilineText>}</div>
    </Window>
  )
}

export default memo(Help)
