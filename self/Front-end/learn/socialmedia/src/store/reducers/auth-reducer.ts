import { createSlice } from "@reduxjs/toolkit"
import { RootState } from "../store"
import type { PayloadAction } from "@reduxjs/toolkit"

export type User = {
  id: string
  email: string
  isActivated: boolean
}

interface AuthState {
  accessToken: string | null
  refreshToken: string | null
  user: User | null
}

const initialState: AuthState = {
  accessToken: null,
  refreshToken: null,
  user: null,
}

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setAuthState: (state, action: PayloadAction<AuthState>) => {
      state.accessToken = action.payload.accessToken
      state.refreshToken = action.payload.refreshToken
      state.user = action.payload.user
    },
    setUser: (state, action: PayloadAction<User | null>) => {
      state.user = action.payload
    },
    setTokens: (
      state,
      action: PayloadAction<{
        accessToken: string | null
        refreshToken: string | null
      }>,
    ) => {
      state.accessToken = action.payload.accessToken
      state.refreshToken = action.payload.refreshToken
    },
    clearAuthState: (state) => {
      state.accessToken = null
      state.refreshToken = null
      state.user = null
    },
  },
})

export const { setUser, setAuthState, setTokens, clearAuthState } = authSlice.actions

export const selectAuth = (state: RootState) => state.auth
export const selectAccessToken = (state: RootState) => state.auth.accessToken
export const selectRefreshToken = (state: RootState) => state.auth.refreshToken

export const authReducer = authSlice.reducer
