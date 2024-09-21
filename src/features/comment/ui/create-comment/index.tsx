import { UserAvatar } from '@/entities/user'
import { Button } from '@/shared/components/ui/button'
import { Textarea } from '@/shared/components/ui/textarea'
import { cn } from '@/shared/lib/utils'
import { Input } from '@/shared/components/ui/input'
import { PaperPlaneIcon } from '@radix-ui/react-icons'

interface CreateCommentProps {
  isReply?: boolean
}

export const CreateComment = ({ isReply = false }: CreateCommentProps) => {
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
          <Input placeholder="Ваш коментар" />
        ) : (
          <Textarea placeholder="Ваш коментар" className="resize-none w-full" />
        )}
      </div>
      <Button
        size={isReply ? 'icon' : 'default'}
        className={cn(!isReply && 'ml-[50px]')}
      >
        {isReply ? <PaperPlaneIcon /> : <p>Відповісти</p>}
      </Button>
    </div>
  )
}
