'use client'

import { FilterAnimeTrigger } from '@/features/anime/filter/ui/trigger'
import { Card, CardContent } from '@/shared/components/ui/card'
import { useFilterModel } from '@/features/anime/filter/model'

export const FilterAnime = () => {
  const { state } = useFilterModel()
  return (
    <div className="flex gap-2 w-full flex-col">
      <span className="w-full flex items-end justify-end">
        <FilterAnimeTrigger />
      </span>
      {state.isFilterOpen && (
        <Card className="w-full">
          <CardContent>
            <p>Filters</p>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
