import produce from 'immer'
import {
  MOVE_CARD_TO_CENTER,
  MOVE_CARD_TO_TOP,
  MOVE_CARD_TO_DECK,
  CLEAR_CARD,
  DELETE_CARD,
  REMOVE_CARD,
  DISCARD_CARD_MAIN,
  INIT_CARD,
} from '../constants/ActionTypes'
import { CardListItemAllType, CardStateType } from '../types/state'
import { ActionType } from '../types/actionObj'
import dataCards from '../data/cards'

const defaultCards: CardStateType = {
  total: { player: 0, opponent: 0 },
  list: [],
}

const numbersWithProbs = dataCards
  .map((card) => card.prob)
  .reduce(
    (acc: number[], n: number, i: number): number[] =>
      acc.concat(Array(n).fill(i)),
    [],
  )

const randomWithProbs = (): number =>
  numbersWithProbs[Math.floor(Math.random() * numbersWithProbs.length)]

const cards = produce((draft: CardStateType, action: ActionType) => {
  switch (action.type) {
    case INIT_CARD: {
      const { total } = action
      const obj: CardStateType = {
        total: { player: total, opponent: total },
        list: [],
      }
      for (let i = 0, l = total * 2; i < l; i++) {
        const card: CardListItemAllType = {
          position: i % total,
          n: randomWithProbs(),
          unusable: false,
          discarded: false,
          isflipped: false,
          owner: i < total ? 'player' : 'opponent',
        }
        obj.list.push(card)
      }
      return obj
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
