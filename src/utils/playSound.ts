import { PersonStatusType } from '../types/state'
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
import deal from '../../assets/sfx/deal.mp3'
import start from '../../assets/sfx/start.mp3'
import victory from '../../assets/sfx/victory.mp3'
import defeat from '../../assets/sfx/defeat.mp3'
import typing from '../../assets/sfx/typing.mp3'

const towerUpAudio = new Audio(towerUp)
const wallUpAudio = new Audio(wallUp)
const brickUpAudio = new Audio(brickUp)
const gemUpAudio = new Audio(gemUp)
const recruitUpAudio = new Audio(recruitUp)
const brickDownAudio = new Audio(brickDown)
const gemDownAudio = new Audio(gemDown)
const recruitDownAudio = new Audio(recruitDown)
const damageAudio = new Audio(damage)
const dealAudio = new Audio(deal)
const startAudio = new Audio(start)
const victoryAudio = new Audio(victory)
const defeatAudio = new Audio(defeat)
const typingAudio = new Audio(typing)

type soundAddtionalType = 'deal' | 'start' | 'victory' | 'defeat' | 'typing'

const playSound = (
  type: keyof PersonStatusType | soundAddtionalType,
  increase: boolean | null = null,
): void => {
  if (increase !== null) {
    switch (type) {
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
  } else {
    switch (type) {
      case 'deal':
        cloneNode(dealAudio).play()
        break
      case 'start':
        cloneNode(startAudio).play()
        break
      case 'victory':
        cloneNode(victoryAudio).play()
        break
      case 'defeat':
        cloneNode(defeatAudio).play()
        break
      case 'typing':
        cloneNode(typingAudio).play()
        break
    }
  }
}

export default playSound
