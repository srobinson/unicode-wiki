import * as React from "react"

export interface ButtonProps {
  active?: boolean
  children?: React.ReactNode
  onClick?: () => void
  type?: string
}
