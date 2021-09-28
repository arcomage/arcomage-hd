import React from 'react'
import { mount } from 'enzyme'
import { GameSizeProvider } from '../../src/utils/GameSizeContext'
import { I18nProvider } from '../../src/i18n/I18nContext'
import { Provider } from 'react-redux'
import { store } from '../../src/store'
import Card from '../../src/components/Card'
import { CardListItemType } from '../../src/types/state'
import { CardPosProvider } from '../../src/utils/CardPosContext'

it('renders Card 1 that is clickable', () => {
  const cardProps: CardListItemType = {
    n: 41,
    position: 2,
    owner: 'player',
    unusable: false,
    discarded: false,
    isFlipped: false,
    zeroOpacity: false,
  }
  const cardPosProviderProps = {
    cardsInHand: 2,
    winHeight: 1024,
    winWidth: 768,
  }
  const card = mount(
    <Provider store={store}>
      <I18nProvider>
        <GameSizeProvider>
          <CardPosProvider {...cardPosProviderProps}>
            <Card {...cardProps} />
          </CardPosProvider>
        </GameSizeProvider>
      </I18nProvider>
    </Provider>,
  )
  expect(card.length).toBe(1)
  card.simulate('click')
})

it('renders Card 1 that is right-clickable', () => {
  const cardProps: CardListItemType = {
    n: 41,
    position: 2,
    owner: 'player',
    unusable: false,
    discarded: false,
    isFlipped: false,
    zeroOpacity: false,
  }
  const cardPosProviderProps = {
    cardsInHand: 2,
    winHeight: 1024,
    winWidth: 768,
  }
  const card = mount(
    <Provider store={store}>
      <I18nProvider>
        <GameSizeProvider>
          <CardPosProvider {...cardPosProviderProps}>
            <Card {...cardProps} />
          </CardPosProvider>
        </GameSizeProvider>
      </I18nProvider>
    </Provider>,
  )
  expect(card.length).toBe(1)
  card.simulate('contextmenu')
})

it('renders Card 2', () => {
  const cardProps: CardListItemType = {
    n: 72,
    position: -3,
    unusable: true,
    discarded: true,
    isFlipped: true,
    zeroOpacity: true,
    owner: 'opponent',
  }
  const cardPosProviderProps = {
    cardsInHand: 2,
    winHeight: 768,
    winWidth: 1024,
  }
  const card = mount(
    <Provider store={store}>
      <I18nProvider>
        <GameSizeProvider>
          <CardPosProvider {...cardPosProviderProps}>
            <Card {...cardProps} />
          </CardPosProvider>
        </GameSizeProvider>
      </I18nProvider>
    </Provider>,
  )
  expect(card.length).toBe(1)
  card.simulate('click')
})
