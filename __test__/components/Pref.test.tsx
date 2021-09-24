import '../../__mocks__/matchMediaMock'
import React from 'react'
import { mount } from 'enzyme'
import { I18nProvider } from '../../src/i18n/I18nContext'
import { Provider } from 'react-redux'
import { store } from '../../src/store'
import Pref from '../../src/components/screens/Pref'

it('renders Pref', () => {
  const screen = mount(
    <Provider store={store}>
      <I18nProvider>
        <Pref />
      </I18nProvider>
    </Provider>,
  )
  const playerName = screen.find('#playerName')
  playerName.simulate('click')
  playerName.simulate('change', { target: { value: '' } })
  playerName.simulate('change', { target: { value: '😃' } })
  playerName.simulate('click')
  playerName.simulate('change', { target: { value: 'My new name' } })
  const opponentName = screen.find('#opponentName')
  opponentName.simulate('click')
  opponentName.simulate('change', { target: { value: '' } })
  opponentName.simulate('change', { target: { value: '☠️' } })
  opponentName.simulate('click')
  opponentName.simulate('change', { target: { value: 'Opponent new name' } })
  const selectTavern = screen.find('#tavern')
  selectTavern.simulate('change', { target: { value: '-2' } })
  selectTavern.simulate('change', { target: { value: '0' } })
  selectTavern.simulate('change', { target: { value: '1' } })
  const tower = screen.find('#tower')
  tower.simulate('change', { target: { value: '-74' } })
  tower.simulate('change', { target: { value: '740' } })
  tower.simulate('change', { target: { value: '74' } })
  const wall = screen.find('#wall')
  wall.simulate('change', { target: { value: '-4' } })
  wall.simulate('change', { target: { value: '500' } })
  wall.simulate('change', { target: { value: '5' } })
  const bricks = screen.find('#bricks')
  bricks.simulate('change', { target: { value: '' } })
  bricks.simulate('change', { target: { value: '370' } })
  bricks.simulate('change', { target: { value: '37' } })
  const gems = screen.find('#gems')
  gems.simulate('change', { target: { value: '13' } })
  const recruits = screen.find('#recruits')
  recruits.simulate('change', { target: { value: '42' } })
  const brickProd = screen.find('#brickProd')
  brickProd.simulate('change', { target: { value: '0' } })
  const gemProd = screen.find('#gemProd')
  gemProd.simulate('change', { target: { value: '-5' } })
  gemProd.simulate('change', { target: { value: '3' } })
  const recruitProd = screen.find('#recruitProd')
  recruitProd.simulate('change', { target: { value: '-5' } })
  recruitProd.simulate('change', { target: { value: '3' } })
  const winTower = screen.find('#winTower')
  winTower.simulate('change', { target: { value: '-4' } })
  winTower.simulate('change', { target: { value: '4' } })
  winTower.simulate('change', { target: { value: '68' } })
  const winResource = screen.find('#winResource')
  winResource.simulate('change', { target: { value: '-4' } })
  winResource.simulate('change', { target: { value: '6' } })
  winResource.simulate('change', { target: { value: '66' } })
  const cardsInHand = screen.find('#cardsInHand')
  cardsInHand.simulate('change', { target: { value: '-8' } })
  cardsInHand.simulate('change', { target: { value: '24' } })
  cardsInHand.simulate('change', { target: { value: '7' } })
  const aiType = screen.find('#aiType')
  aiType.simulate('change', { target: { value: '0' } })
  aiType.simulate('change', { target: { value: '2' } })
  const isMultiplayer = screen.find('#isMultiplayer')
  isMultiplayer.simulate('change', { target: { checked: true } })
  const yourId = screen.find('#yourId')
  yourId.simulate('click')
  const opponentId = screen.find('#opponentId')
  opponentId.simulate('change', {
    target: { value: '4b0e835d-002f-4478-8d89-e384f19cd999' },
  })
  const buttonConnect = screen.find('div.multiplayer button')
  buttonConnect.simulate('click')
  const buttonsResetApply = screen.find('div.button-wrapper button')
  buttonsResetApply.forEach((button) => {
    button.simulate('click')
  })
})
