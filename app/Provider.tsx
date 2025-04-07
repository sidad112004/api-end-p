"use client"

import { SessionProvider } from "next-auth/react"
import { Toaster } from "sonner"

export default function provider({ children }) {
  return (
    <SessionProvider>
      <Toaster richColors />
      {children}
    </SessionProvider>
  )
}
