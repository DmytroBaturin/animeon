'use client'

import { useRelease } from '@/entities/anime/model'
import { ResponseAnime } from '@/shared/api/model'
import { ReactNode, useEffect } from 'react'

export const ReleaseInitializer = ({
  data,
  children,
}: {
  children: ReactNode
  data: ResponseAnime
}) => {
  const { api } = useRelease()
  useEffect(() => {
    api.setRelease(data)
  }, [data])

  return children
}
