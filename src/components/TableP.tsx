import React from 'react'
import Card from './Card'
import cx from 'classnames'
import { createUseStyles } from 'react-jss'

const useStyles = createUseStyles({
  main: {
    margin: '1.5rem',
  },
})

const TableP = () => {
  const classes = useStyles()
  return (
    <div className="w-full h-full flex">
      <div className={cx(classes.main, 'flex-1')}>
        <Card index={1} />
        <Card index={2} />
        <Card index={5} />
        <Card index={45} />
        <Card index={64} />
        <Card index={36} />
      </div>
    </div>
  )
}

export default TableP
