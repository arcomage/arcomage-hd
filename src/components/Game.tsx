import React, { useEffect, useState } from 'react'
import { defaultVisualvalues } from '@/constants/defaultSettings'
import { dataVisualvalues } from '@/data/visualvalues'
import { useAppSelector } from '@/utils/hooks/useAppDispatch'
import { entries } from '@/utils/typeHelpers'
import ButtonBar from './buttons/ButtonBar'
import GameWindowList from './GameWindowList'
import ZoneCards from './zoneCards/ZoneCards'
import ZoneStatus from './zoneStatus/ZoneStatus'

const Game = () => {
  const visualvalues = useAppSelector((state) => state.visual.visualvalues)

  const [visualCss, setVisualCss] = useState('')
  useEffect(() => {
    setVisualCss(
      entries(visualvalues)
        .filter(([key, value]) => defaultVisualvalues[key] !== value)
        .map(([key, value]) => {
          const matchedItem = dataVisualvalues.find((item) => key === item.term)
          if (matchedItem) {
            if (matchedItem.type === 'main') {
              if (matchedItem.term === 'hue') {
                return `${matchedItem.css}(${value}deg)`
              } else {
                return `${matchedItem.css}(${value})`
              }
            } else if (value === true) {
              return `url('#${matchedItem.css}')`
            }
          }
          return null
        })
        .filter((v): v is string => v !== null)
        .join(' '),
    )
  }, [visualvalues])

  return (
    <div
      className="w-screen h-screen flex flex-col bg-black overflow-x-hidden select-none outline-none"
      tabIndex={-1}
      {...(visualCss !== '' ? { style: { filter: visualCss } } : {})}
    >
      <ZoneStatus />
      <ZoneCards />
      <GameWindowList />
      <ButtonBar />
    </div>
  )
}

export default Game
