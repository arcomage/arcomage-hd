import { receiveSeq, sendSeq } from '../src/utils/seq'

it('send seq is OK', () => {
  expect(sendSeq.v).toBe(0)
  sendSeq.add()
  sendSeq.add()
  expect(sendSeq.v).toBe(2)
  sendSeq.reset()
  expect(sendSeq.v).toBe(0)
})

it('receive seq is OK', () => {
  let list

  expect(receiveSeq.v).toBe(0)
  receiveSeq.reset()
  expect(receiveSeq.v).toBe(0)
  receiveSeq.add(4)
  expect(receiveSeq.v).toBe(4)
  receiveSeq.add()
  expect(receiveSeq.v).toBe(5)

  list = receiveSeq.getUsableConnDataList({
    kind: 'INST',
    data: { type: 'INIT_CORE', playersTurn: true, cardList: [] },
    seq: 6,
  })
  expect(list).toStrictEqual([
    {
      kind: 'INST',
      data: { type: 'INIT_CORE', playersTurn: true, cardList: [] },
      seq: 6,
    },
  ])

  list = receiveSeq.getUsableConnDataList({
    kind: 'INST',
    data: { type: 'INIT_CORE', playersTurn: true, cardList: [] },
    seq: 9,
  })
  expect(list).toBeNull()

  list = receiveSeq.getUsableConnDataList({
    kind: 'INST',
    data: { type: 'INIT_CORE', playersTurn: true, cardList: [] },
    seq: 12,
  })
  expect(list).toBeNull()

  list = receiveSeq.getUsableConnDataList({
    kind: 'INST',
    data: { type: 'INIT_CORE', playersTurn: true, cardList: [] },
    seq: 8,
  })
  expect(list).toBeNull()

  list = receiveSeq.getUsableConnDataList({
    kind: 'INST',
    data: { type: 'INIT_CORE', playersTurn: true, cardList: [] },
    seq: 7,
  })
  expect(list).toStrictEqual([
    {
      kind: 'INST',
      data: { type: 'INIT_CORE', playersTurn: true, cardList: [] },
      seq: 7,
    },
    {
      kind: 'INST',
      data: { type: 'INIT_CORE', playersTurn: true, cardList: [] },
      seq: 8,
    },
    {
      kind: 'INST',
      data: { type: 'INIT_CORE', playersTurn: true, cardList: [] },
      seq: 9,
    },
  ])

  list = receiveSeq.getUsableConnDataList({
    kind: 'INST',
    data: { type: 'INIT_CORE', playersTurn: true, cardList: [] },
    seq: 10,
  })
  expect(list).toStrictEqual([
    {
      kind: 'INST',
      data: { type: 'INIT_CORE', playersTurn: true, cardList: [] },
      seq: 10,
    },
  ])

  list = receiveSeq.getUsableConnDataList({
    kind: 'INST',
    data: { type: 'INIT_CORE', playersTurn: true, cardList: [] },
    seq: 11,
  })
  expect(list).toStrictEqual([
    {
      kind: 'INST',
      data: { type: 'INIT_CORE', playersTurn: true, cardList: [] },
      seq: 11,
    },
    {
      kind: 'INST',
      data: { type: 'INIT_CORE', playersTurn: true, cardList: [] },
      seq: 12,
    },
  ])

  receiveSeq.reset()
  expect(receiveSeq.v).toBe(0)
})

// {
//   type: 'SEND',
//   kind: 'INST',
//   data: {
//     type: 'INIT_CORE',
//     playersTurn: true,
//     cardList: []
//   }
// }
