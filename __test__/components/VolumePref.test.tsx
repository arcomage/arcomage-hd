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

// it('click sgprefbutton', () => {
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
//   const langButton = wrapper.find('.topbutton').at(2)
//   expect(langButton.length).toBe(1)
//   langButton.simulate('click')
//   const resetButton = wrapper.find('.buttonwrapper button')
//   expect(resetButton.length).toBe(1)
//   resetButton.simulate('click')
//   const volumeRange = wrapper.find('.windowmain input[type="range"]').at(0)
//   expect(volumeRange.length).toBe(1)
//   volumeRange.simulate('change', { target: { value: '10' } })
//   volumeRange.simulate('change', { target: { value: '6' } })
//   volumeRange.simulate('change', { target: { value: '0' } })
//   const pixelationRange = wrapper
//     .find('.windowmain input[type="range"]')
//     .at(1)
//   expect(pixelationRange.length).toBe(1)
//   pixelationRange.simulate('change', { target: { value: '10' } })
//   pixelationRange.simulate('change', { target: { value: '6' } })
//   pixelationRange.simulate('change', { target: { value: '0' } })
//   const volumeCheckbox = wrapper
//     .find('.windowmain input[type="checkbox"]')
//     .at(0)
//   expect(volumeCheckbox.length).toBe(1)
//   volumeCheckbox.simulate('change', { target: { checked: true } })
//   volumeCheckbox.simulate('change', { target: { checked: false } })
//   const pixelationCheckbox = wrapper
//     .find('.windowmain input[type="checkbox"]')
//     .at(1)
//   expect(pixelationCheckbox.length).toBe(1)
//   pixelationCheckbox.simulate('change', { target: { checked: true } })
//   pixelationCheckbox.simulate('change', { target: { checked: false } })
// })
