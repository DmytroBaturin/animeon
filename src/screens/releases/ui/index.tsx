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
      <div className="mt-24 mb-12  flex flex-col gap-[72px]">
        <h1 className="text-2xl font-bold">Каталог</h1>
        <div className="flex w-full items-end justify-end">
          <FilterAnime />
        </div>
        {animeList?.results?.length === 0 && (
          <h1 className="w-full font-bold  text-[32px] flex items-center justify-center">
            Нічого не знайдено 🥲
          </h1>
        )}
        <ListLayout>
          {animeList?.results?.map((anime) => (
            <AnimeCard key={anime.id} {...anime} />
          ))}
        </ListLayout>
        <div className="w-full justify-center items-center flex">
          <PaginationFilter {...animeList} />
        </div>
      </div>
    </PageLayout>
  )
}
