'use client'

import { ReactNode } from 'react'
import { UserAvatar } from '@/entities/user'
import moment from 'moment'

interface CommentProps {
  replies?: ReactNode
  content: string
  userName: string
  replyForm?: ReactNode
  date: string
  commentTo?: string
  isReply?: boolean
  hasReplies?: boolean
  toggleReplyForm?: () => void
  reactions?: ReactNode
  seeMore?: boolean
  openReplies?: () => void
  handleMoreReplies?: () => void
}

export const Comment = ({
  reactions,
  hasReplies,
  date,
  seeMore = false,
  replyForm,
  handleMoreReplies,
  toggleReplyForm,
  commentTo,
  userName,
  replies,
  content,
  openReplies,
}: CommentProps) => {
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
      <UserAvatar />
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
              <p
                className="font-light opacity-40"
                onClick={() => {
                  toggleReplyForm()
                }}
              >
                Відповісти
              </p>
              {reactions}
            </div>
          </div>
          <div className="">{replyForm}</div>
          {hasReplies && (
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
          {seeMore && (
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
