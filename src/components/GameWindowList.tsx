import React, { lazy, Suspense } from 'react'
import { isEndScreenNoCloseState } from '@/types/state'
import { useAppSelector } from '@/utils/hooks/useAppDispatch'

const EndScreen = lazy(() => import('./screens/EndScreen'))
const Pref = lazy(() => import('./screens/Pref'))
const LangPref = lazy(() => import('./screens/LangPref'))
const SgPref = lazy(() => import('./screens/SgPref'))
const Help = lazy(() => import('./screens/Help'))
const LandscapeNotice = lazy(() => import('./screens/LandscapeNotice'))
const DisconnectNotice = lazy(() => import('./screens/DisconnectNotice'))

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
      {isEndScreenNoCloseState(end) && (
        <Suspense>
          <EndScreen {...end} />
        </Suspense>
      )}
      {pref && (
        <Suspense>
          <Pref />
        </Suspense>
      )}
      {langPref && (
        <Suspense>
          <LangPref />
        </Suspense>
      )}
      {sgPref && (
        <Suspense>
          <SgPref />
        </Suspense>
      )}
      {help && (
        <Suspense>
          <Help />
        </Suspense>
      )}
      {landscape && (
        <Suspense>
          <LandscapeNotice />
        </Suspense>
      )}
      {disconnectNotice && (
        <Suspense>
          <DisconnectNotice />
        </Suspense>
      )}
    </>
  )
}

export default GameWindowList
