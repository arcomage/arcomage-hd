import React, { memo, useContext } from 'react'
import Window from './Window'
import MultilineText from '../special/MultilineText'

import { SCREEN_HELP } from '../../constants/ActionTypes'
import { I18nContext } from '../../i18n/I18nContext'

const Help = () => {
  const trans = useContext(I18nContext)
  const text = trans.i18n?.GAMEHELP ?? ''
  return (
    <Window ScreenActionType={SCREEN_HELP}>
      {<MultilineText>{text}</MultilineText>}
    </Window>
  )
}

export default memo(Help)
