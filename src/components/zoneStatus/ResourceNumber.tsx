import React from 'react'
import AnimatedNumber from '@/components/effects/AnimatedNumber'
import NumberDiff from '@/components/effects/NumberDiff'
import { allResType } from '@/constants/resourceNames'
import { useAppSelector } from '@/utils/hooks/useAppDispatch'

type PropType = {
  isOpponent: boolean
  type: allResType
}
const ResourceNumber = ({ isOpponent, type }: PropType) => {
  const n = useAppSelector(
    (state) => state.status[isOpponent ? 'opponent' : 'player'][type],
  )
  return (
    <>
      <NumberDiff n={n} />
      <AnimatedNumber n={n} />
    </>
  )
}

export default ResourceNumber
