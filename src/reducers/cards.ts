import produce from 'immer'
import { TEST_CARD } from '../constants/ActionTypes'
// import {  } from '../types/actionObj'
import { CardStateType } from '../types/state'
import { defaultCards } from '../constants/defaultCards'

const cards = produce((draft: CardStateType, action: any) => {
  switch (action.type) {
    case TEST_CARD:
      if (draft.player[3] !== null) {
        draft.player[3] = null
      }
      if (draft.player[4] !== null) {
        draft.player[4].position = 3
      }
      if (draft.player[5] !== null) {
        draft.player[5].position = 4
      }
      draft.total = 5
      break
  }
}, defaultCards)

export default cards
