import React, { useState, useLayoutEffect, useRef } from 'react'
import Ressource from './Ressource'
import cx from 'classnames'
import { createUseStyles } from 'react-jss'

const useStyles = createUseStyles({
  main: {},
})

type StatusProps = {
  playerName: string
  bricks: number
  gems: number
  recruits: number
  brickProd: number
  gemProd: number
  recruitProd: number
  isOpponent?: boolean
}
const Status = ({
  playerName,
  bricks,
  gems,
  recruits,
  brickProd,
  gemProd,
  recruitProd,
  isOpponent = false,
}: StatusProps) => {
  const classes = useStyles()

  const main = useRef<HTMLDivElement>(null)

  const [height, setHeight] = useState(50)
  useLayoutEffect(() => {
    const mainc = main.current
    if (mainc !== null) {
      setHeight(mainc.clientHeight)
    }
  }, [main.current])

  const calcProdHeight = (height: number): string =>
    `(${height}px - (1.75rem + 1px * 2 + 0.25rem * 2 + 1rem) - (0.25rem * 2 + 1.5rem + 0.75rem + 0.25rem) * 3) / 3`

  const calcStatusWidth = (height: number): string =>
    `${calcProdHeight(height)} / 208 * 286 + 0.25rem * 2 + 1.25rem * 2`

  return (
    <div
      className={cx(classes.main, 'p-5 h-full')}
      ref={main}
      style={{
        width: `calc(${calcStatusWidth(height)})`,
        float: isOpponent ? 'right' : 'left',
      }}
    >
      <div className="bg-black bg-opacity-50 mb-4 p-1 shadow-lg">
        <div className="border border-yellow-400 border-opacity-25 text-yellow-400 text-center h-7 leading-7 font-mono">
          {playerName}
        </div>
      </div>

      <Ressource
        type="brick"
        count={bricks}
        prod={brickProd}
        prodHeightCss={calcProdHeight(height)}
      />
      <Ressource
        type="gem"
        count={gems}
        prod={gemProd}
        prodHeightCss={calcProdHeight(height)}
      />
      <Ressource
        type="recruit"
        count={recruits}
        prod={recruitProd}
        prodHeightCss={calcProdHeight(height)}
      />
    </div>
  )
}

export default Status
