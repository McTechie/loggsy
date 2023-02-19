import { createSlice, PayloadAction } from '@reduxjs/toolkit'

// Define a type for the slice state
interface DarkModeState {
  dark: boolean
}

// Define the initial state using that type
const initialState: DarkModeState = {
  dark: false,
}

export const darkModeSlice = createSlice({
  name: 'darkMode',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    toggleDarkMode: (state) => {
      state.dark = !state.dark
    },
    setMode: (state, action: PayloadAction<boolean>) => {
      state.dark = action.payload
    }
  },
})

export const { toggleDarkMode, setMode } = darkModeSlice.actions

export default darkModeSlice.reducer
