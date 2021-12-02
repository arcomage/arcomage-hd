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

const soundAdditionalTypes = ['deal', 'victory', 'defeat'] as const

type soundTypeType =
  | keyof PersonStatusType
  | typeof soundAdditionalTypes[number] // | 'typing' | 'start'

const AudioContext = window.AudioContext || (window as any).webkitAudioContext

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
  audioContext: AudioContext

  gainNode: GainNode

  audios: Record<string, Promise<AudioBuffer>>

  audioSourceMap:
    | Record<
        soundTypeType,
        | (() => Promise<AudioBufferSourceNode>)
        | {
            up: {
              left: () => Promise<AudioBufferSourceNode>
              right: () => Promise<AudioBufferSourceNode>
            }
            down: {
              left: () => Promise<AudioBufferSourceNode>
              right: () => Promise<AudioBufferSourceNode>
            }
          }
      >
    | undefined

  constructor(
    volume: number = 5,
    audioContext: AudioContext = new AudioContext(),
  ) {
    this.audioContext = audioContext
    this.gainNode = this.audioContext.createGain()
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

  async loadAudio(url: string): Promise<AudioBuffer> {
    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest()
      xhr.open('GET', url)
      xhr.responseType = 'arraybuffer'
      xhr.onload = () => {
        this.audioContext.decodeAudioData(xhr.response, (buffer) => {
          resolve(buffer)
        })
      }
      xhr.onerror = (e) => {
        reject(e)
      }
      xhr.send()
    })
    // return fetch(url)
    //   .then((response) => response.arrayBuffer())
    //   .then((arrayBuffer) => this.audioContext.decodeAudioData(arrayBuffer))
  }

  getSource(audio: AudioBuffer, pan: number = 0): AudioBufferSourceNode {
    const source = this.audioContext.createBufferSource()
    source.buffer = audio
    const panner = new StereoPannerNode(this.audioContext, { pan })
    source
      .connect(this.gainNode)
      .connect(panner)
      .connect(this.audioContext.destination)
    return source
  }

  setVolume(volume: number): void {
    this.gainNode.gain.value = volume / 10
  }

  play(
    type: soundTypeType,
    increase: boolean | null = null,
    isLeft: boolean | null = null, // true: left; false: right; null: none
  ): void {
    const audioName: string = (() => {
      const tempObj = audioMap[type]
      if (hasOwnProperty(tempObj, 'up')) {
        return tempObj[increase ? 'up' : 'down']
      } else {
        return tempObj
      }
    })()

    if (this.audioContext.state === 'suspended') {
      this.audioContext.resume()
    }

    const pan: number = (() => {
      if (isLeft === null) {
        return 0
      } else if (isLeft) {
        return -1
      } else {
        return 1
      }
    })()

    console.log(audioName, pan)
    ;(async () => {
      this.getSource(await this.audios[audioName], pan).start()
    })()

    // if (promise !== undefined) {
    //   promise
    //     .then((_) => {})
    //     .catch((error) => {
    //       // it fails here in chrome and some browsers that webpage can't autoplay audio or video
    //       console.log(error)
    //     })
    // }
  }
}

export const Sound = new SoundClass()
