import '../../__mocks__/matchMediaMock'
import React from 'react'
import { mount } from 'enzyme'
import NumberDiff from '../../src/components/effects/NumberDiff'
import AnimatedNumber from '../../src/components/effects/AnimatedNumber'
import NumberChangeVisual from '../../src/components/effects/NumberChangeVisual'
import { act } from 'react-dom/test-utils'

jest.useFakeTimers()

it('AnimatedNumber render correctly', () => {
  const wrapper = mount(<AnimatedNumber n={3} />)
  act(() => {
    wrapper.setProps({ n: 14 })
    jest.runAllTimers()
    wrapper.setProps({ n: 7 })
    jest.runAllTimers()
    wrapper.setProps({ n: -4 })
    jest.runAllTimers()
    wrapper.setProps({ n: 0 })
    jest.runAllTimers()
  })
})

it('NumberDiff render correctly', () => {
  const wrapper = mount(<NumberDiff n={3} />)
  wrapper.setProps({ n: 14 })
  wrapper.setProps({ n: 7 })
  wrapper.setProps({ n: -4 })
  wrapper.setProps({ n: 0 })
})

it('NumberChangeVisual render correctly', () => {
  const wrapper = mount(<NumberChangeVisual n={3} />)
  wrapper.setProps({ n: 14 })
  wrapper.setProps({ n: 7 })
  wrapper.setProps({ n: -4 })
  wrapper.setProps({ n: 0 })
})
