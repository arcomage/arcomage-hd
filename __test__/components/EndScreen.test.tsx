// import { it, expect } from 'bun:test'
// import React from 'react'
// import { mount } from 'enzyme'
// import I18nProvider from '@/i18n/I18nProvider'
// import { Provider } from 'react-redux'
// import { store } from '@/store'
// import EndScreen from '@/components/screens/EndScreen'

// it('renders EndScreen (win)', () => {
//   const screen = mount(
//     <Provider store={store}>
//       <I18nProvider>
//         <EndScreen type="win" />
//       </I18nProvider>
//     </Provider>,
//   )
//   expect(screen.length).toBe(1)
//   screen.simulate('click')
// })

// it('renders EndScreen (lose)', () => {
//   const screen = mount(
//     <Provider store={store}>
//       <I18nProvider>
//         <EndScreen type="lose" />
//       </I18nProvider>
//     </Provider>,
//   )
//   expect(screen.length).toBe(1)
//   screen.simulate('click')
// })

// it('renders EndScreen (tie)', () => {
//   const screen = mount(
//     <Provider store={store}>
//       <I18nProvider>
//         <EndScreen type="tie" />
//       </I18nProvider>
//     </Provider>,
//   )
//   expect(screen.length).toBe(1)
//   screen.simulate('click')
// })

// it('renders EndScreen (win surrender)', () => {
//   const screen = mount(
//     <Provider store={store}>
//       <I18nProvider>
//         <EndScreen type="win" surrender />
//       </I18nProvider>
//     </Provider>,
//   )
//   expect(screen.length).toBe(1)
//   screen.simulate('click')
// })

// it('renders EndScreen (lose surrender)', () => {
//   const screen = mount(
//     <Provider store={store}>
//       <I18nProvider>
//         <EndScreen type="lose" surrender />
//       </I18nProvider>
//     </Provider>,
//   )
//   expect(screen.length).toBe(1)
//   screen.simulate('click')
// })
