'use client'

import { TabsList, TabsTrigger } from '@/shared/components/ui/tabs'

export const HomeTabList = ({ tabs }: { tabs: { [key: string]: string } }) => {
  return (
    <TabsList className="max-w-[400px] h-full grid grid-cols-3 w-full">
      {Object.entries(tabs).map(([key, value]) => (
        <TabsTrigger key={key} value={key}>
          {value}
        </TabsTrigger>
      ))}
    </TabsList>
  )
}
