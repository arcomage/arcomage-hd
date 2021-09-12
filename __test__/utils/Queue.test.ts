import Queue from '../../src/utils/Queue'

const ns = [57, 68, 34, 9, 365]

describe('Queue is OK', () => {
  beforeAll(async () => {
    jest.setTimeout(10000)
  })

  it('Queue sync functions are OK', () => {
    const q = new Queue<number>()
    expect(q.size).toBe(0)
    q.enqueue(ns[0])
    q.enqueue(ns[1])
    q.enqueue(ns[2])
    expect(q.size).toBe(3)
    expect(q.dequeue(true)).toBe(ns[0])
    expect(q.dequeue(true)).toBe(ns[0])
    expect(q.size).toBe(3)
    expect(q.dequeue()).toBe(ns[0])
    expect(q.size).toBe(2)
    expect(q.dequeue(true)).toBe(ns[1])
    q.enqueue(ns[3])
    expect(q.dequeue(true)).toBe(ns[1])
    expect(q.dequeue()).toBe(ns[1])
    expect(q.dequeue()).toBe(ns[2])
    expect(q.size).toBe(1)
    expect(q.dequeue()).toBe(ns[3])
    expect(q.size).toBe(0)
    expect(q.dequeue(true)).toBeNull()
    expect(q.dequeue()).toBeNull()
    q.init()
    q.enqueue(ns[4])
    expect(q.size).toBe(1)
    q.init()
    expect(q.size).toBe(0)
  })

  it('Queue dequeueAsync function is OK', async () => {
    expect.assertions(5)
    const q = new Queue<number>()
    expect(q.size).toBe(0)

    const p0 = q.dequeueAsync()
    q.enqueue(ns[3])
    await expect(p0).resolves.toBe(ns[3])

    q.enqueue(ns[2])
    const p1 = q.dequeueAsync()
    await expect(p1).resolves.toBe(ns[2])

    const p2 = q.dequeueAsync()
    const p3 = q.dequeueAsync()
    q.enqueue(ns[4])
    q.enqueue(ns[1])
    await expect(p2).resolves.toBe(ns[4])
    await expect(p3).resolves.toBe(ns[1])
  })
})
