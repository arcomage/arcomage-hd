import React, { memo } from 'react'

type PropType = { children: string }
const MultilineText = ({ children }: PropType) => (
  <>
    {children.split('\n').map((t, i) => (
      <p key={i}>{t}</p>
    ))}
  </>
)

export default memo(MultilineText)
