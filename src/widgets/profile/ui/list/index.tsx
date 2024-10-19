'use client'

import { AnimeProfileCard } from '@/entities/anime/ui/card-profile'
import {
  type ResponseFiltersAnime,
  ResponsePaginatedUserAnimeList,
  type UserAnimeListAction,
} from '@/shared/api/model'
import { TrashIcon } from 'lucide-react'
import { Button } from '@/shared/components/ui/button'
import { FilterProfileList } from '@/features/profile/filter-list'
import { getAnimeFilters } from '@/shared/api/anime/anime'
import { useEffect, useState } from 'react'
import { PaginationProfileFilter } from '@/features/profile/filter-list/ui/pagination'

export const ProfileAnimeList = ({
  type,
  list,
}: {
  type?: UserAnimeListAction
  list: ResponsePaginatedUserAnimeList
}) => {
  const [animeFilters, setAnimeFilters] = useState<ResponseFiltersAnime | {}>(
    {},
  )

  const fetchFilterList = () => {
    getAnimeFilters({ cache: 'no-cache' }).then((res) => {
      setAnimeFilters(res.data)
    })
  }
  useEffect(() => {
    fetchFilterList()
  }, [])
  return (
    <div className="w-full flex-col gap-y-4 flex">
      <FilterProfileList filters={animeFilters} />
      {list.results.length > 0 ? (
        <div>
          {list.results.map((anime) => (
            <AnimeProfileCard
              key={anime.anime.id}
              typeСard={type || anime.action}
              {...anime.anime}
              action={
                <Button className="p-2" size="icon">
                  <TrashIcon />
                </Button>
              }
            />
          ))}
        </div>
      ) : (
        <h2 className="w-full font-bold text-[42px] flex items-center justify-center">
          Нічого немає 🥲
        </h2>
      )}

      {list.results.length > 0 && <PaginationProfileFilter {...list} />}
    </div>
  )
}
