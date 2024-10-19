'use client'

import { TabsList, TabsTrigger } from '@/shared/components/ui/tabs'

export const ReleaseTabs = () => {
  return (
    <TabsList className="flex justify-start flex-wrap sm:flex-nowrap h-full bg-black/20 whitespace-nowrap mandatory w-full">
      <TabsTrigger value="">Плеєр</TabsTrigger>
      <TabsTrigger value="trailer">Трейлер</TabsTrigger>
      <TabsTrigger value="similar">Схожі</TabsTrigger>
      <TabsTrigger value="comments">Відгуки</TabsTrigger>
      <TabsTrigger value="teams">Команди</TabsTrigger>
      <TabsTrigger value="arches">Арки</TabsTrigger>
    </TabsList>
  )
}
