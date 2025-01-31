const inPlaceSortByTabIndex = (elArr: HTMLElement[]): void => {
  elArr.sort((a, b) => {
    const tabindexA =
      (a as HTMLElement).tabIndex >= 0
        ? (a as HTMLElement).tabIndex
        : Number.POSITIVE_INFINITY
    const tabindexB =
      (b as HTMLElement).tabIndex >= 0
        ? (b as HTMLElement).tabIndex
        : Number.POSITIVE_INFINITY
    if (tabindexA !== tabindexB) {
      return tabindexA - tabindexB
    }
    return (
      Array.prototype.indexOf.call(document.body, a) -
      Array.prototype.indexOf.call(document.body, b)
    )
  })
}

type FocusSwitchOptions = {
  currentTarget?: EventTarget | null
  listType?: 'c' | 'b' | 'c&b' | 'c|b' | 'all'
  indexType?: '>' | '<' | '0'
}

/**
 * Focus on the next/previous/first element in the list
 *
 * @param options.currentTarget currently focused element / event target
 * @param options.listType element list type, could be:
 * - 'c' : cards
 * - 'b' : top buttons
 * - 'c&b' : cards and top buttons
 * - 'c|b' : cards or top buttons, depending on which the current target belongs to
 * - 'all' : all focusable elements
 * @param options.indexType which element to focus, could be:
 * - '>' : next element
 * - '<' : previous element
 * - '0' : first element
 * @returns void
 *
 * @note it falls back to the first card if there is no next/previous element
 */
export const focusChange = ({
  currentTarget = null,
  listType = 'all',
  indexType = '>',
}: FocusSwitchOptions): void => {
  const cardSelector = 'button.card:not([disabled])'
  const topButtonSelector = 'button.topbutton,a.topbutton'

  let selector = ''

  switch (listType) {
    case 'c': {
      selector = cardSelector
      break
    }
    case 'b': {
      selector = topButtonSelector
      break
    }
    case 'c&b': {
      selector = 'button.card:not([disabled]),button.topbutton,a.topbutton'
      break
    }
    case 'c|b': {
      if (!(currentTarget instanceof HTMLElement)) {
        selector = cardSelector
      } else if (currentTarget?.matches(cardSelector)) {
        selector = cardSelector
      } else if (currentTarget?.matches(topButtonSelector)) {
        selector = topButtonSelector
      } else {
        selector = cardSelector
      }
      break
    }
    case 'all': {
      selector =
        'button:not([disabled]):not([tabindex="-1"]),a[href]:not([tabindex="-1"]),input:not([disabled]):not([tabindex="-1"]),select:not([disabled]):not([tabindex="-1"]),textarea:not([disabled]):not([tabindex="-1"]),[tabindex]:not([tabindex="-1"])'
      break
    }
    default: {
      selector = cardSelector
    }
  }

  const elements = Array.from(document.querySelectorAll<HTMLElement>(selector))

  if (!elements.length) {
    return
  }

  inPlaceSortByTabIndex(elements)

  let finalIndex: number

  if (indexType === '0' || !(currentTarget instanceof HTMLElement)) {
    finalIndex = 0
  } else {
    const currentIndex = elements.indexOf(currentTarget)
    if (currentIndex === -1) {
      finalIndex = 0
    } else if (indexType === '>') {
      finalIndex = currentIndex === elements.length - 1 ? 0 : currentIndex + 1
    } else if (indexType === '<') {
      finalIndex = currentIndex === 0 ? elements.length - 1 : currentIndex - 1
    } else {
      finalIndex = 0
    }
  }

  elements[finalIndex].focus()
}
