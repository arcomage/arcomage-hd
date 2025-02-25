import React from 'react'
import { isEndScreenNoCloseState } from '@/types/state'
import { useAppSelector } from '@/utils/hooks/useAppDispatch'
import DisconnectNotice from './screens/DisconnectNotice'
import EndScreen from './screens/EndScreen'
import Help from './screens/Help'
import LandscapeNotice from './screens/LandscapeNotice'
import LangPref from './screens/LangPref'
import Pref from './screens/Pref'
import SgPref from './screens/SgPref'

const GameWindowList = () => {
  const pref = useAppSelector((state) => state.screen.pref)
  const langPref = useAppSelector((state) => state.screen.langPref)
  const sgPref = useAppSelector((state) => state.screen.sgPref)
  const end = useAppSelector((state) => state.screen.end)
  const help = useAppSelector((state) => state.screen.help)
  const landscape = useAppSelector((state) => state.screen.landscape)
  const disconnectNotice = useAppSelector(
    (state) => state.screen.disconnectNotice,
  )

  return (
    <>
      {isEndScreenNoCloseState(end) && <EndScreen {...end} />}
      {pref && <Pref />}
      {langPref && <LangPref />}
      {sgPref && <SgPref />}
      {help && <Help />}
      {landscape && <LandscapeNotice />}
      {disconnectNotice && <DisconnectNotice />}
    </>
  )
}

export default GameWindowList
