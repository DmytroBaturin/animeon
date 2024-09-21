'use client'

import { ReactNode, useState } from 'react'
import { UserAvatar } from '@/entities/user'

interface CommentProps {
  replies?: ReactNode
  content: string
  userName: string
  replyForm?: ReactNode
  date: string
  commentTo?: string
  isReply?: boolean
  reactions?: ReactNode
}

export const Comment = ({
  reactions,
  date,
  replyForm,
  commentTo,
  isReply,

  userName,
  replies,
  content,
}: CommentProps) => {
  const [isReplying, setIsReplying] = useState(false)
  return (
    <div className="flex w-full gap-3">
      <UserAvatar />
      <div className="flex gap-5 w-full items-center flex-col">
        <div className="flex gap-2 w-full flex-col">
          <div className="flex w-full flex-col">
            <div className="flex w-full items-center gap-3">
              <h2 className="text-lg font-bold">{userName}</h2>
              <div className="flex opacity-40 items-center gap-3">
                <div className="h-[3px] w-[3px] bg-white rounded-full" />
                <p className="font-light">{date}</p>
              </div>
            </div>
            <p className="break-all">
              {commentTo && (
                <span className="text-yellow-400">@{commentTo} </span>
              )}

              {content}
            </p>
            <div className="flex gap-3">
              <p
                className="font-light opacity-40"
                onClick={() => setIsReplying(!isReplying)}
              >
                Відповісти
              </p>
              {reactions}
            </div>
          </div>
          <div className="">{isReplying && replyForm}</div>
          {!isReply && (
            <p className="text-xs text-blue-400 underline">
              Показати всі відповіді
            </p>
          )}
        </div>

        <div className="flex items-start w-full flex-col justify-startmr-32">
          {replies}
        </div>
      </div>
    </div>
  )
}
