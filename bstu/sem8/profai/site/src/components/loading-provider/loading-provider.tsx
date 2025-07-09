import { ReactNode } from "react"

import { setIsLoading } from "@/store/features/loading/loadingSlice"
import { useAppDispatch, useAppSelector } from "@/store/hooks"
import { Backdrop, CircularProgress } from "@mui/material"

import styles from "./loading-provider.module.css"

interface LoadingProviderProps {
  children: ReactNode
}

export const LoadingProvider = ({ children }: LoadingProviderProps) => {
  const { isLoading } = useAppSelector((s) => s.loading)
  return (
    <div className={styles.container}>
      {children}
      <Backdrop sx={(theme) => ({ color: "#fff", zIndex: theme.zIndex.drawer + 1 })} open={isLoading}>
        <CircularProgress color='inherit' />
      </Backdrop>
    </div>
  )
}

export const useBackdropLoading = () => {
  const dispatch = useAppDispatch()
  const { isLoading } = useAppSelector((s) => s.loading)
  const startLoading = () => {
    dispatch(setIsLoading(true))
  }
  const endLoading = () => {
    dispatch(setIsLoading(false))
  }
  return {
    startLoading,
    endLoading,
    isLoading,
  }
}
