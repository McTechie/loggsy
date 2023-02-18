import { createSlice } from '@reduxjs/toolkit'

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
  },
})

export const { toggleDarkMode } = darkModeSlice.actions

export default darkModeSlice.reducer
