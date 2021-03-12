import { PlayerStatusType } from '../types/state'
import { cloneNode } from './typeHelpers'

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

const playSound = (
  increase: boolean | null,
  statusProp: keyof PlayerStatusType,
): void => {
  if (increase !== null) {
    switch (statusProp) {
      case 'tower':
        cloneNode(increase ? towerUpAudio : damageAudio).play()
        break
      case 'wall':
        cloneNode(increase ? wallUpAudio : damageAudio).play()
        break
      case 'bricks':
        cloneNode(increase ? brickUpAudio : brickDownAudio).play()
        break
      case 'brickProd':
        cloneNode(increase ? brickUpAudio : brickDownAudio).play()
        break
      case 'gems':
        cloneNode(increase ? gemUpAudio : gemDownAudio).play()
        break
      case 'gemProd':
        cloneNode(increase ? gemUpAudio : gemDownAudio).play()
        break
      case 'recruits':
        cloneNode(increase ? recruitUpAudio : recruitDownAudio).play()
        break
      case 'recruitProd':
        cloneNode(increase ? recruitUpAudio : recruitDownAudio).play()
        break
    }
  }
}

export default playSound
