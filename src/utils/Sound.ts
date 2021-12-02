import { PersonStatusType } from '../types/state'
import { hasOwnProperty } from './typeHelpers'

import towerUpUrl from '../../assets/sfx/tower_up.mp3'
import wallUpUrl from '../../assets/sfx/wall_up.mp3'
import brickUpUrl from '../../assets/sfx/brick_up.mp3'
import gemUpUrl from '../../assets/sfx/gem_up.mp3'
import recruitUpUrl from '../../assets/sfx/recruit_up.mp3'
import brickDownUrl from '../../assets/sfx/brick_down.mp3'
import gemDownUrl from '../../assets/sfx/gem_down.mp3'
import recruitDownUrl from '../../assets/sfx/recruit_down.mp3'
import damageUrl from '../../assets/sfx/damage.mp3'
import dealUrl from '../../assets/sfx/deal.mp3'
import victoryUrl from '../../assets/sfx/victory.mp3'
import defeatUrl from '../../assets/sfx/defeat.mp3'
// import start from '../../assets/sfx/start.mp3'
// import typing from '../../assets/sfx/typing.mp3'

import { Howl, Howler } from 'howler'
import { stereoPanValue } from '../constants/visuals'

const soundAdditionalTypes = ['deal', 'victory', 'defeat'] as const // | 'typing' | 'start'

type soundTypeType =
  | keyof PersonStatusType
  | typeof soundAdditionalTypes[number]

const audioMap = {
  tower: {
    up: 'towerUp',
    down: 'damage',
  },
  wall: {
    up: 'wallUp',
    down: 'damage',
  },
  bricks: {
    up: 'brickUp',
    down: 'brickDown',
  },
  brickProd: {
    up: 'brickUp',
    down: 'brickDown',
  },
  gems: {
    up: 'gemUp',
    down: 'gemDown',
  },
  gemProd: {
    up: 'gemUp',
    down: 'gemDown',
  },
  recruits: {
    up: 'recruitUp',
    down: 'recruitDown',
  },
  recruitProd: {
    up: 'recruitUp',
    down: 'recruitDown',
  },
  deal: 'deal',
  victory: 'victory',
  defeat: 'defeat',
}

export class SoundClass {
  audios: Record<string, Howl>

  constructor(volume: number = 5) {
    this.setVolume(volume)

    this.audios = {
      towerUp: this.loadAudio(towerUpUrl),
      wallUp: this.loadAudio(wallUpUrl),
      brickUp: this.loadAudio(brickUpUrl),
      gemUp: this.loadAudio(gemUpUrl),
      recruitUp: this.loadAudio(recruitUpUrl),
      brickDown: this.loadAudio(brickDownUrl),
      gemDown: this.loadAudio(gemDownUrl),
      recruitDown: this.loadAudio(recruitDownUrl),
      damage: this.loadAudio(damageUrl),
      deal: this.loadAudio(dealUrl),
      victory: this.loadAudio(victoryUrl),
      defeat: this.loadAudio(defeatUrl),
    }
  }

  loadAudio(url: string) {
    return new Howl({
      src: [url],
    })
  }

  setVolume(volume: number): void {
    Howler.volume(volume / 10)
  }

  /**
   *
   * @param type - sound type name
   * @param increase - increase or decrease, only for `tower`, `wall` and resource-related
   * @param pan - stereo pan value, `-1` to `1`,
   * if it's boolean, then: `true`: -stereoPanValue (-0.8 for now, i.e. real left);
   * `false`: stereoPanValue (0.8 for now, i.e. real right)
   */
  play(
    type: soundTypeType,
    increase: boolean | null = null,
    pan: boolean | number = 0,
  ): void {
    const audioName: string = (() => {
      const tempObj = audioMap[type]
      if (hasOwnProperty(tempObj, 'up')) {
        return tempObj[increase ? 'up' : 'down']
      } else {
        return tempObj
      }
    })()

    const audio = this.audios[audioName]

    const _pan: number = (() => {
      if (typeof pan === 'boolean') {
        return pan ? -stereoPanValue : stereoPanValue
      } else {
        return pan
      }
    })()
    audio.stereo(_pan)

    audio.play()
  }
}

export const Sound = new SoundClass()
