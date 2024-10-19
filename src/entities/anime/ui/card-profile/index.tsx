import { memo, ReactNode } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { ResponseAnime, UserAnimeListAction } from '@/shared/api/model'
import { clsx } from 'clsx'
import { routes } from '@/shared/config/routes'

const getSeriesDeclension = (count: number) => {
  if (count % 10 === 1 && count % 100 !== 11) {
    return 'серія'
  }
  if ([2, 3, 4].includes(count % 10) && ![12, 13, 14].includes(count % 100)) {
    return 'серії'
  }
  return 'серій'
}

export const AnimeCardComponent = ({
  title,
  id,
  slug,
  count_episodes,
  card_image,
  typeСard,
  action,
}: ResponseAnime & { action: ReactNode; typeСard?: UserAnimeListAction }) => {
  return (
    <div className="gap-[20px] w-full h-[100px] p-2 hover:bg-black/30 transition rounded-2xl flex items-center">
      <Link scroll={false} href={routes.release(id, slug)}>
        {card_image ? (
          <Image
            src={card_image}
            className="rounded-[2px] h-[76px] w-[60px] object-cover"
            width={100}
            height={100}
            alt="Default Image"
          />
        ) : (
          <div className="bg-stone-700 rounded-[50%] h-[60px] w-[60px] items-center object-cover" />
        )}
      </Link>
      <div className="w-full items-center justify-between flex">
        <Link scroll={false} href={routes.release(id, slug)}>
          <article className="flex items-center gap-[10px]">
            <div
              className={clsx(
                typeСard === 'WATCHING' && 'bg-[#00A13F]',
                typeСard === 'PLANNED' && 'bg-yellow-400',
                typeСard === 'DROPPED' && 'bg-pink-400',
                typeСard === 'VIEWED' && 'bg-orange-400',
                typeСard === 'FAVORITE' && 'bg-blue-400',
                'h-[10px] flex-shrink-0 rounded-[50%] w-[10px] ',
              )}
            />

            <h1 className="text-[20px]">
              {title && title?.length > 100 ? (
                <>{title.slice(0, 100)}...</>
              ) : (
                title
              )}
            </h1>
            <span className="hidden md:flex gap-3 items-center ">
              <span className="flex">
                <p className="text-[20px]">|</p>
              </span>
              <p className="text-[20px]">
                {count_episodes} {getSeriesDeclension(Number(count_episodes))}
              </p>
            </span>
          </article>
        </Link>
        <div className="h-full flex items-center justify-center">{action}</div>
      </div>
    </div>
  )
}

export const AnimeProfileCard = memo(AnimeCardComponent)
AnimeProfileCard.displayName = 'AnimeProfileCard'
