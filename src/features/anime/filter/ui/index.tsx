'use client'

import { FilterAnimeTrigger } from '@/features/anime/filter/ui/trigger'
import { Card, CardContent } from '@/shared/components/ui/card'
import { useFilterModel } from '@/features/anime/filter/model'
import { getAnimeFilters } from '@/shared/api/anime/anime'
import { useEffect } from 'react'
import { FilterSelect } from '@/features/anime/filter/ui/filter-select'
import { useRouter, useSearchParams } from 'next/navigation'
import { Button } from '@/shared/components/ui/button'

export const FilterAnime = () => {
  const { state, api } = useFilterModel()
  const router = useRouter()
  const searchParams = useSearchParams()

  const filterFetch = () => {
    getAnimeFilters({ cache: 'no-cache' }).then((res) => {
      api.setFilterList(res.data)
    })
  }

  useEffect(() => {
    filterFetch()
  }, [])

  const handleChangeFilter = (filterKey: string, filterValue: string) => {
    const params = new URLSearchParams(searchParams.toString())

    if (filterValue) {
      params.set(filterKey, filterValue)
    } else {
      params.delete(filterKey)
    }

    router.push(`?${params.toString()}`)
  }

  const getActiveFilterValue = (filterKey: string) => {
    return searchParams.get(filterKey) || ''
  }

  const resetFilters = () => {
    const params = new URLSearchParams()
    router.push(`?${params.toString()}`)
  }

  return (
    <div className="flex gap-2 w-full flex-col">
      <span className="w-full flex items-end justify-end">
        <FilterAnimeTrigger />
      </span>
      {state.isFilterOpen && (
        <Card className="w-full">
          <CardContent className="p-4 flex-wrap justify-center flex gap-2">
            <FilterSelect
              placeholder="Озвучка"
              options={state.filterList.voiceover}
              value={getActiveFilterValue('voiceover')}
              onChange={(value) => handleChangeFilter('voiceover', value)}
            />
            <FilterSelect
              placeholder="Сезони"
              options={state.filterList.season}
              value={getActiveFilterValue('season')}
              onChange={(value) => handleChangeFilter('season', value)}
            />
            <FilterSelect
              placeholder="Режисери"
              options={state.filterList.directors}
              value={getActiveFilterValue('directors')}
              onChange={(value) => handleChangeFilter('directors', value)}
            />
            <FilterSelect
              placeholder="Студії"
              options={state.filterList.studios}
              value={getActiveFilterValue('studios')}
              onChange={(value) => handleChangeFilter('studios', value)}
            />
            <FilterSelect
              placeholder="Статус"
              options={state.filterList.status}
              value={getActiveFilterValue('status')}
              onChange={(value) => handleChangeFilter('status', value)}
            />
            <FilterSelect
              placeholder="Країна"
              options={state.filterList.countries}
              value={getActiveFilterValue('countries')}
              onChange={(value) => handleChangeFilter('countries', value)}
            />
            <FilterSelect
              placeholder="Тип"
              options={state.filterList.type}
              value={getActiveFilterValue('type')}
              onChange={(value) => handleChangeFilter('type', value)}
            />
            <Button onClick={resetFilters}>Скинути фільтри</Button>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
