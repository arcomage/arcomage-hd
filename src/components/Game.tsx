import React, { memo } from 'react'
import TableCommon from './TableCommon'
import TableP from './TableP'
import cx from 'classnames'
import { createUseStyles } from 'react-jss'
import { minWidth, minHeight } from '../utils/GameSizeContext'
import EndScreen from './EndScreen'

const useStyles = createUseStyles({
  main: {
    'min-width': `${minWidth}px`,
    'min-height': `${minHeight}px`,
  },
})

const Game = () => {
  const classes = useStyles()
  return (
    <div
      className={cx(
        'w-screen h-screen flex flex-col bg-black overflow-x-hidden select-none',
        classes.main,
      )}
    >
      <TableCommon />
      <TableP />
      {/* <EndScreen win={true} /> */}
    </div>
  )
}

export default memo(Game)
