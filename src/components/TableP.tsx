import React from 'react'
import Card from './Card'
import cx from 'classnames'
import c from './TableP.module.scss'

const TableP = () => (
  <div className="w-full h-full flex">
    <div className={cx(c.m, 'flex-1')}>
      <Card index={1} />
      <Card index={2} />
      <Card index={5} />
      <Card index={45} />
      <Card index={64} />
      <Card index={36} />
    </div>
  </div>
)

export default TableP
