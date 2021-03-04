import React from 'react'
import TableCommon from './TableCommon'
import TableP from './TableP'
import cx from 'classnames'
import { createUseStyles } from 'react-jss'

const useStyles = createUseStyles({
  main: {
    'min-width': '300px',
    'min-height': '600px',
  },
})

const Game = () => {
  const classes = useStyles()
  return (
    <>
      <div
        className={cx(
          'w-screen h-screen flex flex-col bg-black overflow-x-hidden select-none',
          classes.main,
        )}
      >
        <TableCommon />
        <TableP />
      </div>
    </>
  )
}

export default Game

// Game
//   TableCommon
//     NameP
//     StatusP
//     TowerP
//     WallP
//     WallO
//     OTowe
//     NameO
//     StatusO
//   TableP
