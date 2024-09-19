import { ReactNode } from 'react'
import { cn } from '@/shared/lib/utils'

export const PageLayout = ({
  children,
  classname,
}: {
  children: ReactNode
  classname?: string
}) => {
  return (
    <div className={cn('flex w-full justify-center p-3', classname)}>
      <div className="max-w-[1240px] h-full w-full">{children}</div>
    </div>
  )
}
