'use server'

import { ListLayout } from '@/shared/layouts/list'
import { AnimeCard } from '@/entities/anime'
import { getAnimeList } from '@/shared/api/anime/anime'

export const HomePageList = async ({ tab = '' }: { tab: string }) => {
  const anime = await getAnimeList(
    {
      type: tab,
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
