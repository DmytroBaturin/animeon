import { cn } from '@/shared/lib/utils'

const Skeleton = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => {
  return (
    <div
      className={cn(
        'relative overflow-hidden rounded-sm bg-primary/10',
        className,
      )}
      {...props}
    >
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-muted/20 to-transparent animate-shimmer" />
    </div>
  )
}

export { Skeleton }
