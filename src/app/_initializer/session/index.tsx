'use client'

import { useSession } from '@/entities/user/model'
import { ReactNode, useEffect } from 'react'

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
