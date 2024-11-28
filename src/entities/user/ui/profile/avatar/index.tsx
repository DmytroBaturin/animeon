'use client'

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from '@/shared/components/ui/avatar'
import { useUser } from '@/entities/user/model'
import { memo } from 'react'

export const UserAvatar = memo(() => {
  const { user } = useUser()
  return (
    <Avatar>
      {user && <AvatarImage src={`${process.env.API_HOST}/${user.avatar}`} />}
      <AvatarFallback>CN</AvatarFallback>
    </Avatar>
  )
})
