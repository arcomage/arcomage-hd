import React, { memo, useEffect } from 'react'
// import devLog from '../utils/devLog'
import AnimatedNumber from './effects/AnimatedNumber'
import NumberChangeVisual from './effects/NumberChangeVisual'
import NumberDiff from './effects/NumberDiff'

type PropType = {
  n: number
  target: React.MutableRefObject<HTMLDivElement | null>
}
const TowerOrWallNumber = ({ n, target }: PropType) => {
  useEffect(() => {
    if (target.current !== null) {
      target.current.style.setProperty('--n', n.toString(10))
    }
    // else {
    //   devLog("the tower / wall number component can't get its target!", 'bug')
    // }
  }, [n])

  return (
    <>
      <NumberDiff n={n} />
      <AnimatedNumber n={n} />
      <NumberChangeVisual n={n} />
    </>
  )
}

export default memo(TowerOrWallNumber)
