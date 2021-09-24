import { getWinState } from '../../src/utils/startWinState'

it('getWinState is OK', () => {
  const state = {
    playerName: '🤣',
    opponentName: '💩',
    tower: 20,
    wall: 10,
    brickProd: 2,
    gemProd: 2,
    recruitProd: 2,
    bricks: 5,
    gems: 5,
    recruits: 5,
    winTower: 50,
    winResource: 100,
    cardsInHand: 5,
    isMultiplayer: false,
    yourId: '',
  }
  const res = getWinState(state)
  expect(res).toEqual({
    winTower: 50,
    winResource: 100,
  })
})
