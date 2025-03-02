import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'
import { Unsubscribe } from 'redux'
import type { RootState, AppDispatch } from '@/store'
import { store } from '@/store'

export const useAppDispatch = () => useDispatch<AppDispatch>()
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector

type SelectorFn<T> = (state: RootState) => T
type CallbackFn<T> = (value: T) => void
export const appSubscriber = <T>(
  selectorFn: SelectorFn<T>,
  callbackFn: CallbackFn<T>,
): Unsubscribe => {
  let lastValue: T = selectorFn(store.getState())
  return store.subscribe(() => {
    const newValue = selectorFn(store.getState())
    if (newValue !== lastValue) {
      lastValue = newValue
      callbackFn(newValue)
    }
  })
}
