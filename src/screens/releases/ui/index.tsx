import { PageLayout } from '@/shared/layouts/page'
import { FilterAnime, PaginationFilter } from '@/features/anime/filter'
import { ListLayout } from '@/shared/layouts/list'
import { AnimeCardSkeleton } from '@/entities/anime'

export const ReleasesPage = () => {
  return (
    <PageLayout>
      <div className="mt-24  flex flex-col gap-9">
        <h1 className="text-2xl font-bold">Каталог</h1>
        <div className="flex w-full items-end justify-end">
          <FilterAnime />
        </div>
        <ListLayout>
          <AnimeCardSkeleton />
          <AnimeCardSkeleton />
          <AnimeCardSkeleton />
          <AnimeCardSkeleton />
          <AnimeCardSkeleton />
        </ListLayout>
        <div className="w-full   justify-start items-start flex">
          <PaginationFilter />
        </div>
      </div>
    </PageLayout>
  )
}
