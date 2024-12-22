import { AntdIconProps } from "@ant-design/icons/lib/components/AntdIcon"
import { ForwardRefExoticComponent, RefAttributes } from "react"

export type AntdIconType = ForwardRefExoticComponent<
  Omit<AntdIconProps, "ref"> & RefAttributes<HTMLSpanElement>
>