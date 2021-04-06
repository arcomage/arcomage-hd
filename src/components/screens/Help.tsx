import React, { memo, useContext } from 'react'
import Window from './Window'
import MultilineText from '../special/MultilineText'

import { SCREEN_HELP } from '../../constants/ActionTypes'
import { I18nContext } from '../../i18n/I18nContext'

const Help = () => {
  const _ = useContext(I18nContext)

  const str1 = _.i18n(
    'Please go to %s to view more information, star the repo and follow %s there.',
  )
  const str2 = _.i18n('the GitHub project page')

  const arr1 = str1.split('%s')

  const el = (
    <p>
      <strong>
        {arr1[0]}
        <a
          href="https://github.com/arcomage/arcomage-hd"
          target="_blank"
          rel="noopener noreferrer"
        >
          {str2}
        </a>
        {arr1[1]}
        <a
          href="https://github.com/tomchen"
          target="_blank"
          rel="noopener noreferrer"
        >
          @tomchen
        </a>
        {arr1[2]}
      </strong>
    </p>
  )

  return (
    <Window ScreenActionType={SCREEN_HELP}>
      <h1>
        <span>{_.i18n('ArcoMage HD')}</span>{' '}
        <small>v{process.env.APPVERSION}</small>
      </h1>
      <p className="description">{_.i18n('DESC')}</p>
      {el}
      <p>{_.i18n('Game rules:')}</p>
      <div>{<MultilineText>{_.i18n('GAMERULES')}</MultilineText>}</div>
    </Window>
  )
}

export default memo(Help)
