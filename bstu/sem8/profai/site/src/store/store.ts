import { configureStore } from "@reduxjs/toolkit"

import loadingReducer from "./features/loading/loadingSlice"

export const makeStore = () => {
  return configureStore({
    reducer: {
      loading: loadingReducer,
    },
  })
}

export type AppStore = ReturnType<typeof makeStore>
export type RootState = ReturnType<AppStore["getState"]>
export type AppDispatch = AppStore["dispatch"]
