import React from 'react'
import cx from 'classnames'
import { createUseStyles } from 'react-jss'
import bg from '../../assets/img/wall.png'

const useStyles = createUseStyles({
  wallbody: {
    background: {
      image: `url(${bg})`,
      repeat: 'repeat-y',
      size: '100%',
      position: 'center center',
    },
    height: '870px',
  },
})

const goal = 125

type WallProps = { current: number }
const Wall = ({ current }: WallProps) => {
  const classes = useStyles()
  return (
    <div className="h-full float-left w-20">
      <div className={cx('mx-4', classes.wallbody)}></div>
      <div className="bg-black bg-opacity-50 mb-4 p-1 shadow-lg">
        <div className="border border-yellow-400 border-opacity-25 text-yellow-400 text-center h-7 leading-7 font-mono">
          {current}
        </div>
      </div>
    </div>
  )
}

export default Wall
