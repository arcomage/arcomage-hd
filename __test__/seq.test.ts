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
    data: {
      type: 'INIT_CORE',
      playersTurn: true,
      cardList: [],
      gameNumber: null,
    },
    seq: 6,
    gameNumber: null,
  })
  expect(list).toStrictEqual([
    {
      kind: 'INST',
      data: {
        type: 'INIT_CORE',
        playersTurn: true,
        cardList: [],
        gameNumber: null,
      },
      seq: 6,
      gameNumber: null,
    },
  ])

  list = receiveSeq.getUsableConnDataList({
    kind: 'INST',
    data: {
      type: 'INIT_CORE',
      playersTurn: true,
      cardList: [],
      gameNumber: null,
    },
    seq: 9,
    gameNumber: null,
  })
  expect(list).toBeNull()

  list = receiveSeq.getUsableConnDataList({
    kind: 'INST',
    data: {
      type: 'INIT_CORE',
      playersTurn: true,
      cardList: [],
      gameNumber: null,
    },
    seq: 12,
    gameNumber: null,
  })
  expect(list).toBeNull()

  list = receiveSeq.getUsableConnDataList({
    kind: 'INST',
    data: {
      type: 'INIT_CORE',
      playersTurn: true,
      cardList: [],
      gameNumber: null,
    },
    seq: 8,
    gameNumber: null,
  })
  expect(list).toBeNull()

  list = receiveSeq.getUsableConnDataList({
    kind: 'INST',
    data: {
      type: 'INIT_CORE',
      playersTurn: true,
      cardList: [],
      gameNumber: null,
    },
    seq: 7,
    gameNumber: null,
  })
  expect(list).toStrictEqual([
    {
      kind: 'INST',
      data: {
        type: 'INIT_CORE',
        playersTurn: true,
        cardList: [],
        gameNumber: null,
      },
      seq: 7,
      gameNumber: null,
    },
    {
      kind: 'INST',
      data: {
        type: 'INIT_CORE',
        playersTurn: true,
        cardList: [],
        gameNumber: null,
      },
      seq: 8,
      gameNumber: null,
    },
    {
      kind: 'INST',
      data: {
        type: 'INIT_CORE',
        playersTurn: true,
        cardList: [],
        gameNumber: null,
      },
      seq: 9,
      gameNumber: null,
    },
  ])

  list = receiveSeq.getUsableConnDataList({
    kind: 'INST',
    data: {
      type: 'INIT_CORE',
      playersTurn: true,
      cardList: [],
      gameNumber: null,
    },
    seq: 10,
    gameNumber: null,
  })
  expect(list).toStrictEqual([
    {
      kind: 'INST',
      data: {
        type: 'INIT_CORE',
        playersTurn: true,
        cardList: [],
        gameNumber: null,
      },
      seq: 10,
      gameNumber: null,
    },
  ])

  list = receiveSeq.getUsableConnDataList({
    kind: 'INST',
    data: {
      type: 'INIT_CORE',
      playersTurn: true,
      cardList: [],
      gameNumber: null,
    },
    seq: 11,
    gameNumber: null,
  })
  expect(list).toStrictEqual([
    {
      kind: 'INST',
      data: {
        type: 'INIT_CORE',
        playersTurn: true,
        cardList: [],
        gameNumber: null,
      },
      seq: 11,
      gameNumber: null,
    },
    {
      kind: 'INST',
      data: {
        type: 'INIT_CORE',
        playersTurn: true,
        cardList: [],
        gameNumber: null,
      },
      seq: 12,
      gameNumber: null,
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
