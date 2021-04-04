import produce from 'immer'
import {
  MOVE_CARD_TO_CENTER,
  DELETE_CARD,
  REMOVE_CARD,
  ADD_DISCARDED_TAG,
  INIT_CARD,
  DRAW_CARD_PRE,
  DRAW_CARD_MAIN,
  MOVE_CARD_TO_STACK,
  SET_UNUSABLE,
  MOVE_CARD_TO_TOP_MAIN,
  SET_ZERO_OPACITY,
} from '../constants/ActionTypes'
import { CardStateType } from '../types/state'
import { RootActionType } from '../types/actionObj'

const defaultCards: CardStateType = {
  total: { player: 0, opponent: 0 },
  list: [],
  nextPos: { player: 0, opponent: 0 },
}

const cards = produce((draft: CardStateType, action: RootActionType) => {
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
        isFlipped: true,
        zeroOpacity: false,
      })
      break
    }
    case DRAW_CARD_MAIN: {
      const { owner } = action
      const position = draft.nextPos[owner]
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
        lastCard.isFlipped = false
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
    case MOVE_CARD_TO_TOP_MAIN: {
      const card = draft.list[action.index]
      if (card !== null) {
        card.position = action.toPosition
        card.unusable = true
        card.owner = 'common'
      }
      break
    }
    case MOVE_CARD_TO_STACK: {
      const card = draft.list[action.index]
      if (card !== null) {
        card.position = -1
        card.unusable = true
        card.isFlipped = true
        card.owner = 'common'
      }
      break
    }
    case SET_ZERO_OPACITY: {
      const card = draft.list[action.index]
      if (card !== null) {
        card.zeroOpacity = true
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
    case ADD_DISCARDED_TAG: {
      const card = draft.list[action.index]
      if (card !== null) {
        card.discarded = true
      }
      break
    }
    case DELETE_CARD: {
      if (draft.list[action.index] !== null) {
        draft.list[action.index] = null
      }
      break
    }
    case SET_UNUSABLE: {
      action.unusables.forEach((index) => {
        const card = draft.list[index]
        if (card !== null) {
          card.unusable = true
        }
      })
      action.usables.forEach((index) => {
        const card = draft.list[index]
        if (card !== null) {
          card.unusable = false
        }
      })
      break
    }
  }
}, defaultCards)

export default cards
