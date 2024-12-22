import { createSlice } from "@reduxjs/toolkit"

import { RootState } from "../store"

import type { PayloadAction } from "@reduxjs/toolkit"
interface LoadingState {
  isLoading: boolean
}

const initialState: LoadingState = {
  isLoading: false,
}

export const loadingSlice = createSlice({
  name: "loading",
  initialState,
  reducers: {
    setIsLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload
    },
  },
})

export const { setIsLoading } = loadingSlice.actions

export const selectIsLoading = (state: RootState) => state.loading.isLoading

export const loadingReducer = loadingSlice.reducer
