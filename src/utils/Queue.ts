// FIFO queue with async dequeue function

class Queue<T> {
  private _queue: T[] = []

  private _resolves: ((value: T) => void)[] = []

  get size() {
    return this._queue.length
  }

  /**
   * Init
   * @param n 0 (default): init queue & resolves; 1: init queue; 2: init resolves
   */
  init(n: number = 0) {
    if (n === 0 || n === 1) {
      this._queue = []
    }
    if (n === 0 || n === 2) {
      this._resolves = []
    }
  }

  enqueue(n: T): void {
    const firstResolve = this._resolves.shift()
    if (firstResolve === undefined) {
      this._queue.push(n)
    } else {
      firstResolve(n)
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
