'use client'

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from '@/shared/components/ui/avatar'
import { useUser } from '@/entities/user/model'

export const UserAvatar = () => {
  const { user } = useUser()

  return (
    <Avatar>
      {user && <AvatarImage src={user.avatar} />}
      <AvatarFallback>CN</AvatarFallback>
    </Avatar>
  )
}
