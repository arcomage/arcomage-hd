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
      position: 'center center',
    },
  },
})

const TableCommon = () => {
  const classes = useStyles()
  return (
    <div className={cx('bg-green-100 w-full h-full', classes.main)}>
      <Status
        playerName="Pete"
        bricks={5}
        gems={5}
        recruits={5}
        brickProd={5}
        gemProd={5}
        recruitProd={5}
      />
      <Tower color="red" goal={100} current={23} />
      <Wall goal={100} current={23} />
      <Wall goal={100} current={23} />
      <Tower color="blue" goal={100} current={23} />
      <Status
        playerName="Computer"
        bricks={5}
        gems={5}
        recruits={5}
        brickProd={5}
        gemProd={5}
        recruitProd={5}
      />
    </div>
  )
}

export default TableCommon
