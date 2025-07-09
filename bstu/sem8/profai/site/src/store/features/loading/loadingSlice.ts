"use client"

import { createSlice, PayloadAction } from "@reduxjs/toolkit"

import type { RootState } from "@/store/store"

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

export default loadingSlice.reducer
