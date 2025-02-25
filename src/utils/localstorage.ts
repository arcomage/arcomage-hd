import { produce } from 'immer'
import lt from 'semver/functions/lt'
import {
  appVersion,
  localstorageMinVer,
  localstorageName,
  localstorageVersionName,
} from '@/constants/devSettings'
import {
  LangStateType,
  SettingsStateType,
  SoundStateType,
  VisualStateType,
  AiStateType,
} from '@/types/state'

type LocalstorageType = {
  lang?: LangStateType
  settings?: SettingsStateType
  sound?: SoundStateType
  visual?: VisualStateType
  ai?: AiStateType
}

export const lsVersion = (): void => {
  const ver = window.localStorage.getItem(localstorageVersionName)
  if (ver === null || lt(ver, localstorageMinVer)) {
    window.localStorage.removeItem(localstorageName)
  }
  if (ver !== appVersion) {
    window.localStorage.setItem(localstorageVersionName, appVersion)
  }
}

export const lsGet = <T>(
  name: keyof LocalstorageType | [keyof LocalstorageType, ...string[]],
): T | null => {
  const v = window.localStorage.getItem(localstorageName)
  if (v === null) {
    return null
  }
  const lsStore: LocalstorageType = JSON.parse(v)

  if (typeof name === 'string') {
    return lsStore[name] as T
  } else {
    return name.reduce<unknown>(
      (acc, n) => (acc as Record<string, unknown>)?.[n] ?? null,
      lsStore,
    ) as T | null
  }
}

export const lsSet = (fn: (draft: LocalstorageType) => void): void => {
  const v = window.localStorage.getItem(localstorageName)
  const lsStore: LocalstorageType = v === null ? {} : JSON.parse(v)
  const retStore = produce(lsStore, fn)
  window.localStorage.setItem(localstorageName, JSON.stringify(retStore))
}
