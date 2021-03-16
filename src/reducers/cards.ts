import produce from 'immer'
import {
  TEST_CARD,
  MOVE_CARD_TO_CENTER,
  MOVE_CARD_TO_TOP,
  MOVE_CARD_TO_DECK,
  CLEAR_CARD,
  REMOVE_CARD,
} from '../constants/ActionTypes'
// import {  } from '../types/actionObj'
import { CardStateType } from '../types/state'
import { defaultCards } from '../constants/defaultCards'
import { ActionType } from '../types/actionObj'

const cards = produce((draft: CardStateType, action: ActionType) => {
  switch (action.type) {
    case MOVE_CARD_TO_CENTER: {
      const card = draft.list[action.index]
      if (card !== null) {
        card.position = -5
        card.owner = 'common'
      }
      break
    }
    case MOVE_CARD_TO_TOP: {
      const c = draft.list[action.index]
      if (c !== null && [-2, -3, -4].includes(c.position) === false) {
        const topOk = [-2, -3, -4].some((p) => {
          const bol = draft.list.every((card) => card?.position !== p)
          if (bol) {
            const card = draft.list[action.index]
            if (card !== null) {
              card.position = p
              card.owner = 'common'
            }
          }
          return bol
        })
        if (topOk === false) {
          throw new Error('Top line is full!')
        }
      }
      break
    }
    case MOVE_CARD_TO_DECK: {
      const card = draft.list[action.index]
      if (card !== null) {
        card.position = -1
        card.isflipped = true
        card.owner = 'common'
      }
      break
    }
    case CLEAR_CARD: {
      ;[-2, -3, -4].forEach((p) => {
        draft.list.forEach((card) => {
          if (card !== null && card.position === p) {
            card.position = -1
            card.isflipped = true
          }
        })
      })
      break
    }
    case REMOVE_CARD: {
      if (draft.list[action.index] !== null) {
        draft.list[action.index] = null
      }
      break
    }
    case TEST_CARD: {
      if (draft.list[3] !== null) {
        draft.list[3] = null
      }
      if (draft.list[4] !== null) {
        draft.list[4].position = 3
      }
      if (draft.list[5] !== null) {
        draft.list[5].position = 4
      }
      draft.total = 5
      break
    }
  }
}, defaultCards)

export default cards
