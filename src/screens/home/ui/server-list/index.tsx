'use server'

import { ListLayout } from '@/shared/layouts/list'
import { AnimeCard } from '@/entities/anime'
import { getAnimeListResponse } from '@/shared/api/anime/anime'

export const HomePageList = async ({
  anime,
}: {
  anime: getAnimeListResponse
}) => {
  return (
    <ListLayout>
      {anime?.data?.results?.map((value) => (
        <AnimeCard key={`${value.slug}${value.id}`} {...value} />
      ))}
    </ListLayout>
  )
}
