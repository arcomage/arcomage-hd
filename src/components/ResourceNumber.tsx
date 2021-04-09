import React, { memo } from 'react'
import { resNameAllMap, ResNameType } from '../constants/resourceNames'
import { useAppSelector } from '../utils/useAppDispatch'
import AnimatedNumber from './effects/AnimatedNumber'
import NumberDiff from './effects/NumberDiff'

type PropType = {
  type: ResNameType
  isProd: boolean
  isOpponent: boolean
}
const ResourceNumber = ({ type, isProd, isOpponent }: PropType) => {
  const prod = useAppSelector(
    (state) =>
      state.status[isOpponent ? 'opponent' : 'player'][
        resNameAllMap[type][isProd ? 1 : 0]
      ],
  )

  return (
    <>
      <NumberDiff n={prod} />
      <AnimatedNumber n={prod} />
    </>
  )
}

export default memo(ResourceNumber)
