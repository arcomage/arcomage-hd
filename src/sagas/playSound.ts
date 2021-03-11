import { UpdateStatusActionType } from '../types/actionObj'
import { select } from 'redux-saga/effects'

import { StateType, StatusType } from '../types/state'

import towerUp from '../../assets/sfx/tower_up.mp3'
import wallUp from '../../assets/sfx/wall_up.mp3'
import brickUp from '../../assets/sfx/brick_up.mp3'
import gemUp from '../../assets/sfx/gem_up.mp3'
import recruitUp from '../../assets/sfx/recruit_up.mp3'
import brickDown from '../../assets/sfx/brick_down.mp3'
import gemDown from '../../assets/sfx/gem_down.mp3'
import recruitDown from '../../assets/sfx/recruit_down.mp3'
import damage from '../../assets/sfx/damage.mp3'

const towerUpAudio = new Audio(towerUp)
const wallUpAudio = new Audio(wallUp)
const brickUpAudio = new Audio(brickUp)
const gemUpAudio = new Audio(gemUp)
const recruitUpAudio = new Audio(recruitUp)
const brickDownAudio = new Audio(brickDown)
const gemDownAudio = new Audio(gemDown)
const recruitDownAudio = new Audio(recruitDown)
const damageAudio = new Audio(damage)

function cloneNode<T extends Node>(node: T) {
  return <T>node.cloneNode()
}

export default function* playSound(action: UpdateStatusActionType): any {
  const { isPlayer, statusProp, to } = action
  const status: StatusType = yield select(
    (state: StateType): StatusType => state.status,
  )
  const from: number = status[isPlayer ? 'player' : 'opponent'][statusProp]
  if (to !== from) {
    const up = to > from
    switch (statusProp) {
      case 'tower':
        yield cloneNode(up ? towerUpAudio : damageAudio).play()
        break
      case 'wall':
        yield cloneNode(up ? wallUpAudio : damageAudio).play()
        break
      case 'bricks':
        yield cloneNode(up ? brickUpAudio : brickDownAudio).play()
        break
      case 'brickProd':
        yield cloneNode(up ? brickUpAudio : brickDownAudio).play()
        break
      case 'gems':
        yield cloneNode(up ? gemUpAudio : gemDownAudio).play()
        break
      case 'gemProd':
        yield cloneNode(up ? gemUpAudio : gemDownAudio).play()
        break
      case 'recruits':
        yield cloneNode(up ? recruitUpAudio : recruitDownAudio).play()
        break
      case 'recruitProd':
        yield cloneNode(up ? recruitUpAudio : recruitDownAudio).play()
        break
    }
  }
}
