import React from 'react'
import Status from './Status'
import Tower from './Tower'
import Wall from './Wall'
import cx from 'classnames'
import c from './TableCommon.module.scss'

const TableCommon = () => (
  <div className={cx("bg-green-100 w-full h-full", c.m)}>
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

export default TableCommon
