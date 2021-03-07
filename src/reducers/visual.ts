import produce from 'immer'
import { SHOW_EXPLOSION, HIDE_EXPLOSION } from '../constants/ActionTypes'
import { VisualType } from '../types/statetype'
import { ShowExplosionType, HideExplosionType } from '../actions'
import { defaultVisual } from '../constants/defaultVisual'

const visual = produce(
  (draft: VisualType, action: ShowExplosionType | HideExplosionType) => {
    switch (action.type) {
      case SHOW_EXPLOSION:
        draft.explosion[action.isPlayer ? 'player' : 'opponent'][
          action.isTower ? 'tower' : 'wall'
        ] = true
        break
      case HIDE_EXPLOSION:
        draft.explosion[action.isPlayer ? 'player' : 'opponent'][
          action.isTower ? 'tower' : 'wall'
        ] = false
        break
    }
  },
  defaultVisual,
)

export default visual
