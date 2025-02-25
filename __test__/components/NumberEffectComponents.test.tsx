// import { it, expect } from 'bun:test'
// import './matchMediaMock'
// import React from 'react'
// import { mount } from 'enzyme'
// import NumberDiff from '@/components/effects/NumberDiff'
// import AnimatedNumber from '@/components/effects/AnimatedNumber'
// import NumberChangeVisual from '@/components/effects/NumberChangeVisual'
// import { act } from 'react-dom/test-utils'
// import { Provider } from 'react-redux'
// import { store } from '@/store'

// jest.useFakeTimers()

// it('AnimatedNumber render correctly', () => {
//   const wrapper = mount(
//     <Provider store={store}>
//       <AnimatedNumber n={3} />
//     </Provider>,
//   )
//   act(() => {
//     wrapper.setProps({ n: 14 })
//     jest.runAllTimers()
//     wrapper.setProps({ n: 7 })
//     jest.runAllTimers()
//     wrapper.setProps({ n: -4 })
//     jest.runAllTimers()
//     wrapper.setProps({ n: 0 })
//     jest.runAllTimers()
//     expect(wrapper.length).toBe(1)
//   })
// })

// it('NumberDiff render correctly', () => {
//   const wrapper = mount(<NumberDiff n={3} />)
//   wrapper.setProps({ n: 14 })
//   wrapper.setProps({ n: 7 })
//   wrapper.setProps({ n: -4 })
//   wrapper.setProps({ n: 0 })
//   expect(wrapper.length).toBe(1)
// })

// it('NumberChangeVisual render correctly', () => {
//   const wrapper = mount(<NumberChangeVisual n={3} />)
//   wrapper.setProps({ n: 14 })
//   wrapper.setProps({ n: 7 })
//   wrapper.setProps({ n: -4 })
//   wrapper.setProps({ n: 0 })
//   expect(wrapper.length).toBe(1)
// })
