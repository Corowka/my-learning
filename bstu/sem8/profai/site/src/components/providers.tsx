"use client"

import { SessionProvider } from "next-auth/react"
import React, { ReactNode } from "react"

import { AntdRegistry } from "@ant-design/nextjs-registry"
import { LocalizationProvider } from "@mui/x-date-pickers"
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs"

import { LoadingProvider } from "./loading-provider/loading-provider"
import { StoreProvider } from "./store-provider/store-provider"

interface Props {
  children: ReactNode
}

export const Providers = (props: Props) => {
  return (
    <AntdRegistry>
      <SessionProvider>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <StoreProvider>
            <LoadingProvider>{props.children}</LoadingProvider>
          </StoreProvider>
        </LocalizationProvider>
      </SessionProvider>
    </AntdRegistry>
  )
}
