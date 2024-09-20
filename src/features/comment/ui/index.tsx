import { CreateComment } from '@/features/comment/ui/create-comment'
import { Comment } from '@/shared/components/ui/comment'
import { ReactionComment } from '@/features/comment/ui/reaction-comment'
import { ReplyComment } from '@/features/comment/ui/reply-comment'

const comments = [
  {
    commentTo: 'Dmytro',
    content: 'comment content',
    userName: 'Dmytro',
    date: 'today',
  },
  {
    content: 'comment content',
    userName: 'Dmytro',
    date: 'today',
  },
]

export const CommentsSection = () => {
  return (
    <div className="flex flex-col gap-6">
      <CreateComment />
      <Comment
        replyForm={<ReplyComment />}
        replies={comments.map((val) => (
          <Comment
            key={val.date}
            isReply
            commentTo={val.commentTo}
            replyForm={<ReplyComment />}
            reactions={<ReactionComment />}
            content={val.content}
            userName={val.userName}
            date={val.date}
          />
        ))}
        reactions={<ReactionComment />}
        content="comment content"
        userName="Dmytro"
        date="today"
      />
    </div>
  )
}
