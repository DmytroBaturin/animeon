'use server'

import { ListLayout } from '@/shared/layouts/list'
import { AnimeCard } from '@/entities/anime'
import { getAnimeList } from '@/shared/api/anime/anime'
import type { ResponseAnimeListType } from '@/shared/api/model'

export const HomePageList = async ({ tab = '' }: { tab: string }) => {
  const anime = await getAnimeList(
    {
      type: tab as ResponseAnimeListType,
    },
    { cache: 'no-cache' },
  )
  return (
    <ListLayout>
      {anime?.data?.results?.map((value) => (
        <AnimeCard key={`${value.slug}${value.id}`} {...value} />
      ))}
    </ListLayout>
  )
}
