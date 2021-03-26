import React, { memo } from 'react'
import cx from 'classnames'
import { createUseStyles } from 'react-jss'
import { useAppSelector, useAppDispatch } from '../utils/useAppDispatch'
import { minWidth, minHeight } from '../utils/GameSizeContext'
import TableCommon from './TableCommon'
import TableP from './TableP'
import ButtonBar from './ButtonBar'

import EndScreen from './EndScreen'
import Pref from './Pref'
import LangPref from './LangPref'

const useStyles = createUseStyles({
  main: {
    'min-width': `${minWidth}px`,
    'min-height': `${minHeight}px`,
  },
})

const Game = () => {
  const classes = useStyles()

  const pref = useAppSelector((state) => state.screen.pref)
  const langPref = useAppSelector((state) => state.screen.langPref)
  const volumePref = useAppSelector((state) => state.screen.volumePref)
  const youWin = useAppSelector((state) => state.screen.youWin)
  const youLose = useAppSelector((state) => state.screen.youLose)
  const help = useAppSelector((state) => state.screen.help)

  return (
    <div
      className={cx(
        'w-screen h-screen flex flex-col bg-black overflow-x-hidden select-none',
        classes.main,
      )}
    >
      <TableCommon />
      <TableP />
      {(youWin || youLose) && <EndScreen win={youWin} />}
      {pref && <Pref />}
      {langPref && <LangPref />}

      <ButtonBar />
    </div>
  )
}

export default memo(Game)
