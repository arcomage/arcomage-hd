import produce from 'immer'
import {
  MOVE_CARD_TO_CENTER,
  MOVE_CARD_TO_TOP,
  MOVE_CARD_TO_DECK,
  CLEAR_CARD,
  DELETE_CARD,
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
        card.unusable = true
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
              card.unusable = true
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
        card.unusable = true
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
    case DELETE_CARD: {
      if (draft.list[action.index] !== null) {
        draft.list[action.index] = null
      }
      break
    }
    case REMOVE_CARD: {
      const card = draft.list[action.index]
      if (card !== null) {
        const owner = action.owner
        draft.total[owner] -= 1
        draft.list.forEach((c) => {
          if (c?.owner === owner && c.position > action.position) {
            c.position -= 1
          }
        })
      }
      break
    }
  }
}, defaultCards)

export default cards
