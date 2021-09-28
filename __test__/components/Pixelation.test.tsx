import React from 'react'
import { mount } from 'enzyme'
import Pixelation from '../../src/components/effects/Pixelation'

jest.useFakeTimers()

it('Pixelation is good', () => {
  const wrapper = mount(<Pixelation src="bg.webp" level={4} />)
  jest.runAllTimers()
  expect(wrapper.length).toBe(1)
  wrapper.unmount()
  expect(wrapper.length).toBe(0)
})

it('Pixelation with fit contain is good', () => {
  const wrapper = mount(<Pixelation src="bg.webp" level={4} fit="contain" />)
  jest.runAllTimers()
  expect(wrapper.length).toBe(1)
  wrapper.unmount()
  expect(wrapper.length).toBe(0)
})

it('Pixelation with fit cover is good', () => {
  const wrapper = mount(<Pixelation src="bg.webp" level={4} fit="cover" />)
  jest.runAllTimers()
  expect(wrapper.length).toBe(1)
  wrapper.unmount()
  expect(wrapper.length).toBe(0)
})

it('Pixelation with width and height is good', () => {
  const wrapper = mount(
    <Pixelation src="bg.webp" level={4} width="200%" height="300%" />,
  )
  jest.runAllTimers()
  expect(wrapper.length).toBe(1)
  wrapper.unmount()
  expect(wrapper.length).toBe(0)
})

it('Pixelation with cleanup is good', () => {
  const wrapper = mount(<Pixelation src="bg.webp" level={4} cleanup />)
  jest.runAllTimers()
  expect(wrapper.length).toBe(1)
  wrapper.unmount()
  expect(wrapper.length).toBe(0)
})
