import './matchMediaMock'
import './audioContextMock'
import React from 'react'
import { mount } from 'enzyme'
import App from '../../src/App'
import { I18nProvider } from '../../src/i18n/I18nContext'
import { Provider } from 'react-redux'
import { HelmetProvider } from 'react-helmet-async'
import { GameSizeProvider } from '../../src/utils/GameSizeContext'
import { store } from '../../src/store'

it('click volumePrefButton', () => {
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
  const langButton = wrapper.find('.topbutton').at(2)
  expect(langButton.length).toBe(1)
  langButton.simulate('click')
  const resetButton = wrapper.find('.button-wrapper button')
  expect(resetButton.length).toBe(1)
  resetButton.simulate('click')
  const volumeRange = wrapper.find('.window-wrapper input[type="range"]').at(0)
  expect(volumeRange.length).toBe(1)
  volumeRange.simulate('change', { target: { value: '10' } })
  volumeRange.simulate('change', { target: { value: '6' } })
  volumeRange.simulate('change', { target: { value: '0' } })
  const pixelationRange = wrapper
    .find('.window-wrapper input[type="range"]')
    .at(1)
  expect(pixelationRange.length).toBe(1)
  pixelationRange.simulate('change', { target: { value: '10' } })
  pixelationRange.simulate('change', { target: { value: '6' } })
  pixelationRange.simulate('change', { target: { value: '0' } })
  const volumeCheckbox = wrapper
    .find('.window-wrapper input[type="checkbox"]')
    .at(0)
  expect(volumeCheckbox.length).toBe(1)
  volumeCheckbox.simulate('change', { target: { checked: true } })
  volumeCheckbox.simulate('change', { target: { checked: false } })
  const pixelationCheckbox = wrapper
    .find('.window-wrapper input[type="checkbox"]')
    .at(1)
  expect(pixelationCheckbox.length).toBe(1)
  pixelationCheckbox.simulate('change', { target: { checked: true } })
  pixelationCheckbox.simulate('change', { target: { checked: false } })
})
