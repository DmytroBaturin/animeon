'use client'

import { ReactNode, useEffect } from 'react'
import { useSession } from '@/entities/session/model/model'

export const SessionInitializer = ({
  children,
  token,
  isAuthenticated,
}: {
  token?: string
  children: ReactNode
  isAuthenticated: boolean
}) => {
  const { setSession } = useSession()

  useEffect(() => {
    setSession(isAuthenticated, token || '')
  }, [isAuthenticated, token])
  return children
}
