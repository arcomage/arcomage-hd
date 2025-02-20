/**
 * Tooltip
 * @note target's existence is already checked, so you don't need to `removeTooltip` when target is unmounted/removed
 * @note when the tooltip is shown (when user hovers on the target), it detects changes of target's `data-tooltip-content` and updates the tooltip accordingly (including empty string in which tooltip will hide), but it doesn't detect changes of `data-tooltip-position`
 */

import React from 'react'
import { tooltipTransitionDuration } from '../constants/visuals'

const listenerTypes = ['targetExists', 'content'] as const

type ListenerType = (typeof listenerTypes)[number]

const listenersRegistry: {
  listeners: Map<
    HTMLElement,
    [MutationObserver | null, MutationObserver | null]
  >
  add: (
    target: HTMLElement,
    type: ListenerType,
    listener: MutationObserver | null,
  ) => void
  remove: (target: HTMLElement, type: ListenerType) => void
} = {
  listeners: new Map(),

  add: (target, type, listener) => {
    if (!listenersRegistry.listeners.has(target)) {
      listenersRegistry.listeners.set(target, [null, null])
    }
    const item = listenersRegistry.listeners.get(target)!
    const i = listenerTypes.indexOf(type)
    if (item[i] !== null) {
      listenersRegistry.remove(target, type)
    }
    item[i] = listener
  },

  remove: (target: HTMLElement, type: ListenerType) => {
    if (!listenersRegistry.listeners.has(target)) {
      return
    }
    const item = listenersRegistry.listeners.get(target)!
    const i = listenerTypes.indexOf(type)
    switch (type) {
      case 'targetExists': {
        item[i]?.disconnect()
        item[i] = null
        break
      }
      case 'content': {
        item[i]?.disconnect()
        item[i] = null
        break
      }
    }
  },
}

const adjustTooltip = (tooltip: HTMLElement, tooltipId: string) => {
  if (!tooltip) {
    return
  }

  const rect = tooltip.getBoundingClientRect()

  let newLeft = rect.left
  let newTop = rect.top
  const offset: {
    x?: number
    y?: number
  } = {}

  if (rect.right > window.innerWidth) {
    offset.x = rect.right - window.innerWidth
    newLeft = window.innerWidth - rect.width
  }
  if (rect.left < 0) {
    offset.x = -Math.abs(rect.left)
    newLeft = 0
  }
  if (rect.bottom > window.innerHeight) {
    offset.y = rect.bottom - window.innerHeight
    newTop = window.innerHeight - rect.height
  }
  if (rect.top < 0) {
    offset.y = -Math.abs(rect.top)
    newTop = 0
  }

  tooltip.style.left = `${newLeft}px`
  tooltip.style.top = `${newTop}px`

  const hasOffset = Object.keys(offset).length !== 0

  if (hasOffset) {
    const existingStyle = document.getElementById(`${tooltipId}-style`)
    if (existingStyle) {
      tooltip.removeChild(existingStyle)
    }

    const style = document.createElement('style')
    style.id = `${tooltipId}-style`

    style.textContent = `
#${tooltipId}.tooltip-bottom::before, #${tooltipId}.tooltip-top::before {
  left: calc(50% + ${offset.x}px);
}
#${tooltipId}.tooltip-left::before, #${tooltipId}.tooltip-right::before {
  top: calc(50% + ${offset.y}px);
}`

    tooltip.appendChild(style)
  }
}

export const removeTooltip = (
  target: HTMLElement,
  listenerType: 'all' | ListenerType = 'all',
) => {
  const tooltipId = target.getAttribute('aria-describedby')
  if (tooltipId) {
    const tooltip = document.getElementById(tooltipId)
    if (tooltip) {
      tooltip.classList.remove('tooltip-show')
      setTimeout(() => {
        tooltip.parentNode?.removeChild(tooltip)
      }, tooltipTransitionDuration)
    }
    target.removeAttribute('aria-describedby')
  }

  if (listenerType === 'all' || listenerType === 'targetExists') {
    listenersRegistry.remove(target, 'targetExists')
  }
  if (listenerType === 'all' || listenerType === 'content') {
    listenersRegistry.remove(target, 'content')
  }
}

