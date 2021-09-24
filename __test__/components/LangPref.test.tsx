import '../../__mocks__/matchMediaMock'
import React from 'react'
import { mount } from 'enzyme'
import App from '../../src/App'
import { I18nProvider } from '../../src/i18n/I18nContext'
import { Provider } from 'react-redux'
import { HelmetProvider } from 'react-helmet-async'
import { GameSizeProvider } from '../../src/utils/GameSizeContext'
import { store } from '../../src/store'

it('click langPrefButton', () => {
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
  const langButton = wrapper.find('.topbutton').at(1)
  langButton.simulate('click')
  const frButton = wrapper.find("button[lang='fr']")
  frButton.simulate('click')
  const erathianCheckbox = wrapper.find(
    '.window-wrapper input[type="checkbox"]',
  )
  erathianCheckbox.simulate('change', { target: { checked: true } })
  const cancelButton = wrapper.find('button.cancel')
  cancelButton.simulate('click')
})
