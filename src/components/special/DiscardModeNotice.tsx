import React, { memo, useContext } from 'react'
import cx from 'classnames'
import { I18nContext } from '../../i18n/I18nContext'

type PropType = {
  shown?: boolean
}
const DiscardModeNotice = ({ shown = true }: PropType) => {
  const _ = useContext(I18nContext)
  return shown ? (
    <div
      className={cx(
        'robotocondensed',
        'transform -translate-y-1/2 w-full text-center text-yellow-300 pointer-events-none text-4xl text-shadow-lg',
      )}
    >
      {_.i18n('Discard a card')}
    </div>
  ) : null
}

export default memo(DiscardModeNotice)
