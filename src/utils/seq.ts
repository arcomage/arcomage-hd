import { ConnDataType } from '../types/connData'

// ===== RECEIVE SEQ =====

export let receiveSeq: number | null = null

export const nullifyReceiveSeq = () => {
  receiveSeq = null
}

export const initReceiveSeq = (seq: number) => {
  receiveSeq = seq
}

export const incrementReceiveSeq = () => {
  if (receiveSeq !== null) {
    receiveSeq++
  }
}

const receiveQueue: (ConnDataType | null)[] = []

;(window as any).rr = receiveQueue

export const intoReceiveQueue = (connData: ConnDataType) => {
  receiveQueue.push(connData)
}

export const getRemoveUsablesInRQueue = (seq: number) => {
  const ret: ConnDataType[] = []
  let _seq = seq
  if (receiveQueue.length !== 0) {
    do {
      _seq++
      const i = receiveQueue.findIndex(
        (connData) => connData !== null && connData.seq === _seq,
      )
      if (i === -1) {
        break
      }
      const target = receiveQueue[i]
      if (target !== null) {
        // for ts check
        ret.push(target)
      }
      receiveQueue[i] = null
    } while (!receiveQueue.every((connData) => connData === null))
  }
  return ret
}

// ===== SEND SEQ =====

export let sendSeq: number = 0

export const resetSendSeq = () => {
  sendSeq = 0
}

export const incrementSendSeq = () => {
  sendSeq++
}
