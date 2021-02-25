import React from 'react'
import cx from 'classnames'
import { createUseStyles } from 'react-jss'
import brickBg from '../../assets/img/res_1.png'
import gemBg from '../../assets/img/res_2.png'
import recruitBg from '../../assets/img/res_3.png'

const useStyles = createUseStyles({
  brick: {
    background: {
      image: `url(${brickBg})`,
    },
  },
  gem: {
    background: {
      image: `url(${gemBg})`,
    },
  },
  recruit: {
    background: {
      image: `url(${recruitBg})`,
    },
  },
  fatnumber: {
    font: {
      family: 'FatNumber',
      weight: 'bold',
    },
    'letter-spacing': '-1px',
  },
  condensed: {
    font: {
      family: 'RobotoCondensed',
      weight: 'bold',
    },
  },
})

type RessourceProps = {
  type: 'brick' | 'gem' | 'recruit'
  count: number
  prod: number
  prodHeightCss: string
}
const Ressource = ({ type, count, prod, prodHeightCss }: RessourceProps) => {
  const classes = useStyles()
  const color = { brick: 'red', gem: 'blue', recruit: 'green' }[type]
  const text = { brick: 'bricks', gem: 'gems', recruit: 'recruits' }[type]
  // Make TailwindCSS aware of these classes:
  // bg-red-300
  // bg-blue-300
  // bg-green-300
  return (
    <div className={cx('mb-3 p-1 shadow-lg', `bg-${color}-300`)}>
      <div
        className={cx(
          classes[type],
          'bg-no-repeat bg-cover bg-center border border-l-darkborder border-t-darkborder border-r-lightborder border-b-lightborder relative',
        )}
        style={{
          height: `calc(${prodHeightCss})`,
        }}
      >
        <div
          className={cx(
            'text-3xl -mb-2 text-yellow-400 absolute bottom-1 left-1 text-shadow-md',
            classes.fatnumber,
          )}
        >
          {prod}
        </div>
      </div>
      <div className="h-6 flex mt-1">
        <div
          className={cx(
            'text-2xl leading-6 text-black flex-1 text-left',
            classes.fatnumber,
          )}
        >
          {count}
        </div>
        <div
          className={cx(
            'text-lg leading-6 text-black flex-1 text-right',
            classes.condensed,
          )}
        >
          {text}
        </div>
      </div>
    </div>
  )
}

export default Ressource
