'use client'

import { SessionProvider } from "next-auth/react"

type Props = {
  children?: React.ReactNode
}

export const SessionProv = ({ children }: Props) => {
  return (
    <SessionProvider>
      {children}
    </SessionProvider>
  )
}