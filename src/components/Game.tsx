import React, { memo, useEffect, useState } from 'react'
import { useAppSelector } from '../utils/useAppDispatch'
import TableCommon from './TableCommon'
import TableP from './TableP'
import ButtonBar from './buttons/ButtonBar'

import EndScreen from './screens/EndScreen'
import Pref from './screens/Pref'
import LangPref from './screens/LangPref'
import SgPref from './screens/SgPref'
import Help from './screens/Help'
import LandscapeNotice from './screens/LandscapeNotice'
import { isEndScreenNoCloseState } from '../types/state'
import DisconnectNotice from './screens/DisconnectNotice'
import { defaultVisualvalues } from '../constants/defaultSettings'
import { entries } from '../utils/typeHelpers'
import { dataVisualvalues } from '../data/visualvalues'

const Game = () => {
  const pref = useAppSelector((state) => state.screen.pref)
  const langPref = useAppSelector((state) => state.screen.langPref)
  const sgPref = useAppSelector((state) => state.screen.sgPref)
  const end = useAppSelector((state) => state.screen.end)
  const help = useAppSelector((state) => state.screen.help)
  const landscape = useAppSelector((state) => state.screen.landscape)
  const disconnectNotice = useAppSelector(
    (state) => state.screen.disconnectNotice,
  )
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
      <TableCommon />
      <TableP />
      {isEndScreenNoCloseState(end) && <EndScreen {...end} />}
      {pref && <Pref />}
      {langPref && <LangPref />}
      {sgPref && <SgPref />}
      {help && <Help />}
      {landscape && <LandscapeNotice />}
      {disconnectNotice && <DisconnectNotice />}
      <ButtonBar />
    </div>
  )
}

export default memo(Game)
