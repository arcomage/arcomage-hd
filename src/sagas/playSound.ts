import {
  CHANGE_RESOURCE,
  CHANGE_PROD,
  CHANGE_TOWER,
  CHANGE_WALL,
} from '../constants/ActionTypes'
import { ChangeStatusActionType } from '../actions'

import towerUp from '../../assets/sfx/tower_up.mp3'
import damage from '../../assets/sfx/damage.mp3'
import quarryUp from '../../assets/sfx/quarry_up.mp3'
import quarryDown from '../../assets/sfx/quarry_down.mp3'

const towerUpAudio = new Audio(towerUp)
const damageAudio = new Audio(damage)
const quarryUpAudio = new Audio(quarryUp)
const quarryDownAudio = new Audio(quarryDown)

function cloneNode<T extends Node>(node: T) {
  return <T>node.cloneNode(false)
}

export default function* playSound(action: ChangeStatusActionType) {
  switch (action.type) {
    case CHANGE_RESOURCE:
    case CHANGE_PROD:
      yield cloneNode(action.increase ? quarryUpAudio : quarryDownAudio).play()
      break
    case CHANGE_TOWER:
    case CHANGE_WALL:
      yield cloneNode(action.increase ? towerUpAudio : damageAudio).play()
      break
  }
}
