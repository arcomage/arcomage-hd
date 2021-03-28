import React, { useState, useLayoutEffect, createContext } from 'react'

export const minWidth = 300
export const minHeight = 300

// in px
export type vType = {
  width: number
  height: number
  top: number[]
  left: number[]
}

const defaultCardPos = {
  width: 0,
  height: 0,
  top: [],
  left: [],
}

export const CardPosContext = createContext<vType>(defaultCardPos)

export const CardPosProvider = ({
  children,
}: {
  children: React.ReactNode
}) => {
  const [cardPos, setCardPos] = useState<vType>(defaultCardPos)

  const winWidth = window.innerWidth > minWidth ? window.innerWidth : minWidth
  const winHeight =
    window.innerHeight > minHeight ? window.innerHeight : minHeight

  useLayoutEffect(() => {
    const handleResize = () => {
      const cardPos = {
        width: 0,
        height: 0,
        top: [],
        left: [],
      }
      setCardPos(cardPos)
    }

    window.addEventListener('resize', handleResize)
    handleResize()
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  return (
    <CardPosContext.Provider value={cardPos}>
      {children}
    </CardPosContext.Provider>
  )
}
