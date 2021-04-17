import {
  getUsableConnDataList,
  incrementReceiveSeq,
  incrementSendSeq,
  initReceiveSeq,
  nullifyReceiveSeq,
  receiveSeq,
  resetSendSeq,
  sendSeq,
} from '../src/utils/seq'

it('send seq is OK', () => {
  expect(sendSeq).toBe(0)
  incrementSendSeq()
  incrementSendSeq()
  expect(sendSeq).toBe(2)
  resetSendSeq()
  expect(sendSeq).toBe(0)
})

it('receive seq is OK', () => {
  let list

  expect(receiveSeq).toBeNull()
  initReceiveSeq(2)
  expect(receiveSeq).toBe(2)
  incrementReceiveSeq()
  expect(receiveSeq).toBe(3)
  incrementReceiveSeq(2)
  expect(receiveSeq).toBe(5)

  list = getUsableConnDataList({
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

  list = getUsableConnDataList({
    kind: 'INST',
    data: { type: 'INIT_CORE', playersTurn: true, cardList: [] },
    seq: 9,
  })
  expect(list).toBeNull()

  list = getUsableConnDataList({
    kind: 'INST',
    data: { type: 'INIT_CORE', playersTurn: true, cardList: [] },
    seq: 12,
  })
  expect(list).toBeNull()

  list = getUsableConnDataList({
    kind: 'INST',
    data: { type: 'INIT_CORE', playersTurn: true, cardList: [] },
    seq: 8,
  })
  expect(list).toBeNull()

  list = getUsableConnDataList({
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

  list = getUsableConnDataList({
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

  list = getUsableConnDataList({
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

  nullifyReceiveSeq()
  expect(receiveSeq).toBeNull()
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
