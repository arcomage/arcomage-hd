import produce from 'immer'
import {
  MOVE_CARD_TO_CENTER,
  MOVE_CARD_TO_TOP,
  DELETE_CARD,
  REMOVE_CARD,
  DISCARD_CARD_MAIN,
  INIT_CARD,
  DRAW_CARD_PRE,
  DRAW_CARD_MAIN,
  MOVE_CARD_TO_STACK,
} from '../constants/ActionTypes'
import { CardStateType } from '../types/state'
import { ActionType } from '../types/actionObj'

const defaultCards: CardStateType = {
  total: { player: 0, opponent: 0 },
  list: [],
  nextPos: { player: 0, opponent: 0 },
}

const cards = produce((draft: CardStateType, action: ActionType) => {
  switch (action.type) {
    case INIT_CARD: {
      return action.payload
    }
    case DRAW_CARD_PRE: {
      draft.list.push({
        n: action.n,
        position: -1,
        owner: 'common',
        unusable: false,
        discarded: false,
        isflipped: true,
      })
      break
    }
    case DRAW_CARD_MAIN: {
      const { position, owner } = action
      draft.total[owner] += 1
      const li = draft.list
      li.forEach((c) => {
        if (c?.owner === owner && c.position >= position) {
          c.position += 1
        }
      })
      const lastCard = li[li.length - 1]
      if (lastCard !== null) {
        lastCard.position = position
        lastCard.owner = owner
        lastCard.isflipped = false
      }
      break
    }
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
    case MOVE_CARD_TO_STACK: {
      const card = draft.list[action.index]
      if (card !== null) {
        card.position = -1
        card.unusable = true
        card.isflipped = true
        card.owner = 'common'
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
        draft.nextPos[owner] = action.position
      }
      break
    }
    case DISCARD_CARD_MAIN: {
      const card = draft.list[action.index]
      if (card !== null) {
        card.position = -2
        card.unusable = true
        card.discarded = true
        card.owner = 'common'
      }
      break
    }
    case DELETE_CARD: {
      if (draft.list[action.index] !== null) {
        draft.list[action.index] = null
      }
      break
    }
  }
}, defaultCards)

export default cards
