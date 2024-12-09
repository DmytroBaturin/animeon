'use server'

import { HomePage, HomePageList, HomeTabList } from '@/screens/home'
import { getAnimeList, getAnimePosters } from '@/shared/api/anime/anime'
import { Suspense } from 'react'
import { ListLayout } from '@/shared/layouts/list'
import { AnimeCardSkeleton } from '@/entities/anime'
import type { ResponseAnimeListType } from '@/shared/api/model'
import { Metadata } from 'next'

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: 'AnimeOn',
    description: 'Дивись останні аніме',
    keywords: ['Anime', 'Аніме', 'Популярні серіали', 'Фільми'],
    openGraph: {
      title: 'Anime Home Page',
      description: 'Переглядайте найкращі аніме серіали та фільми.',
      url: 'https://www.animeon.top',

      type: 'website',
    },
  }
}

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

  const animeLists = await Promise.all(
    Object.keys(tabs).map((key) =>
      getAnimeList(
        { type: key as ResponseAnimeListType },
        { cache: 'no-cache' },
      ),
    ),
  )

  const tabsAvailability = Object.fromEntries(
    Object.keys(tabs).map((key, index) => [
      key,
      animeLists[index]?.data.results?.length > 0,
    ]),
  )

  const activeAnimeList = animeLists[Object.keys(tabs).indexOf(activeTab)]

  return (
    <HomePage
      posters={postersArray}
      serverList={
        <Suspense
          fallback={
            <ListLayout>
              {Array.from({ length: 4 }).map((_, index) => (
                <AnimeCardSkeleton key={`skeleton-${index + 1}`} />
              ))}
            </ListLayout>
          }
        >
          <HomePageList anime={activeAnimeList} />
        </Suspense>
      }
      activeTab={activeTab}
      tablist={<HomeTabList tabs={tabs} availability={tabsAvailability} />}
    />
  )
}
