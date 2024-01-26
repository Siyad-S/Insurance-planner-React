import { configureStore } from '@reduxjs/toolkit'
import insuranceSlice from './Slices/slice'

export const store = configureStore({
  reducer: {
    insurance: insuranceSlice
  },
})