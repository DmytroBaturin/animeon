'use client'

import { TabsList, TabsTrigger } from '@/shared/components/ui/tabs'

export const HomeTabList = ({
  tabs,
  availability,
}: {
  tabs: { [key: string]: string }
  availability: { [key: string]: boolean }
}) => {
  return (
    <TabsList className="max-w-[400px] h-full grid grid-cols-3 w-full">
      {Object.entries(tabs).map(([key, value]) => (
        <TabsTrigger key={key} value={key} disabled={!availability[key]}>
          {value}
        </TabsTrigger>
      ))}
    </TabsList>
  )
}
