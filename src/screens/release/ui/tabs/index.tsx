'use client'

import { TabsList, TabsTrigger } from '@/shared/components/ui/tabs'
import { useRelease } from '@/entities/anime/model'
import { isObjectEmpty } from '@/shared/lib/utils'

export const ReleaseTabs = () => {
  const { release } = useRelease()
  return (
    <TabsList className="flex justify-start flex-wrap sm:flex-nowrap h-full bg-black/20 whitespace-nowrap mandatory w-full">
      <TabsTrigger value="">Плеєр</TabsTrigger>
      <TabsTrigger disabled={!release.trailer_url} value="trailer">
        Трейлер
      </TabsTrigger>
      <TabsTrigger disabled={isObjectEmpty(release.similar)} value="similar">
        Схожі
      </TabsTrigger>
      <TabsTrigger value="comments">Відгуки</TabsTrigger>
      <TabsTrigger disabled={isObjectEmpty(release.voiceovers)} value="teams">
        Команди
      </TabsTrigger>
      <TabsTrigger value="arches">Арки</TabsTrigger>
    </TabsList>
  )
}
