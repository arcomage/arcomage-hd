import React, { useContext } from 'react'
import { SCREEN_DISCONNECT_NOTICE } from '@/constants/ActionTypes'
import { DisconnectNoticeExitableDelay } from '@/constants/visuals'
import { I18nContext } from '@/i18n/I18nContext'
import Window from './Window'

const DisconnectNotice = () => {
  const _ = useContext(I18nContext)

  return (
    <Window
      screenActionType={SCREEN_DISCONNECT_NOTICE}
      exitableDelay={DisconnectNoticeExitableDelay}
    >
      {_.i18n(
        'You and your opponent are disconnected. Please go to "Preferences" and start a new game.',
      )}
    </Window>
  )
}

export default DisconnectNotice
