import React, { memo, useContext } from 'react'
import Window from './Window'

import { SCREEN_DISCONNECT_NOTICE } from '../../constants/ActionTypes'
import { I18nContext } from '../../i18n/I18nContext'

const DisconnectNotice = () => {
  const _ = useContext(I18nContext)

  return (
    <Window screenActionType={SCREEN_DISCONNECT_NOTICE}>
      {_.i18n(
        'You and your opponent are disconnected. Please go to "Preferences" and start a new game.',
      )}
    </Window>
  )
}

export default memo(DisconnectNotice)
