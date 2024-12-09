'use client'

import { CreateComment } from '@/features/comment/ui/create-comment'
import { Comment } from '@/shared/components/ui/comment'
import { useRelease } from '@/entities/anime/model'
import { useCommentsModel } from '@/features/comment/model'
import { useEffect } from 'react'
import { useSession } from '@/entities/session/model/model'

export const CommentsSection = () => {
  const {
    api,
    comments,
    replyComments,
    replyNext,
    isOpenReplies,
    activeReplyForm,
  } = useCommentsModel()

  const { isAuthenticated } = useSession()
  const { release } = useRelease()

  useEffect(() => {
    if (!release.id || !release.slug) return
    api.initRelease(release.id, release.slug)
    api.fetchComments(String(release.id!), release.slug!, 1)
  }, [release.id, release.slug])

  return (
    <div className="flex flex-col">
      {isAuthenticated ? (
        <CreateComment object_id={release.id!} />
      ) : (
        <div className="flex items-center py-4 justify-center h-full">
          <span className="text-sm text-muted-foreground">
            Зареєструйся, щоб залишити коментар
          </span>
        </div>
      )}
      <section className="mt-4 flex flex-col">
        {comments?.map((comment) => (
          <Comment
            isAuth={isAuthenticated}
            key={`comment-${comment.id}`}
            seeMore={replyNext[comment.id!]}
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
            // reactions={<ReactionComment />}
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
                  isAuth={isAuthenticated}
                  key={`reply-${reply.id}`}
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
                  // reactions={<ReactionComment />}
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
