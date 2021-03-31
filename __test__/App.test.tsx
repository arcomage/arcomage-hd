import React from 'react'
import { mount, shallow } from 'enzyme'
import App from '../src/App'
import { HelmetProvider } from 'react-helmet-async'
import { GameSizeProvider } from '../src/utils/GameSizeContext'
import { I18nProvider } from '../src/i18n/I18nContext'
import { Provider } from 'react-redux'
import { store } from '../src/store'

it('renders without crashing', () => {
  shallow(
    <Provider store={store}>
      <I18nProvider>
        <GameSizeProvider>
          <HelmetProvider>
            <App />
          </HelmetProvider>
        </GameSizeProvider>
      </I18nProvider>
    </Provider>,
  )
})

it('has button(s)', () => {
  const wrapper = mount(
    <Provider store={store}>
      <I18nProvider>
        <GameSizeProvider>
          <HelmetProvider>
            <App />
          </HelmetProvider>
        </GameSizeProvider>
      </I18nProvider>
    </Provider>,
  )
  expect(wrapper.find('button').length > 0).toBeTruthy()
})
