import { memo } from 'react'
import type { ResponseAnimeList } from '@/shared/api/model'
import Image from 'next/image'
import { Skeleton } from '@/shared/components/ui/skeleton'
import Link from 'next/link'
import { routes } from '@/shared/config/routes'

const AnimeCardComponent = ({
  title,
  card_image,
  id,
  slug,
  type,
  year,
}: ResponseAnimeList) => {
  return (
    <Link href={routes.release(id, slug)}>
      <div className="flex gap-3 items-center w-full ">
        {card_image ? (
          <Image
            src={card_image}
            alt={title}
            className="w-9 h-9 bg-gray-300 rounded-full"
            width={50}
            height={50}
          />
        ) : (
          <Skeleton className="w-9 h-9 bg-gray-300 rounded-full" />
        )}

        <div className="flex flex-col font-bold ">
          <h2 className="text-base">{title}</h2>
          <p className="text-xs">{type}</p>
        </div>
      </div>
    </Link>
  )
}

export const AnimeCardRow = memo(AnimeCardComponent)
AnimeCardRow.displayName = 'AnimeCardRow'
