import React, { memo } from 'react'

type PropType = {
  level: number
}

const Pixelation = ({ level }: PropType) => (
  <svg className="invisible w-0 h-0">
    <filter id="pixelation" x="0" y="0">
      <feFlood x="1" y="1" height="1" width="1" />
      <feComposite width={level} height={level} />
      <feTile />
      <feComposite in="SourceGraphic" operator="in" />
      <feMorphology operator="dilate" radius={level / 2} />
    </filter>
  </svg>
)

export default memo(Pixelation)
