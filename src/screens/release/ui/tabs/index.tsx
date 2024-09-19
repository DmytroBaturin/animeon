import { TabsList, TabsTrigger } from '@/shared/components/ui/tabs'

export const ReleaseTabs = () => {
  return (
    <TabsList className="flex overflow-x-auto bg-black/20 overflow-y-hidden whitespace-nowrap scrollbar-hide">
      <div className="flex space-x-4">
        <TabsTrigger value="account">Плеєр</TabsTrigger>
        <TabsTrigger value="trailer">Трейлер</TabsTrigger>
        <TabsTrigger value="similar">Схожі</TabsTrigger>
        <TabsTrigger value="comments">Відгуки</TabsTrigger>
        <TabsTrigger value="teams">Команди</TabsTrigger>
      </div>
      <TabsTrigger value="arches" className="text-white ml-auto">
        Арки
      </TabsTrigger>
    </TabsList>
  )
}
