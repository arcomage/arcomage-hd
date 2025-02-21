import { createContext } from 'react'
import { vType } from '../hooks/useWindowResize'

export const GameSizeContext = createContext<vType>({
  width: window.innerWidth,
  height: window.innerHeight,
  narrowMobile: false,
})
