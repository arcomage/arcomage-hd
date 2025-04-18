import React, { RefObject, useEffect } from 'react'
import AnimatedNumber from '@/components/effects/AnimatedNumber'
import NumberChangeVisual from '@/components/effects/NumberChangeVisual'
import NumberDiff from '@/components/effects/NumberDiff'
import { useAppSelector } from '@/utils/hooks/useAppDispatch'

type PropType = {
  isOpponent: boolean
  isWall?: boolean
  target: RefObject<HTMLDivElement | null>
  maxN: number // only applys to `--n`
}
const TowerOrWallNumber = ({
  isOpponent,
  isWall = false,
  target,
  maxN,
}: PropType) => {
  const n = useAppSelector(
    (state) =>
      state.status[isOpponent ? 'opponent' : 'player'][
        isWall ? 'wall' : 'tower'
      ],
  )
  const nStyle = n > maxN ? maxN : n
  useEffect(() => {
    if (target.current !== null) {
      target.current.style.setProperty('--n', nStyle.toString())
    }
    // no lint reason: `target` is stable
    // eslint-disable-next-line react-compiler/react-compiler
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [nStyle])

  return (
    <>
      <NumberDiff n={n} />
      <AnimatedNumber n={n} />
      <NumberChangeVisual n={n} />
    </>
  )
}

export default TowerOrWallNumber
