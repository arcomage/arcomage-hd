const getTabIndex = (el: HTMLElement): number => {
  // el.tabIndex should be -1 or 0, while el.dataset.tabindex can be any -1 or 0 or any positive integer
  const tabIndexShown = el.tabIndex
  const tabIndexData = el.dataset.tabindex
  if (tabIndexShown === -1) {
    return -1
  }
  if (tabIndexData === undefined) {
    return tabIndexShown
  }
  return parseInt(tabIndexData, 10)
}

// should not have [tabindex="-1"], but if it does, it will be sorted to the start of the list
// 1, 2, 3, ..., 0 (including those focusable but without tabindex). elements with same tabindex will be sorted by their order in the array
const inPlaceSortByTabIndex = (elArr: HTMLElement[]): void => {
  elArr.sort((a, b) => {
    const tabindexA = getTabIndex(a)
    const tabindexB = getTabIndex(b)
    if (tabindexA === 0 && tabindexB !== 0) {
      return 1
    }
    if (tabindexA !== 0 && tabindexB === 0) {
      return -1
    }
    if (tabindexA !== tabindexB) {
      return tabindexA - tabindexB
    }
    return (
      Array.prototype.indexOf.call(document.body, a) -
      Array.prototype.indexOf.call(document.body, b)
    )
  })
}

type FocusChangeOptions = {
  currentTarget?: EventTarget | null
  listType?: 'c' | 'b' | 'c&b' | 'c|b' | 'all'
  indexType?: '>' | '<' | '1' | '-1'
}

/**
 * Focus on the next/previous/first element in the list
 *
 * @param options.currentTarget currently focused element / event target
 * @param options.listType element list type, could be:
 * - 'c' : cards
 * - 'b' : top buttons
 * - 'c&b' : cards and top buttons
 * - 'c|b' : cards or top buttons, depending on which the current target belongs to, if current target does not belong to either, it will select cards
 * - 'all' : all focusable elements (default)
 * @param options.indexType which element to focus, could be:
 * - '>' : next element (default)
 * - '<' : previous element
 * - '1' : first element
 * - '-1' : last element
 * @returns void
 *
 * @note it falls back to the first card if there is no next/previous element
 */
export const focusChange = ({
  currentTarget = null,
  listType = 'all',
  indexType = '>',
}: FocusChangeOptions): void => {
  const cardSelector = 'button.card:not([disabled]):not([tabindex="-1"])'
  const topButtonSelector =
    'button.topbutton:not([tabindex="-1"]),a.topbutton:not([tabindex="-1"])'

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
      selector =
        'button.card:not([disabled]):not([tabindex="-1"]),button.topbutton:not([tabindex="-1"]),a.topbutton:not([tabindex="-1"])'
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

  // all selectors exclude [tabindex="-1"]
  inPlaceSortByTabIndex(elements)

  let finalIndex: number

  const defaultIndex = (indexTypeArrow: '>' | '<') => {
    if (indexTypeArrow === '>') {
      return 0
    } else if (indexTypeArrow === '<') {
      return elements.length - 1
    }
    return 0 // unreachable, just for ts check
  }

  if (indexType === '1') {
    finalIndex = 0
  } else if (indexType === '-1') {
    finalIndex = elements.length - 1
  } else if (!(currentTarget instanceof HTMLElement)) {
    finalIndex = defaultIndex(indexType)
  } else {
    const currentIndex = elements.indexOf(currentTarget)
    if (currentIndex === -1) {
      finalIndex = defaultIndex(indexType)
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
