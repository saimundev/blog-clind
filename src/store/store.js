import { configureStore } from '@reduxjs/toolkit'
import authSlice from './feachers/authSlice'
import { blogApi } from './services/blog'

const store = configureStore({
  reducer: {
    [blogApi.reducerPath]: blogApi.reducer,
    auth:authSlice
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(blogApi.middleware)
})

export default store