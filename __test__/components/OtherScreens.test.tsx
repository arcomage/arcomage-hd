import React from 'react'
import { mount } from 'enzyme'
import { I18nProvider } from '../../src/i18n/I18nContext'
import { Provider } from 'react-redux'
import { store } from '../../src/store'
import DisconnectNotice from '../../src/components/screens/DisconnectNotice'
import Help from '../../src/components/screens/Help'
import LandscapeNotice from '../../src/components/screens/LandscapeNotice'
import VolumePref from '../../src/components/screens/VolumePref'

it('renders DisconnectNotice', () => {
  const screen = mount(
    <Provider store={store}>
      <I18nProvider>
        <DisconnectNotice />
      </I18nProvider>
    </Provider>,
  )
  expect(screen.length).toBe(1)
})

it('renders Help', () => {
  const screen = mount(
    <Provider store={store}>
      <I18nProvider>
        <Help />
      </I18nProvider>
    </Provider>,
  )
  expect(screen.length).toBe(1)
})

it('renders LandscapeNotice', () => {
  const screen = mount(
    <Provider store={store}>
      <I18nProvider>
        <LandscapeNotice />
      </I18nProvider>
    </Provider>,
  )
  expect(screen.length).toBe(1)
})

it('renders VolumePref', () => {
  const screen = mount(
    <Provider store={store}>
      <I18nProvider>
        <VolumePref />
      </I18nProvider>
    </Provider>,
  )
  expect(screen.length).toBe(1)
})
