import React, { memo, useContext } from 'react'
import cx from 'classnames'
import { createUseStyles } from 'react-jss'
import { I18nContext } from '../i18n/I18nContext'

const useStyles = createUseStyles({
  main: {
    font: {
      family: 'RobotoCondensed',
      weight: 'bold',
    },
    transform: 'translateY(-50%)',
  },
})

type PropType = {
  shown?: boolean
}
const DiscardModeNotice = ({ shown = true }: PropType) => {
  const trans = useContext(I18nContext)
  const classes = useStyles()
  return shown ? (
    <div
      className={cx(
        classes.main,
        'w-full text-center text-yellow-300 pointer-events-none text-4xl text-shadow-lg',
      )}
    >
      {trans.i18n?.['Discard a card']}
    </div>
  ) : null
}

export default memo(DiscardModeNotice)
