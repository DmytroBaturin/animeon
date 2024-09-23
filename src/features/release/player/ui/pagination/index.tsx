import { useRelease } from '@/entities/anime/model'
import { Button } from '@/shared/components/ui/button'
import { useRouter, useSearchParams } from 'next/navigation'

export const PlayerPagination = () => {
  const { release } = useRelease()
  const episodes = release?.episodes
  const router = useRouter()
  const searchParams = useSearchParams()

  const handleChangeOrder = (filterValue: string) => {
    const params = new URLSearchParams(searchParams.toString())

    if (filterValue) {
      params.set('order', filterValue)
    } else {
      params.delete('order')
    }

    router.push(`?${params.toString()}`)
  }
  return (
    <div>
      {episodes?.map((episode) => (
        <Button
          onClick={() => {
            handleChangeOrder(String(episode.order))
          }}
          key={episode.order}
        >
          {episode.order}
        </Button>
      ))}
    </div>
  )
}
