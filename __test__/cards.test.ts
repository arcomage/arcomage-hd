import cards from '../src/data/cards'
import cardsbk from './cardsbk'
import { PersonStatusType } from '../src/types/state'

const dummyStatus1: PersonStatusType = {
  bricks: 3,
  gems: 0,
  recruits: 6,
  brickProd: 8,
  gemProd: 9,
  recruitProd: 11,
  tower: 12,
  wall: 0,
}

const dummyStatus2: PersonStatusType = {
  bricks: 0,
  gems: 4,
  recruits: 2,
  brickProd: 11,
  gemProd: 6,
  recruitProd: 8,
  tower: 1,
  wall: 2,
}

const dummyStatus3: PersonStatusType = {
  bricks: 8,
  gems: 13,
  recruits: 6,
  brickProd: 2,
  gemProd: 3,
  recruitProd: 6,
  tower: 20,
  wall: 2,
}

it('None of the cards is modified', () => {
  cards.forEach((card, i) => {
    const cardbk = cardsbk[i]
    const { effect: e1, ...cardRest } = card
    const { effect: e2, ...cardsbkRest } = cardbk
    expect(cardRest).toStrictEqual(cardsbkRest)

    let p1, o1, p2, o2

    // dummyStatus2 vs dummyStatus1

    p1 = { ...dummyStatus2 }
    o1 = { ...dummyStatus1 }
    e1(p1, o1)
    p2 = { ...dummyStatus2 }
    o2 = { ...dummyStatus1 }
    e2(p2, o2)
    expect(o1).toStrictEqual(o2)
    expect(p1).toStrictEqual(p2)

    expect(p1.bricks >= 0).toBeTruthy()
    expect(p1.gems >= 0).toBeTruthy()
    expect(p1.recruits >= 0).toBeTruthy()
    expect(p1.brickProd >= 1).toBeTruthy()
    expect(p1.gemProd >= 1).toBeTruthy()
    expect(p1.recruitProd >= 1).toBeTruthy()
    expect(p1.tower >= 0).toBeTruthy()
    expect(p1.wall >= 0).toBeTruthy()

    expect(o1.bricks >= 0).toBeTruthy()
    expect(o1.gems >= 0).toBeTruthy()
    expect(o1.recruits >= 0).toBeTruthy()
    expect(o1.brickProd >= 1).toBeTruthy()
    expect(o1.gemProd >= 1).toBeTruthy()
    expect(o1.recruitProd >= 1).toBeTruthy()
    expect(o1.tower >= 0).toBeTruthy()
    expect(o1.wall >= 0).toBeTruthy()

    // dummyStatus1 vs dummyStatus2

    p1 = { ...dummyStatus1 }
    o1 = { ...dummyStatus2 }
    e1(p1, o1)
    p2 = { ...dummyStatus1 }
    o2 = { ...dummyStatus2 }
    e2(p2, o2)
    expect(o1).toStrictEqual(o2)
    expect(p1).toStrictEqual(p2)

    expect(p1.bricks >= 0).toBeTruthy()
    expect(p1.gems >= 0).toBeTruthy()
    expect(p1.recruits >= 0).toBeTruthy()
    expect(p1.brickProd >= 1).toBeTruthy()
    expect(p1.gemProd >= 1).toBeTruthy()
    expect(p1.recruitProd >= 1).toBeTruthy()
    expect(p1.tower >= 0).toBeTruthy()
    expect(p1.wall >= 0).toBeTruthy()

    expect(o1.bricks >= 0).toBeTruthy()
    expect(o1.gems >= 0).toBeTruthy()
    expect(o1.recruits >= 0).toBeTruthy()
    expect(o1.brickProd >= 1).toBeTruthy()
    expect(o1.gemProd >= 1).toBeTruthy()
    expect(o1.recruitProd >= 1).toBeTruthy()
    expect(o1.tower >= 0).toBeTruthy()
    expect(o1.wall >= 0).toBeTruthy()

    // dummyStatus2 vs dummyStatus3

    p1 = { ...dummyStatus2 }
    o1 = { ...dummyStatus3 }
    e1(p1, o1)
    p2 = { ...dummyStatus2 }
    o2 = { ...dummyStatus3 }
    e2(p2, o2)
    expect(o1).toStrictEqual(o2)
    expect(p1).toStrictEqual(p2)

    expect(p1.bricks >= 0).toBeTruthy()
    expect(p1.gems >= 0).toBeTruthy()
    expect(p1.recruits >= 0).toBeTruthy()
    expect(p1.brickProd >= 1).toBeTruthy()
    expect(p1.gemProd >= 1).toBeTruthy()
    expect(p1.recruitProd >= 1).toBeTruthy()
    expect(p1.tower >= 0).toBeTruthy()
    expect(p1.wall >= 0).toBeTruthy()

    expect(o1.bricks >= 0).toBeTruthy()
    expect(o1.gems >= 0).toBeTruthy()
    expect(o1.recruits >= 0).toBeTruthy()
    expect(o1.brickProd >= 1).toBeTruthy()
    expect(o1.gemProd >= 1).toBeTruthy()
    expect(o1.recruitProd >= 1).toBeTruthy()
    expect(o1.tower >= 0).toBeTruthy()
    expect(o1.wall >= 0).toBeTruthy()
  })
})
