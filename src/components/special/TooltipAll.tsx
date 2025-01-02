import Tooltip from '@mui/material/Tooltip'
import React, { memo } from 'react'
import { tooltipEnterDelay, tooltipLeaveDelay } from '../../constants/visuals'

type PropType = {
  title: string
  children: React.ReactElement
  placement?:
    | 'bottom-end'
    | 'bottom-start'
    | 'bottom'
    | 'left-end'
    | 'left-start'
    | 'left'
    | 'right-end'
    | 'right-start'
    | 'right'
    | 'top-end'
    | 'top-start'
    | 'top'
  enterTouchDelay?: number
}
const TooltipAll = ({
  title,
  children,
  placement,
  enterTouchDelay = 700,
}: PropType) => (
  <Tooltip
    title={title ? <span style={{ fontSize: '120%' }}>{title}</span> : ''}
    aria-label={title}
    arrow
    enterDelay={tooltipEnterDelay}
    leaveDelay={tooltipLeaveDelay}
    placement={placement}
    disableInteractive
    enterTouchDelay={enterTouchDelay}
  >
    {children}
  </Tooltip>
)

export default memo(TooltipAll)
