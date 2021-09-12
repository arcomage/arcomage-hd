import '../../__mocks__/matchMediaMock'
import React from 'react'
import { mount } from 'enzyme'
import App from '../../src/App'
import { HelmetProvider } from 'react-helmet-async'
import { GameSizeProvider } from '../../src/utils/GameSizeContext'
import { I18nProvider } from '../../src/i18n/I18nContext'
import { Provider } from 'react-redux'
import { store } from '../../src/store'

it('renders App and has clickable button(s)', () => {
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
  const buttons = wrapper.find('button')
  expect(buttons.length > 0).toBeTruthy()
  buttons.forEach((button) => {
    button.simulate('click')
  })
})
