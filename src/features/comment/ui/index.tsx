'use client'

import { CreateComment } from '@/features/comment/ui/create-comment'
import { Comment } from '@/shared/components/ui/comment'
import { ReactionComment } from '@/features/comment/ui/reaction-comment'
import { useRelease } from '@/entities/anime/model'
import { useCommentsModel } from '@/features/comment/model'
import { useSession } from '@/entities/user/model'
import { useEffect } from 'react'

export const CommentsSection = () => {
  const { api, comments, replyComments, isOpenReplies, activeReplyForm } =
    useCommentsModel()
  const { isAuthenticated } = useSession()
  const { release } = useRelease()

  useEffect(() => {
    if (!release.id || !release.slug) return
    api.fetchComments(String(release.id!), release.slug!, 1)
  }, [release])

  return (
    <div className="flex flex-col">
      {isAuthenticated && <CreateComment object_id={release.id!} />}
      <section className="mt-4 flex flex-col">
        {comments?.map((comment) => (
          <Comment
            key={comment.id}
            seeMore={isOpenReplies[comment.id!] && !!comment.has_reply}
            handleMoreReplies={() => api.loadMoreReplies(comment.id!)}
            replyForm={
              activeReplyForm === comment.id && (
                <CreateComment
                  parent_id={comment.id}
                  object_id={release.id!}
                  isReply
                />
              )
            }
            reactions={<ReactionComment />}
            content={comment.content_main}
            userName={comment.username}
            openReplies={() => api.toggleReplyMessages(comment.id!)}
            date={comment.created || ''}
            hasReplies={!!comment.has_reply!}
            toggleReplyForm={() => api.toggleReplyForm(comment.id!)}
            replies={
              isOpenReplies[comment.id!] &&
              replyComments[comment.id!]?.map((reply) => (
                <Comment
                  key={reply.id}
                  replyForm={
                    activeReplyForm === reply.id && (
                      <CreateComment
                        parent_id={comment.id}
                        object_id={release.id!}
                        isReply
                      />
                    )
                  }
                  toggleReplyForm={() => api.toggleReplyForm(reply.id!)}
                  reactions={<ReactionComment />}
                  content={reply.content_main}
                  userName={reply.username}
                  date={reply.created || ''}
                />
              ))
            }
          />
        ))}
      </section>
    </div>
  )
}
