import { PersonStatusType } from '../types/state'
import { hasOwnProperty } from './typeHelpers'

import towerUpUrl from '../../assets/sfx/tower_up.webm'
import wallUpUrl from '../../assets/sfx/wall_up.webm'
import brickUpUrl from '../../assets/sfx/brick_up.webm'
import gemUpUrl from '../../assets/sfx/gem_up.webm'
import recruitUpUrl from '../../assets/sfx/recruit_up.webm'
import brickDownUrl from '../../assets/sfx/brick_down.webm'
import gemDownUrl from '../../assets/sfx/gem_down.webm'
import recruitDownUrl from '../../assets/sfx/recruit_down.webm'
import damageUrl from '../../assets/sfx/damage.webm'
import dealUrl from '../../assets/sfx/deal.webm'
import victoryUrl from '../../assets/sfx/victory.webm'
import defeatUrl from '../../assets/sfx/defeat.webm'
// import start from '../../assets/sfx/start.webm'
// import typing from '../../assets/sfx/typing.webm'

import { Howl, Howler } from 'howler'
import { stereoPanValue } from '../constants/visuals'

const soundAdditionalTypes = ['deal', 'victory', 'defeat'] as const
// 'typing', 'start'

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

Howler.autoUnlock = false

const loadAudio = (url: string) => {
  return new Howl({
    src: [url],
  })
}

const audios: Record<string, Howl> = {
  towerUp: loadAudio(towerUpUrl),
  wallUp: loadAudio(wallUpUrl),
  brickUp: loadAudio(brickUpUrl),
  gemUp: loadAudio(gemUpUrl),
  recruitUp: loadAudio(recruitUpUrl),
  brickDown: loadAudio(brickDownUrl),
  gemDown: loadAudio(gemDownUrl),
  recruitDown: loadAudio(recruitDownUrl),
  damage: loadAudio(damageUrl),
  deal: loadAudio(dealUrl),
  victory: loadAudio(victoryUrl),
  defeat: loadAudio(defeatUrl),
}

export const setVolume = (volume: number): void => {
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
export const play = (
  type: soundTypeType,
  increase: boolean | null = null,
  pan: boolean | number = 0,
): void => {
  const audioName: string = (() => {
    const tempObj = audioMap[type]
    if (hasOwnProperty(tempObj, 'up')) {
      return tempObj[increase ? 'up' : 'down']
    } else {
      return tempObj
    }
  })()

  const audio = audios[audioName]

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
