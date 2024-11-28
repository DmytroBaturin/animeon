'use server'

import { HomePage, HomePageList, HomeTabList } from '@/screens/home'
import { getAnimePosters } from '@/shared/api/anime/anime'
import { Suspense } from 'react'
import { ListLayout } from '@/shared/layouts/list'
import { AnimeCardSkeleton } from '@/entities/anime'

export default async function Page({
  searchParams,
}: {
  searchParams: { tab: string }
}) {
  const tabs = {
    '': 'Останні',
    SERIAL: 'Популярні',
    FILM: 'Фільми',
  } as { [key: string]: string }

  const activeTab = searchParams.tab || ''

  const posters = await getAnimePosters({ cache: 'no-cache' })

  if (!posters || !posters.data) {
    throw new Error('Failed to fetch anime posters')
  }

  const postersArray = Array.isArray(posters.data)
    ? posters.data
    : [posters.data]

  return (
    <HomePage
      posters={postersArray}
      serverList={
        <Suspense
          fallback={
            <ListLayout>
              {Array.from({ length: 10 }).map((_, index) => (
                <AnimeCardSkeleton key={`skeleton-${index + 1}`} />
              ))}
            </ListLayout>
          }
        >
          <HomePageList tab={activeTab} />
        </Suspense>
      }
      activeTab={activeTab}
      tablist={<HomeTabList tabs={tabs} />}
    />
  )
}
