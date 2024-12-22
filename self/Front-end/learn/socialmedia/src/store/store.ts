import { configureStore } from "@reduxjs/toolkit"
import { authReducer } from "./reducers/auth-reducer"
import { loadingReducer } from "./reducers/loading-reducer"

export const makeStore = () => {
  return configureStore({
    reducer: {
      auth: authReducer,
      loading: loadingReducer,
    },
  })
}

export type AppStore = ReturnType<typeof makeStore>
export type RootState = ReturnType<AppStore["getState"]>
export type AppDispatch = AppStore["dispatch"]
