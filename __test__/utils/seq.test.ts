import { receiveSeq, sendSeq } from '../../src/utils/seq'

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
      gameNumber: -1,
    },
    seq: 6,
    gameNumber: -1,
  })
  expect(list).toStrictEqual([
    {
      kind: 'INST',
      data: {
        type: 'INIT_CORE',
        playersTurn: true,
        cardList: [],
        gameNumber: -1,
      },
      seq: 6,
      gameNumber: -1,
    },
  ])

  list = receiveSeq.getUsableConnDataList({
    kind: 'INST',
    data: {
      type: 'INIT_CORE',
      playersTurn: true,
      cardList: [],
      gameNumber: -1,
    },
    seq: 9,
    gameNumber: -1,
  })
  expect(list).toBeNull()

  list = receiveSeq.getUsableConnDataList({
    kind: 'INST',
    data: {
      type: 'INIT_CORE',
      playersTurn: true,
      cardList: [],
      gameNumber: -1,
    },
    seq: 12,
    gameNumber: -1,
  })
  expect(list).toBeNull()

  list = receiveSeq.getUsableConnDataList({
    kind: 'INST',
    data: {
      type: 'INIT_CORE',
      playersTurn: true,
      cardList: [],
      gameNumber: -1,
    },
    seq: 8,
    gameNumber: -1,
  })
  expect(list).toBeNull()

  list = receiveSeq.getUsableConnDataList({
    kind: 'INST',
    data: {
      type: 'INIT_CORE',
      playersTurn: true,
      cardList: [],
      gameNumber: -1,
    },
    seq: 7,
    gameNumber: -1,
  })
  expect(list).toStrictEqual([
    {
      kind: 'INST',
      data: {
        type: 'INIT_CORE',
        playersTurn: true,
        cardList: [],
        gameNumber: -1,
      },
      seq: 7,
      gameNumber: -1,
    },
    {
      kind: 'INST',
      data: {
        type: 'INIT_CORE',
        playersTurn: true,
        cardList: [],
        gameNumber: -1,
      },
      seq: 8,
      gameNumber: -1,
    },
    {
      kind: 'INST',
      data: {
        type: 'INIT_CORE',
        playersTurn: true,
        cardList: [],
        gameNumber: -1,
      },
      seq: 9,
      gameNumber: -1,
    },
  ])

  list = receiveSeq.getUsableConnDataList({
    kind: 'INST',
    data: {
      type: 'INIT_CORE',
      playersTurn: true,
      cardList: [],
      gameNumber: -1,
    },
    seq: 10,
    gameNumber: -1,
  })
  expect(list).toStrictEqual([
    {
      kind: 'INST',
      data: {
        type: 'INIT_CORE',
        playersTurn: true,
        cardList: [],
        gameNumber: -1,
      },
      seq: 10,
      gameNumber: -1,
    },
  ])

  list = receiveSeq.getUsableConnDataList({
    kind: 'INST',
    data: {
      type: 'INIT_CORE',
      playersTurn: true,
      cardList: [],
      gameNumber: -1,
    },
    seq: 11,
    gameNumber: -1,
  })
  expect(list).toStrictEqual([
    {
      kind: 'INST',
      data: {
        type: 'INIT_CORE',
        playersTurn: true,
        cardList: [],
        gameNumber: -1,
      },
      seq: 11,
      gameNumber: -1,
    },
    {
      kind: 'INST',
      data: {
        type: 'INIT_CORE',
        playersTurn: true,
        cardList: [],
        gameNumber: -1,
      },
      seq: 12,
      gameNumber: -1,
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
