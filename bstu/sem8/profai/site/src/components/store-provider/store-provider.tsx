"use client"
import { ReactNode, useRef } from "react"
import { Provider } from "react-redux"

import { AppStore, makeStore } from "@/store/store"

interface StoreProviderProps {
  children: ReactNode
}

export const StoreProvider = ({ children }: StoreProviderProps) => {
  const storeRef = useRef<AppStore | null>(null)
  if (!storeRef.current) {
    storeRef.current = makeStore()
  }

  return <Provider store={storeRef.current}>{children}</Provider>
}
