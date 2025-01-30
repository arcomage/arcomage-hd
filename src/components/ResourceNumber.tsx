import React, { memo } from 'react'
import AnimatedNumber from './effects/AnimatedNumber'
import NumberDiff from './effects/NumberDiff'

type PropType = {
  n: number
}
const ResourceNumber = ({ n }: PropType) => (
  <>
    <NumberDiff n={n} />
    <AnimatedNumber n={n} />
  </>
)

export default memo(ResourceNumber)
