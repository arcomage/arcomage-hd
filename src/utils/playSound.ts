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

const play = (audio: HTMLAudioElement): void => {
  const promise = audio.play()
  if (promise !== undefined) {
    promise
      .then((_) => {})
      .catch((error) => {
        // it fails here in chrome and some browsers that webpage can't autoplay audio or video
        console.log(error)
      })
  }
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
        play(cloneAndVolume(increase ? towerUpAudio : damageAudio, _volume))
        break
      case 'wall':
        play(cloneAndVolume(increase ? wallUpAudio : damageAudio, _volume))
        break
      case 'bricks':
        play(cloneAndVolume(increase ? brickUpAudio : brickDownAudio, _volume))
        break
      case 'brickProd':
        play(cloneAndVolume(increase ? brickUpAudio : brickDownAudio, _volume))
        break
      case 'gems':
        play(cloneAndVolume(increase ? gemUpAudio : gemDownAudio, _volume))
        break
      case 'gemProd':
        play(cloneAndVolume(increase ? gemUpAudio : gemDownAudio, _volume))
        break
      case 'recruits':
        play(
          cloneAndVolume(increase ? recruitUpAudio : recruitDownAudio, _volume),
        )
        break
      case 'recruitProd':
        play(
          cloneAndVolume(increase ? recruitUpAudio : recruitDownAudio, _volume),
        )
        break
    }
  } else {
    switch (type) {
      case 'deal':
        play(cloneAndVolume(dealAudio, _volume))
        break
      case 'start':
        play(cloneAndVolume(startAudio, _volume))
        break
      case 'victory':
        play(cloneAndVolume(victoryAudio, _volume))
        break
      case 'defeat':
        play(cloneAndVolume(defeatAudio, _volume))
        break
      case 'typing':
        play(cloneAndVolume(typingAudio, _volume))
        break
    }
  }
}

export default playSound
