import React, { memo } from 'react'
import cx from 'classnames'
import Window from './Window'

import { SCREEN_HELP } from '../../constants/ActionTypes'

const Help = () => {

  return (
    <Window ScreenActionType={SCREEN_HELP}>
      <div>
        The game...
      </div>
    </Window>
  )
}

export default memo(Help)
