import type { ResponseAnimeList } from '@/shared/api/model'
import { ListLayout } from '@/shared/layouts/list'
import { AnimeCard } from '@/entities/anime'

export const ReleaseSimilar = ({ list }: { list: ResponseAnimeList[] }) => {
  return (
    <ListLayout>
      {list.length === 0 && (
        <h1 className="w-full items-center font-bold text-[42px] justify-center flex">
          Нічого не знайдено 🥲
        </h1>
      )}
      {list?.map((anime) => <AnimeCard key={anime.id} {...anime} />)}
    </ListLayout>
  )
}
