import { configureStore } from '@reduxjs/toolkit'
import { createEpicMiddleware } from 'redux-observable'
import { isProd } from '@/constants/devSettings'
import { RootActionType } from '@/types/actionObj'
import { RootStateType } from '@/types/state'
import rootReducer from './reducers'

export const epicMiddleware = createEpicMiddleware<
  RootActionType,
  RootActionType,
  RootStateType
>()

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(epicMiddleware),
  devTools: !isProd,
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
