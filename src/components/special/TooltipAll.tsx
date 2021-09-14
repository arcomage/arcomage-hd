import Tooltip from '@material-ui/core/Tooltip'
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
}
const TooltipAll = ({ title, children, placement }: PropType) => (
  <Tooltip
    title={<span style={{ fontSize: '120%' }}>{title}</span>}
    aria-label={title}
    arrow
    enterDelay={tooltipEnterDelay}
    leaveDelay={tooltipLeaveDelay}
    placement={placement}
    disableInteractive
  >
    {children}
  </Tooltip>
)

export default memo(TooltipAll)
