'use server'

import { ListLayout } from '@/shared/layouts/list'
import { AnimeCardSkeleton } from '@/entities/anime'

export const HomePageList = async ({ tab }: { tab: string }) => {
  console.log(tab)
  return (
    <ListLayout>
      <AnimeCardSkeleton />
      <AnimeCardSkeleton />
      <AnimeCardSkeleton />
      <AnimeCardSkeleton />
      <AnimeCardSkeleton />
    </ListLayout>
  )
}
