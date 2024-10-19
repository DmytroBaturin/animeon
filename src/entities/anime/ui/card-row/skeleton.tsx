import { memo } from 'react'
import { Skeleton } from '@/shared/components/ui/skeleton'

const AnimeCard = () => {
  return (
    <div className="flex gap-3 items-center w-full ">
      <Skeleton className="w-9 gradient-mask-b-0 h-9 bg-gray-300 rounded-full" />
      <div className="flex flex-col gap-2 font-bold ">
        <Skeleton className="w-[60px] gradient-mask-b-0 h-[12px] bg-gray-300" />
        <Skeleton className="w-[100px] gradient-mask-b-0 h-[12px] bg-gray-300" />
      </div>
    </div>
  )
}

export const AnimeCardRowSkeleton = memo(AnimeCard)
