import { ConnDataType } from '../types/connData'
import devLog from './devLog'

class receiveSequence {
  private _v: number = 0
  private _queue: (ConnDataType | null)[] = []

  get v() {
    return this._v
  }

  reset() {
    this._v = 0
  }

  add(n = 1) {
    this._v += n
  }

  private enqueue(connData: ConnDataType) {
    this._queue.push(connData)
  }

  private getRemoveUsablesInQueue(seq: number) {
    const ret: ConnDataType[] = []
    let _seq = seq
    if (this._queue.length !== 0) {
      while (true) {
        _seq++
        const i = this._queue.findIndex(
          (connData) => connData !== null && connData.seq === _seq,
        )
        if (i === -1) {
          break
        }
        const target = this._queue[i]
        if (target !== null) {
          // for ts check
          ret.push(target)
        }
        this._queue[i] = null
        if (this._queue.every((connData) => connData === null)) {
          this._queue = []
          break
        }
      }
    }
    return ret
  }

  getUsableConnDataList(connData: ConnDataType): ConnDataType[] | null {
    const { seq } = connData
    if (seq === this._v + 1) {
      this.add()
    } else {
      this.enqueue(connData)
      devLog(`postponed: ${JSON.stringify(connData)}`, 'note')
      return null
    }
    const usableInReceiveQueue: ConnDataType[] = this.getRemoveUsablesInQueue(
      seq,
    )
    this.add(usableInReceiveQueue.length)
    devLog(
      `pulled (executed): ${JSON.stringify(
        [connData].concat(usableInReceiveQueue),
      )}`,
      'note',
    )
    return [connData].concat(usableInReceiveQueue)
  }
}

export const receiveSeq = new receiveSequence()

class sendSequence {
  private _v: number = 0

  get v() {
    return this._v
  }

  add(n = 1) {
    this._v += n
  }

  reset() {
    this._v = 0
  }
}

export const sendSeq = new sendSequence()

if (process.env.ISDEV) {
  ;(window as any).sq = sendSeq
  ;(window as any).rq = receiveSeq
}
