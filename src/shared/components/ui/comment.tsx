'use client'

import { memo, ReactNode } from 'react'
import moment from 'moment'
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from '@/shared/components/ui/avatar'
import { useAuthStore } from '@/entities/session/model'

interface CommentProps {
  replies?: ReactNode
  content: string
  userName: string
  avatar?: string
  replyForm?: ReactNode
  date: string
  commentTo?: string
  isAuth?: boolean
  hasReplies?: boolean
  toggleReplyForm?: () => void
  reactions?: ReactNode
  seeMore?: boolean
  openReplies?: () => void
  handleMoreReplies?: () => void
}

export const CommentComponent = ({
  reactions,
  hasReplies,
  date,
  seeMore = false,
  replyForm,
  avatar = '',
  isAuth = false,
  handleMoreReplies,
  toggleReplyForm,
  commentTo,
  userName,
  replies,
  content,
  openReplies,
}: CommentProps) => {
  const { openDialog } = useAuthStore()
  const formatTelegramTime = (date: Date | string): string => {
    const now = moment()
    const messageDate = moment(date)

    if (now.isSame(messageDate, 'day')) {
      return messageDate.format('HH:mm')
    }

    if (now.isSame(messageDate, 'year')) {
      return messageDate.format('DD.MM')
    }

    return messageDate.format('DD.MM.YYYY')
  }
  return (
    <div className="flex w-full gap-3">
      <Avatar>
        <AvatarImage src={avatar} />
        <AvatarFallback>CN</AvatarFallback>
      </Avatar>
      <div className="flex gap-5 w-full items-center flex-col">
        <div className="flex gap-2 w-full flex-col">
          <div className="flex w-full flex-col">
            <div className="flex w-full items-center gap-3">
              <h2 className="text-lg font-bold">{userName}</h2>
              <div className="flex opacity-40 items-center gap-3">
                <div className="h-[3px] w-[3px] bg-white rounded-full" />
                <p className="font-light">{formatTelegramTime(date)}</p>
              </div>
            </div>
            <p className="break-all">
              {commentTo && (
                <span className="text-yellow-400">@{commentTo} </span>
              )}

              {content}
            </p>
            <div className="flex gap-3">
              <button
                type="button"
                className="font-light opacity-40"
                onClick={() => {
                  isAuth ? toggleReplyForm() : openDialog()
                }}
              >
                Відповісти
              </button>
              {reactions}
            </div>
          </div>
          <div className="">{replyForm}</div>
          {(hasReplies || replies) && (
            <p
              onClick={() => openReplies()}
              className="text-xs text-blue-400 underline"
            >
              Показати всі відповіді
            </p>
          )}
        </div>

        <div className="flex items-start  w-full flex-col justify-startmr-32">
          {replies}
          {seeMore && replies && (
            <p
              className="hover:underline opacity-60 text-xs mb-5"
              onClick={() => handleMoreReplies()}
            >
              Показати більше
            </p>
          )}
        </div>
      </div>
    </div>
  )
}

export const Comment = memo(CommentComponent)
Comment.displayName = 'Comment'
