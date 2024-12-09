'use client'

import { ReactNode, useEffect } from 'react'
import { useSession } from '@/entities/session/model/model'
import { useUser } from '@/entities/user/model'
import { userRead } from '@/shared/api/user/user'
import { useRouter } from 'next/navigation'

export const SessionInitializer = ({
  children,
  token,
  isAuthenticated,
}: {
  token?: string
  children: ReactNode
  isAuthenticated: boolean
}) => {
  const router = useRouter()
  const { setSession } = useSession()
  const { api } = useUser()

  useEffect(() => {
    setSession(isAuthenticated, token || '')
    userRead({
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }).then((user) => {
      api.setUser(user.data)
    })
  }, [isAuthenticated, token])
  return children
}
