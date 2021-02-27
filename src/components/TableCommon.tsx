import React from 'react'
import Status from './Status'
import Tower from './Tower'
import Wall from './Wall'
import cx from 'classnames'
import { createUseStyles } from 'react-jss'

import bg from '../../assets/img/bg.jpg'

const useStyles = createUseStyles({
  main: {
    background: {
      image: `url(${bg})`,
      repeat: 'no-repeat',
      size: 'cover',
      position: 'center 30%',
    },
  },
})

const TableCommon = () => {
  const classes = useStyles()
  return (
    <div className={cx('h-2/3 flex-auto bg-green-100 relative z-0', classes.main)}>
      <Status
        playerName="Pete"
        bricks={599}
        gems={599}
        recruits={599}
        brickProd={599}
        gemProd={599}
        recruitProd={599}
      />
      <Tower goal={100} current={123} />
      <Wall current={23} />

      <Status
        playerName="Computer"
        bricks={5}
        gems={2}
        recruits={5}
        brickProd={5}
        gemProd={2}
        recruitProd={5}
        isOpponent={true}
      />
      <Tower isOpponent={true} goal={100} current={23} />
      <Wall isOpponent={true} current={123} />
    </div>
  )
}

export default TableCommon
