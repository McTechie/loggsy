import { configureStore } from '@reduxjs/toolkit'

// slices of global state
import darkModeReducer from './slices/darkModeSlice'

export const store = configureStore({
  reducer: {
    darkMode: darkModeReducer,
  },
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch
