import { createContext } from 'react'
import { narrowMobileWinHeightMax } from '../../constants/visuals'

export type vType = {
  width: number
  height: number
  narrowMobile: boolean
}

export const defaultGameSize: vType = {
  width: window.innerWidth,
  height: window.innerHeight,
  narrowMobile: window.innerHeight <= narrowMobileWinHeightMax,
}

export const GameSizeContext = createContext<vType>(defaultGameSize)
