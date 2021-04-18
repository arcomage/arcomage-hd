// FIFO queue with async dequeue function

class Queue<T> {
  private _queue: T[] = []

  private _resolves: ((value: T) => void)[] = []

  get size() {
    return this._queue.length
  }

  init() {
    this._queue = []
    this._resolves = []
  }

  enqueue(n: T): void {
    if (this._resolves.length === 0) {
      this._queue.push(n)
    } else {
      const resolve = this._resolves[0]
      resolve(n)
      this._resolves.shift()
    }
  }

  dequeue(peek: boolean = false): T | null {
    return (peek ? this._queue[0] : this._queue.shift()) ?? null
  }

  async dequeueAsync(): Promise<T> {
    return (
      this._queue.shift() ??
      new Promise((resolve, reject) => {
        this._resolves.push(resolve)
        // setTimeout(() => {
        //   reject('timeout')
        // }, 60000)
      })
    )
  }
}

export default Queue
