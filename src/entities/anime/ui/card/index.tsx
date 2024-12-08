import { memo } from 'react'
import Link from 'next/link'
import { routes } from '@/shared/config/routes'
import type { ResponseAnimeList } from '@/shared/api/model'
import Image from 'next/image'

const AnimeCardComponent = ({
  title,
  card_image,
  id,
  slug,
  type,
  year,
  count_episodes,
}: ResponseAnimeList) => {
  return (
    <Link
      className="flex w-full max-w-[200px]"
      scroll={false}
      href={routes.release(id, slug)}
    >
      <div className="h-[320px] flex justify-between flex-col items-center w-full max-w-[200px]">
        {card_image ? (
          <Image
            quality={20}
            src={card_image}
            className="h-[280px] object-cover rounded-[10px]"
            alt={card_image}
            width={200}
            height={280}
          />
        ) : (
          <div className="h-[280px] sm:h-full bg-gray-300 flex items-center justify-center w-full rounded-[10px]">
            <p className="text-muted">No Image</p>
          </div>
        )}
        <div className="flex flex-col font-bold text-center items-center mt-2">
          <h2 className="text-base">{title}</h2>
          <p className="text-xs">
            {year} | {type || 'Аніме'} | Серій: {count_episodes}
          </p>
        </div>
      </div>
    </Link>
  )
}

export const AnimeCard = memo(AnimeCardComponent)
AnimeCard.displayName = 'AnimeCard'
