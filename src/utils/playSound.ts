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

const cloneAndVolume = (
  audio: HTMLAudioElement,
  volume: number,
): HTMLAudioElement => {
  const _audio = cloneNode(audio)
  _audio.volume = volume
  return _audio
}

const playSound = (
  type: keyof PersonStatusType | soundAddtionalType,
  volume: number = 10,
  increase: boolean | null = null,
): void => {
  const _volume = volume / 10
  if (increase !== null) {
    switch (type) {
      case 'tower':
        cloneAndVolume(increase ? towerUpAudio : damageAudio, _volume).play()
        break
      case 'wall':
        cloneAndVolume(increase ? wallUpAudio : damageAudio, _volume).play()
        break
      case 'bricks':
        cloneAndVolume(increase ? brickUpAudio : brickDownAudio, _volume).play()
        break
      case 'brickProd':
        cloneAndVolume(increase ? brickUpAudio : brickDownAudio, _volume).play()
        break
      case 'gems':
        cloneAndVolume(increase ? gemUpAudio : gemDownAudio, _volume).play()
        break
      case 'gemProd':
        cloneAndVolume(increase ? gemUpAudio : gemDownAudio, _volume).play()
        break
      case 'recruits':
        cloneAndVolume(
          increase ? recruitUpAudio : recruitDownAudio,
          _volume,
        ).play()
        break
      case 'recruitProd':
        cloneAndVolume(
          increase ? recruitUpAudio : recruitDownAudio,
          _volume,
        ).play()
        break
    }
  } else {
    switch (type) {
      case 'deal':
        cloneAndVolume(dealAudio, _volume).play()
        break
      case 'start':
        cloneAndVolume(startAudio, _volume).play()
        break
      case 'victory':
        cloneAndVolume(victoryAudio, _volume).play()
        break
      case 'defeat':
        cloneAndVolume(defeatAudio, _volume).play()
        break
      case 'typing':
        cloneAndVolume(typingAudio, _volume).play()
        break
    }
  }
}

export default playSound