export const addTooltip = (target: HTMLElement) => {
  removeTooltip(target)
  const content = target.dataset.tooltipContent
  const position =
    (target.dataset.tooltipPosition as 'bottom' | 'left' | 'right' | 'top') ||
    'top'

  let tooltip: HTMLDivElement | undefined = undefined

  if (content) {
    tooltip = document.createElement('div')
    tooltip.classList.add('tooltip')
    setTimeout(() => {
      if (tooltip) {
        tooltip.classList.add('tooltip-show')
      }
    }, 0)
    tooltip.textContent = content
    document.body.appendChild(tooltip)

    const rect = target.getBoundingClientRect()

    const tooltipRect = tooltip.getBoundingClientRect()

    let top = 0,
      left = 0

    switch (position) {
      case 'top':
        top = rect.top - tooltipRect.height - 6
        left = rect.left + rect.width / 2 - tooltipRect.width / 2
        break
      case 'bottom':
        top = rect.bottom + 6
        left = rect.left + rect.width / 2 - tooltipRect.width / 2
        break
      case 'left':
        top = rect.top + rect.height / 2 - tooltipRect.height / 2
        left = rect.left - tooltipRect.width - 6
        break
      case 'right':
        top = rect.top + rect.height / 2 - tooltipRect.height / 2
        left = rect.right + 6
        break
    }

    // tooltip.style.position = 'absolute' // already in css
    tooltip.style.left = `${left}px`
    tooltip.style.top = `${top}px`
    tooltip.style.width = `${tooltipRect.width}px`
    tooltip.style.height = `${tooltipRect.height}px`

    tooltip.setAttribute('role', 'tooltip')
    tooltip.classList.add(`tooltip-${position}`)

    const tooltipId = `tooltip-${Date.now()}`
    tooltip.id = tooltipId
    target.setAttribute('aria-describedby', tooltip.id)

    adjustTooltip(tooltip, tooltipId)
  }

  const observer = new MutationObserver((mutations) => {
    mutations.forEach((mutation) => {
      if (
        mutation.type === 'attributes' &&
        mutation.attributeName === 'data-tooltip-content'
      ) {
        const newContent = target.getAttribute('data-tooltip-content') ?? ''
        if (!newContent) {
          removeTooltip(target, 'targetExists')
        } else {
          if (tooltip && document.body.contains(tooltip)) {
            tooltip.textContent = newContent
          } else {
            addTooltip(target)
          }
        }
      }
    })
  })

  if (target) {
    observer.observe(target, { attributes: true })
    listenersRegistry.add(target, 'content', observer)
  }
}

export const tooltipEvents = {
  onPointerEnter: (event: React.PointerEvent<HTMLElement>) => {
    if (event.pointerType === 'mouse') {
      const target = event.currentTarget
      addTooltip(target)

      const observer = new MutationObserver(() => {
        if (!document.body.contains(target)) {
          removeTooltip(target)
        }
      })
      observer.observe(document.body, { childList: true, subtree: true })
      listenersRegistry.add(target, 'targetExists', observer)
    }
  },

  onPointerLeave: (event: React.PointerEvent<HTMLElement>) => {
    if (event.pointerType === 'mouse') {
      const target = event.currentTarget
      removeTooltip(target)
    }
  },

  onTouchStart: (event: React.TouchEvent<HTMLElement>) => {
    const target = event.currentTarget
    addTooltip(target)

    const observer = new MutationObserver(() => {
      if (!document.body.contains(target)) {
        removeTooltip(target)
      }
    })
    observer.observe(document.body, { childList: true, subtree: true })
    listenersRegistry.add(target, 'targetExists', observer)
  },

  onTouchEnd: (event: React.TouchEvent<HTMLElement>) => {
    const target = event.currentTarget
    removeTooltip(target)
  },
}

type TooltipOptions = {
  /**
   * Don not use touch events
   * @default false
   */
  noTouch?: boolean
}

/**
 * Tooltip attributes for React components
 * @param content Tooltip content, default is '' which means no tooltip
 * @param position Tooltip position, can be 'bottom', 'left', 'right', 'top', default is 'top'
 * @returns HTML element's attributes that can be spread onto the element
 * @usage
 * ```
 * <div
 *   {...tooltipAttrs("Hello, I'm a tooltip")}
 * ></div>
 * <div
 *   {...tooltipAttrs("Hello, I'm a tooltip", 'bottom', { noTouch: true })}
 * ></div>
 * ```
 */
export const tooltipAttrs = (
  content: string = '',
  position: 'bottom' | 'left' | 'right' | 'top' = 'top',
  options?: TooltipOptions,
) => {
  const { noTouch = false } = options || {}
  return {
    'data-tooltip-content': content,
    'data-tooltip-position': position,
    ...(noTouch
      ? {
          onPointerEnter: tooltipEvents.onPointerEnter,
          onPointerLeave: tooltipEvents.onPointerLeave,
        }
      : tooltipEvents),
  }
}
