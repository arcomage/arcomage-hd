import React from 'react'
import Card from './Card'
import cx from 'classnames'
import { createUseStyles } from 'react-jss'

const useStyles = createUseStyles({
  main: { background: { image: 'linear-gradient(#326a4b, #000 2rem)' } },
})

const TableP = () => {
  const classes = useStyles()
  return (
    <div className={cx(classes.main, 'h-1/3 flex-auto')}>
      <Card n={1}  position={1} total={6} />
      <Card n={2}  position={2} total={6} />
      <Card n={5}  position={3} total={6} />
      <Card n={45} position={4} total={6} />
      <Card n={36} position={5} total={6} />
      <Card n={84} position={6} total={6} />
    </div>
  )
}

export default TableP
