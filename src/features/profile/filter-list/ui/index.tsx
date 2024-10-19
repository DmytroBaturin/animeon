import { FilterSelect } from '@/features/profile/filter-list/ui/filter-select'
import { Card, CardContent } from '@/shared/components/ui/card'
import type { ResponseFiltersAnime } from '@/shared/api/model'
import { debounce } from '@/shared/lib/hooks/debounce'
import { useRouter, useSearchParams } from 'next/navigation'
import { Button } from '@/shared/components/ui/button'

export const FilterProfileList = ({
  filters,
}: {
  filters: ResponseFiltersAnime
}) => {
  const router = useRouter()
  const searchParams = useSearchParams()
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

  const handleChangenInputFilter = debounce(
    (filterKey: string, filterValue: string) => {
      const params = new URLSearchParams(searchParams.toString())

      if (filterValue) {
        params.set(filterKey, filterValue)
      } else {
        params.delete(filterKey)
      }

      router.push(`?${params.toString()}`)
    },
    500,
  )

  const resetFilters = () => {
    const params = new URLSearchParams()
    router.push(`?${params.toString()}`)
  }

  return (
    <Card className="w-full">
      <CardContent className="p-4 flex-wrap justify-center flex gap-2">
        <FilterSelect
          placeholder="Озвучка"
          options={filters.voiceover || {}}
          value={getActiveFilterValue('voiceover')}
          onChange={(value) => handleChangeFilter('voiceover', value)}
        />
        <FilterSelect
          placeholder="Сезони"
          options={filters.season || {}}
          value={getActiveFilterValue('season')}
          onChange={(value) => handleChangeFilter('season', value)}
        />
        <FilterSelect
          placeholder="Студії"
          options={filters.studios || {}}
          value={getActiveFilterValue('studios')}
          onChange={(value) => handleChangeFilter('studios', value)}
        />
        <FilterSelect
          placeholder="Статус"
          options={filters.status || {}}
          value={getActiveFilterValue('status')}
          onChange={(value) => handleChangeFilter('status', value)}
        />
        <FilterSelect
          placeholder="Країна"
          options={filters.countries || {}}
          value={getActiveFilterValue('countries')}
          onChange={(value) => handleChangeFilter('countries', value)}
        />
        <FilterSelect
          placeholder="Тип"
          options={filters.type || {}}
          value={getActiveFilterValue('type')}
          onChange={(value) => handleChangeFilter('type', value)}
        />
        <Button onClick={resetFilters}>Скинути фільтр</Button>
      </CardContent>
    </Card>
  )
}
