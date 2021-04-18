import Queue from './Queue'

export const drawCardQueue = new Queue<number>()

if (process.env.ISDEV) {
  ;(window as any).dcq = drawCardQueue
}
