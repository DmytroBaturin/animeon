import { PageLayout } from '@/shared/layouts/page'
import { FilterAnime, PaginationFilter } from '@/features/anime/filter'
import { ListLayout } from '@/shared/layouts/list'
import { AnimeCard } from '@/entities/anime'
import type { ResponsePaginatedAnimeList } from '@/shared/api/model'

export const ReleasesPage = ({
  animeList,
}: {
  animeList: ResponsePaginatedAnimeList
}) => {
  return (
    <PageLayout>
      <div className="mt-24  flex flex-col gap-9">
        <h1 className="text-2xl font-bold">Каталог</h1>
        <div className="flex w-full items-end justify-end">
          <FilterAnime />
        </div>
        <ListLayout>
          {animeList?.results?.map((anime) => (
            <AnimeCard key={anime.id} {...anime} />
          ))}
        </ListLayout>
        <div className="w-full   justify-start items-start flex">
          <PaginationFilter {...animeList} />
        </div>
      </div>
    </PageLayout>
  )
}
