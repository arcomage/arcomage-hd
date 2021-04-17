import { ConnDataType } from '../types/connData'
import devLog from './devLog'

// ===== RECEIVE SEQ =====

export let receiveSeq: number | null = null

export const nullifyReceiveSeq = () => {
  receiveSeq = null
}

export const initReceiveSeq = (seq: number) => {
  console.log(receiveSeq)
  receiveSeq = seq
  console.log(receiveSeq)
}

export const incrementReceiveSeq = (n = 1) => {
  if (receiveSeq !== null) {
    receiveSeq += n
  }
}

const receiveQueue: (ConnDataType | null)[] = []

if (process.env.ISDEV) {
  ;(window as any).rs = () => receiveSeq
  ;(window as any).rq = receiveQueue
}

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

export const getUsableConnDataList = (
  connData: ConnDataType,
): ConnDataType[] | null => {
  const { seq } = connData
  if (receiveSeq === null) {
    initReceiveSeq(seq)
  } else if (seq === receiveSeq + 1) {
    incrementReceiveSeq()
  } else {
    intoReceiveQueue(connData)
    devLog(`postponed: ${JSON.stringify(connData)}`)
    return null
  }
  const usableInReceiveQueue: ConnDataType[] = getRemoveUsablesInRQueue(seq)
  if (receiveSeq !== null) {
    incrementReceiveSeq(usableInReceiveQueue.length)
  }
  return [connData].concat(usableInReceiveQueue)
}

// ===== SEND SEQ =====

export let sendSeq: number = 0

export const resetSendSeq = () => {
  sendSeq = 0
}

export const incrementSendSeq = (n = 1) => {
  sendSeq += n
}
