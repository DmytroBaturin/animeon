import { memo } from 'react'
import { Skeleton } from '@/shared/components/ui/skeleton'
import Link from 'next/link'
import { routes } from '@/shared/config/routes'

const AnimeCard = () => {
  return (
    <Link
      scroll={false}
      className="h-[330px] flex justify-between flex-col items-center w-full max-w-[200px]"
      href={routes.release(1, 'slug')}
    >
      <Skeleton className="h-full bg-gray-300 max-h-[280px] w-full rounded-[10px]" />
      <div className="flex flex-col gap-2 font-bold text-center items-center">
        <Skeleton className="w-[60px] h-[12px] bg-gray-300" />
        <Skeleton className="w-[100px] h-[12px] bg-gray-300" />
      </div>
    </Link>
  )
}

export const AnimeCardSkeleton = memo(AnimeCard)
