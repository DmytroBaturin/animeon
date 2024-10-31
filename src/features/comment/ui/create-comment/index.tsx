'use client'

import { UserAvatar } from '@/entities/user'
import { Button } from '@/shared/components/ui/button'
import { Textarea } from '@/shared/components/ui/textarea'
import { cn } from '@/shared/lib/utils'
import { Input } from '@/shared/components/ui/input'
import { PaperPlaneIcon } from '@radix-ui/react-icons'
import { useCommentsModel } from '@/features/comment/model'
import { useState } from 'react'
import { z } from 'zod'
import { useSession } from '@/entities/session/model/model'

const commentSchema = z.object({
  content: z
    .string()
    .min(1, { message: 'Коментар не може бути порожнім' })
    .max(500, { message: 'Коментар занадто довгий' }),
  parent_id: z.number().optional(),
  object_id: z.number(),
})

interface CreateCommentProps {
  isReply?: boolean
  parent_id?: number
  object_id: number
}

export const CreateComment = ({
  isReply = false,
  parent_id,
  object_id,
}: CreateCommentProps) => {
  const [content, setContent] = useState<string>('')
  const { token } = useSession()
  const { api } = useCommentsModel()

  const [error, setError] = useState<string | null>(null)

  const handleSubmit = () => {
    const result = commentSchema.safeParse({ content, parent_id, object_id })

    if (!result.success) {
      setError(result.error.errors[0]?.message)
      return
    }

    setError(null)
    api.createComment(
      {
        content,
        parent_id,
        object_id,
      },
      token,
    )
  }

  return (
    <div
      className={cn(
        'flex items-start w-full gap-3',
        isReply ? 'flex' : 'flex-col',
      )}
    >
      <div className="w-full items-center flex gap-3">
        <div className="hidden sm:flex">
          <UserAvatar />
        </div>
        {isReply ? (
          <Input
            onFocus={() => setError(null)}
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Ваш коментар"
            error={error || ''}
          />
        ) : (
          <Textarea
            onFocus={() => setError(null)}
            error={error || ''}
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Ваш коментар"
            className="resize-none w-full"
          />
        )}
      </div>
      <Button onClick={handleSubmit} size={isReply ? 'icon' : 'default'}>
        {isReply ? <PaperPlaneIcon /> : <p>Відповісти</p>}
      </Button>
    </div>
  )
}
