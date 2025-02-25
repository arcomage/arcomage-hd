// import { it, expect } from 'bun:test'
// import './matchMediaMock'
// import React from 'react'
// import { mount } from 'enzyme'
// import App from '@/App'
// import I18nProvider from '@/i18n/I18nProvider'
// import { Provider } from 'react-redux'
// import { HelmetProvider } from 'react-helmet-async'
// import GameSizeProvider from '@/utils/contexts/GameSizeProvider'
// import { store } from '@/store'

// it('click langprefbutton', () => {
//   const wrapper = mount(
//     <Provider store={store}>
//       <I18nProvider>
//         <GameSizeProvider>
//           <HelmetProvider>
//             <App />
//           </HelmetProvider>
//         </GameSizeProvider>
//       </I18nProvider>
//     </Provider>,
//   )
//   const langButton = wrapper.find('.topbutton').at(1)
//   expect(langButton.length).toBe(1)
//   langButton.simulate('click')
//   const frButton = wrapper.find("button[lang='fr']")
//   expect(frButton.length).toBe(1)
//   frButton.simulate('click')
//   const langprefCheckboxes = wrapper.find(
//     '.window-wrapper input[type="checkbox"]',
//   )
//   expect(langprefCheckboxes.length).toBe(2)
//   langprefCheckboxes.at(0).simulate('change', { target: { checked: true } })
//   langprefCheckboxes.at(1).simulate('change', { target: { checked: true } })
//   const cancelButton = wrapper.find('button.cancel')
//   expect(cancelButton.length).toBe(1)
//   cancelButton.simulate('click')
// })
