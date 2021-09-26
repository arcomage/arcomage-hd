import '../../__mocks__/matchMediaMock'
import React from 'react'
import { mount } from 'enzyme'
import Pixelation from '../../src/components/effects/Pixelation'

jest.useFakeTimers()

it('Pixelation is good', () => {
  const wrapper = mount(<Pixelation src="bg.webp" level={4} />)
  jest.runAllTimers()
  wrapper.unmount()
})

it('Pixelation with fit contain is good', () => {
  const wrapper = mount(<Pixelation src="bg.webp" level={4} fit="contain" />)
  jest.runAllTimers()
  wrapper.unmount()
})

it('Pixelation with fit cover is good', () => {
  const wrapper = mount(<Pixelation src="bg.webp" level={4} fit="cover" />)
  jest.runAllTimers()
  wrapper.unmount()
})

it('Pixelation with width and height is good', () => {
  const wrapper = mount(
    <Pixelation src="bg.webp" level={4} width="200%" height="300%" />,
  )
  jest.runAllTimers()
  wrapper.unmount()
})

it('Pixelation with cleanup is good', () => {
  const wrapper = mount(<Pixelation src="bg.webp" level={4} cleanup />)
  jest.runAllTimers()
  wrapper.unmount()
})
