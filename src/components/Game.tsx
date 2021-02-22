import React from 'react'
import TableO from './TableO'
import TableCommon from './TableCommon'
import TableP from './TableP'
// import cx from 'classnames'

const Game = () => (
  <div className='w-screen h-screen flex flex-col bg-black'>
    <TableO />
    <TableCommon />
    <TableP />
  </div>
)

export default Game

// Game
//   TableO
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
