import React from 'react'
import AnimatedNumber from '@/components/effects/AnimatedNumber'
import NumberDiff from '@/components/effects/NumberDiff'

type PropType = {
  n: number
}
const ResourceNumber = ({ n }: PropType) => (
  <>
    <NumberDiff n={n} />
    <AnimatedNumber n={n} />
  </>
)

export default ResourceNumber
