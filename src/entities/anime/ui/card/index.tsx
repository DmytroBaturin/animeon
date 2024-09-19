import { memo } from 'react'
import Link from 'next/link'
import { routes } from '@/shared/config/routes'

const AnimeCardComponent = () => {
  return (
    <Link href={routes.release(1, 'slug')}>
      <div className="h-[330px] flex justify-between flex-col items-center w-full max-w-[200px]">
        <div className="h-full bg-pink-400 max-h-[280px] w-full rounded-[10px]">
          Image
        </div>
        <div className="flex flex-col font-bold text-center items-center">
          <h2 className="text-base">Title</h2>
          <p className="text-xs">description</p>
        </div>
      </div>
    </Link>
  )
}

export const AnimeCard = memo(AnimeCardComponent)
AnimeCard.displayName = 'AnimeCard'
