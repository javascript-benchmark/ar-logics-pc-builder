import { configureStore } from '@reduxjs/toolkit'
import pcBuilderreducer from "./features/pc-builder/pcBuilderSlice"

export const store = configureStore({
  reducer: {
    pcBuilder: pcBuilderreducer
  },
})