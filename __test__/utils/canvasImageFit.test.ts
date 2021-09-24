import { contain, cover } from '../../src/utils/canvasImageFit'

it('contain default is OK', () => {
  const parentWidth = 600
  const parentHeight = 400
  const childWidth = 800
  const childHeight = 300
  const res = contain(parentWidth, parentHeight, childWidth, childHeight)
  expect(res).toEqual({ width: 600, height: 225, offsetX: 0, offsetY: 87.5 })
})

it('contain is OK', () => {
  const parentWidth = 600
  const parentHeight = 400
  const childWidth = 800
  const childHeight = 300
  const scale = 2
  const offsetX = 0.3
  const offsetY = 0.8
  const res = contain(
    parentWidth,
    parentHeight,
    childWidth,
    childHeight,
    scale,
    offsetX,
    offsetY,
  )
  expect(res).toEqual({ width: 1200, height: 450, offsetX: -180, offsetY: -40 })
})

it('contain 2 is OK', () => {
  const parentWidth = 600
  const parentHeight = 400
  const childWidth = 300
  const childHeight = 800
  const scale = 0.9
  const offsetX = 0.3
  const offsetY = 0.8
  const res = contain(
    parentWidth,
    parentHeight,
    childWidth,
    childHeight,
    scale,
    offsetX,
    offsetY,
  )
  expect(res).toEqual({ width: 135, height: 360, offsetX: 139.5, offsetY: 32 })
})

it('cover default is OK', () => {
  const parentWidth = 600
  const parentHeight = 400
  const childWidth = 800
  const childHeight = 600
  const res = cover(parentWidth, parentHeight, childWidth, childHeight)
  expect(res).toEqual({
    width: 600,
    height: 450,
    offsetX: 0,
    offsetY: -25,
  })
})

it('cover is OK', () => {
  const parentWidth = 600
  const parentHeight = 400
  const childWidth = 800
  const childHeight = 600
  const scale = 1
  const offsetX = 0.8
  const offsetY = 0.3
  const res = cover(
    parentWidth,
    parentHeight,
    childWidth,
    childHeight,
    scale,
    offsetX,
    offsetY,
  )
  expect(res).toEqual({
    width: 600,
    height: 450,
    offsetX: 0,
    offsetY: -15,
  })
})
