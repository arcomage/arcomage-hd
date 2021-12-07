import produce from 'immer'
import {
  localstorageMinVer,
  localstorageName,
  localstorageVersionName,
} from '../constants/devSettings'
import {
  LangStateType,
  SettingsStateType,
  SoundStateType,
  VisualStateType,
  AiStateType,
} from '../types/state'
import lt from 'semver/functions/lt'

type LocalstorageType = {
  lang?: LangStateType
  settings?: SettingsStateType
  sound?: SoundStateType
  visual?: VisualStateType
  ai?: AiStateType
}

const currentVersion: string = process.env.APPVERSION ?? ''

export const lsVersion = (): void => {
  const ver = window.localStorage.getItem(localstorageVersionName)
  if (ver === null || lt(ver, localstorageMinVer)) {
    window.localStorage.removeItem(localstorageName)
  }
  if (ver !== currentVersion) {
    window.localStorage.setItem(localstorageVersionName, currentVersion)
  }
}

export const lsGet = (
  name: keyof LocalstorageType | [keyof LocalstorageType, ...string[]],
): any => {
  const v = window.localStorage.getItem(localstorageName)
  if (v === null) {
    return null
  }
  const lsStore: LocalstorageType = JSON.parse(v)
  if (typeof name === 'string') {
    return lsStore[name]
  } else {
    return name.reduce<any>((acc, n) => acc?.[n] ?? null, lsStore)
  }
}

export const lsSet = (fn: (draft: LocalstorageType) => void): void => {
  const v = window.localStorage.getItem(localstorageName)
  const lsStore: LocalstorageType = v === null ? {} : JSON.parse(v)
  const retStore = produce(lsStore, fn)
  window.localStorage.setItem(localstorageName, JSON.stringify(retStore))
}
