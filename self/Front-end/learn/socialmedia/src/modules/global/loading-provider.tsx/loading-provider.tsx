"use client"

import { useSelector } from "react-redux"

import { selectIsLoading } from "@/store/reducers/loading-reducer"

import styles from "./loading-provider.module.css"

interface LoadingProviderProps {
  children: React.ReactNode
}

export const LoadingProvider = ({ children }: LoadingProviderProps) => {
  const isLoading = useSelector(selectIsLoading)
  return (
    <>
      {children}
      {isLoading && <div className={styles.container} />}
    </>
  )
}
