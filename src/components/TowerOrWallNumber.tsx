import React, { memo, useEffect } from 'react'
// import devLog from '../utils/devLog'
import { useAppSelector } from '../utils/useAppDispatch'
import AnimatedNumber from './effects/AnimatedNumber'
import NumberChangeVisual from './effects/NumberChangeVisual'
import NumberDiff from './effects/NumberDiff'

type PropType = {
  isOpponent: boolean
  isWall: boolean
  target: React.MutableRefObject<HTMLDivElement | null>
}
const TowerOrWallNumber = ({ isOpponent, isWall, target }: PropType) => {
  const n = useAppSelector(
    (state) =>
      state.status[isOpponent ? 'opponent' : 'player'][
        isWall ? 'wall' : 'tower'
      ],
  )

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
