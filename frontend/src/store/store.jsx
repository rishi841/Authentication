import { configureStore } from '@reduxjs/toolkit'
import authreducer from "../features/AuthSlice"

 const store = configureStore({
  reducer: {
    auth:authreducer,
  },
})

export default store;