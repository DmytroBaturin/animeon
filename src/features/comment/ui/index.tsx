'use client'

import { CreateComment } from '@/features/comment/ui/create-comment'
import { Comment } from '@/shared/components/ui/comment'
import { useRelease } from '@/entities/anime/model'
import { useCommentsModel } from '@/features/comment/model'
import { useEffect } from 'react'
import { useSession } from '@/entities/session/model/model'
import { useAuthStore } from '@/entities/session/model'

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
  const { openDialog } = useAuthStore()

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
          <h3 className="text-sm text-muted-foreground">
            <span onClick={openDialog} className="text-accent cursor-pointer">
              Зареєструйся
            </span>
            , щоб залишити коментар
          </h3>
        </div>
      )}
      <section className="mt-4 flex flex-col">
        {comments?.map((comment) => (
          <Comment
            avatar={comment.avatar}
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
                  avatar={reply.avatar}
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
