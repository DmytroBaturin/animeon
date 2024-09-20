'use client'

import { TabsList, TabsTrigger } from '@/shared/components/ui/tabs'

export interface TabParamsProps {
  label: string
  value: string
}

export const HomeTabList = ({ tabs }: { tabs: TabParamsProps[] }) => {
  return (
    <TabsList className="max-w-[400px] h-full grid grid-cols-3 w-full">
      {tabs.map((tab) => (
        <TabsTrigger key={tab.value} value={tab.value}>
          {tab.label}
        </TabsTrigger>
      ))}
    </TabsList>
  )
}
