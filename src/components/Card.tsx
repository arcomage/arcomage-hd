import React from 'react'
import cx from 'classnames'
import c from './Card.module.scss'

const cardCountPerType = 34

type CardProps = { index: number; unusable?: boolean }
const Card = ({ index, unusable }: CardProps) => {
  const color = ['red', 'blue', 'green'][Math.floor(index / cardCountPerType)]
  return (
    <div
      className={cx(c.m, 'absolute cursor-pointer', `bg-${color}-300`)}
      style={{
        width: '188px',
        height: '252px',
      }}
    >
      <div
        className={cx(
          'm-1 shadow-md text-center font-bold leading-5 h-5',
          `bg-${color}-200`,
        )}
      >
        ABC ABC
      </div>
      <div
        className={cx(c.image, 'm-1 shadow-md bg-no-repeat bg-cover bg-center')}
        style={{
          backgroundImage: `url("assets/img/cards/${Math.floor(
            index / cardCountPerType,
          ).toString()}_${(index % cardCountPerType).toString()}.png")`,
        }}
      ></div>
      <div
        className={cx(
          c.text,
          'm-1 leading-none break-words text-center flex flex-wrap content-center',
        )}
      >
        ABC ABCABC ABCABC ABC Blanditi
      </div>
      <div
        className="absolute bottom-1 right-1 w-7 h-7 leading-7 rounded-full text-center font-bold"
        style={{
          backgroundImage:
            'radial-gradient(circle at 35% 35%, rgba(255, 255, 255, 0.5), rgba(0, 0, 0, 0.5))',
        }}
      >
        9
      </div>
    </div>
  )
}

export default Card
